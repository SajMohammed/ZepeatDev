import React, { useState } from 'react';
import { Button } from "@material-ui/core";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { db } from "../../../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore"; 
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

    const [userId, setUserId] = useState(localStorage.getItem("localStorageUserId"));
    const [partnerFirestoreIdLS, setPartnerFirestoreIdLS] = useState(localStorage.getItem("partnerFirestoreId"));
    const [brandFirestoreIdLS, setBrandFirestoreIdLS] = useState(localStorage.getItem("brandFirestoreId"));
    let partnerPID;
    let brandBID;

    const handleRazorPay = async (e) => {
        e.preventDefault();
        const id = nanoid(20);
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

        const dbWriteToPartnersCheckout =  async() => {

            await setDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS, "Checkouts", id),{
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
                Name: localStorage.getItem("customerName"),
                SlNo:"00",
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                CustomerUID:userId
            })
        }

        const dbWriteToPartnersCheckoutUnsuccessful =  async() => {
            

            await setDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS, "Checkouts", id),{
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
                Name: localStorage.getItem("customerName"),
                SlNo:"00",
                PaymentStatus: "Failed",
                PaymentMethod: "Razorpay",
                CustomerUID:userId
            })
            alert("Payment Failed");
        }

        const dbWriteToGlobalCheckoutBrands = async (partnerPID) => {
            await setDoc(doc(db, "Global-Checkouts-Brands","PsZkEJjiRffS0LZxRh53","Customers",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                UID:userId,
                TotalAmount: Number(localStorage.getItem("totalAmount"))
            })
        }

        const dbWriteToCustomersCheckout = async(partnerPID, brandBID) => {

            // const partnerDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS));
            // if (partnerDocSnap.exists()) {
            //     console.log("Document data:", partnerDocSnap.data());
            //     partnerPID = partnerDocSnap.data().PartnerPID
            //   } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            //   }

            // const brandDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS));
            // if (brandDocSnap.exists()) {
            //     console.log("Document data:", brandDocSnap.data());
            //     brandBID = brandDocSnap.data().BrandBID
            //   } else {
            //     // doc.data() will be undefined in this case
            //     console.log("No such document!");
            //   }

            await setDoc(doc(db, "Customers",userId,"Checkouts",id),{
                Cart : items,
                PartnerPID: partnerPID,
                PaymentStatus: "Success",
                PaymentMethod: "Razorpay",
                Time: date,
                BrandBID: brandBID,
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
                handler: async function (response) {
                    alert(response.razorpay_payment_id);
                    console.log(response);
                    // alert(response.razorpay_order_id)
				    // alert(response.razorpay_signature)
                    // userId = localStorage.getItem("localStorageUserId");
                    if (response.razorpay_payment_id) {
                        const partnerDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS));
                        if (partnerDocSnap.exists()) {
                            console.log("Document data:", partnerDocSnap.data());
                            partnerPID = partnerDocSnap.data().PartnerPID
                          } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                          }
            
                        const brandDocSnap = await getDoc(doc(db, "Partners", partnerFirestoreIdLS, "Brands-MoT", brandFirestoreIdLS));
                        if (brandDocSnap.exists()) {
                            console.log("Document data:", brandDocSnap.data());
                            brandBID = brandDocSnap.data().BrandBID
                          } else {
                            // doc.data() will be undefined in this case
                            console.log("No such document!");
                          }

                        dbWriteToPartnersCheckout();
                        dbWriteToGlobalCheckoutBrands(partnerPID);
                        dbWriteToCustomersCheckout(partnerPID, brandBID);
                        handlePaymentSuccess();

                    } else {
                        alert("failed");
                        dbWriteToPartnersCheckoutUnsuccessful();
                    }

                },
                prefill: {
                    name:"SajMo",
                    contact: "1234567891",
                    email:"mail2sajmo@gmail.com"
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