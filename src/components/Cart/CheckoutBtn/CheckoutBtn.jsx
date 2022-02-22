import React from 'react';
import { Button } from "@material-ui/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { db } from "../../../firebase-config";
import { doc, setDoc } from "firebase/firestore"; 
import { nanoid } from 'nanoid';
import './checkoutBtn.css';

const loadScript = (src) =>{
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
            console.log("loaded");
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script);
	})
}

const date = new Date();

const CheckoutBtn = ({amount, items, handlePaymentSuccess}) => {

    const handleRazorPay = async (e) => {
        e.preventDefault();
        const id = nanoid(5);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

        const dbWriteToPartnersCheckout =  async() => {

            await setDoc(doc(db, "Partners","VXM509inNCe8tZEBz1RD","Brands-MoT","iuu6AvatBJfqc9Mtn4Zj","Checkouts",id),{
                Cart : items
                // .map((item) => [{
                    // Barcode:"111111",
                    // Category: item.Category,
                    // ImageURL:item.ImageURL,
                    // MRP:item.MRP,
                    // Name: item.Name,
                    // SellingPrice:item.SellingPrice,
                    // UID:"001"
                ,
                Date: date,
                Name: "Cookies",
                SlNo:"03",
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                CustomerUID:"C03"
            })
        }

        const dbWriteToGlobalCheckoutBrands = async () => {
            await setDoc(doc(db, "Global-Checkouts-Brands","PsZkEJjiRffS0LZxRh53","Customers",id),{
                Cart : [{
                    Barcode:"00000000",
                    Category: "FMCG",
                    ImageURL:"",
                    MRP:25,
                    Name: "Cookies",
                    SellingPrice:27,
                    ProductPID:"001"
                }],
                PartnerPID:"P001",
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                UID:"C03",
                TotalAmount:103
            })
        }

        const dbWriteToCustomersCheckout = async() => {
            await setDoc(doc(db, "Customers","01","Checkouts","01006"),{
                Cart : [{
                    Barcode:"00000000",
                    Category: "FMCG",
                    ImageURL:"",
                    MRP:25,
                    Name: "Cookies",
                    SellingPrice:27,
                    UID:"001"
                }],
                PartnerPID:"P001",
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                Time:"Feb 20",
                BrandBID:"B01",
                SKUCounter: [{
                    counter:"0",
                    LessThan6: true
                }]
                
                
            })
        }

        if (amount === "") {
            alert("enter amount");
        } else {
            var options = {
                key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
                key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
                amount: amount*100, 
                currency: "INR",
                name: "Zepeat",
                description: "your checkout buddy",
                handler: function (response) {
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id)
				    // alert(response.razorpay_signature)

                    dbWriteToPartnersCheckout();
                    dbWriteToGlobalCheckoutBrands();
                    dbWriteToCustomersCheckout();
                    handlePaymentSuccess();

                },
                prefill: {
                    // name:"SajMo",
                    // contact: "1234567891",
                    // email:"mail2sajmo@gmail.com"
                },
                theme: {
                    color:"#20CE88"
                }
            };

            var pay = new window.Razorpay(options);
            pay.open();
        }
    }

  return (
    <div className="cart__checkout-button">
        <Button
          className="checkout-btn"
          variant="text"
          onClick={handleRazorPay}
          style={{
            backgroundColor: "#20CE88",
            borderRadius: "8px",
            width: "85VW",
            margin: "10px 10px",
          }} >
          CHECKOUT
          <ArrowRightAltIcon />
        </Button>
      </div>
  )
}

export default CheckoutBtn