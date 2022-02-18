import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import "./cart.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Scanner from "../Scanner/Scanner";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
import BarcodeReader from "../BarcodeReader/BarcodeReader";

// const items = [
//   { id: 1, name: "Nivya Body Cream", category: "Self Grooming", price: "250" },
//   { id: 2, name: "Vim Bar", category: "Home Care", price: "50" },
//   { id: 3, name: "Rite Bite", category: "Self Grooming", price: "306" },
// ];

const Cart = () => {
  const [items, setItems] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [taxAndCharge, setTaxAndCharge] = useState(0);
  const [convenienceFee, setConvenienceFee] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isQuantityChanged, setIsQuantityChanged] = useState(0);
  const [scanner, setScanner] = useState(false);
  const [barcodeData, setBarcodeData] = useState("");

  const [qtyKg, setqtyKg] = useState(0);
  const [qtyGm, setqtyGm] = useState(0);
 
  let totSellingPrice = 0;
  let taxAndCharges = 0;
  let totalP = 0;
  let partnerFirestoreId = "VXM509inNCe8tZEBz1RD";
  let brandFirestoreId = "";
  let grocQtyKg = 0;
  let grocQtyGm = 0;

  const handleToggleCart = (id) => {
    if (items.length == 1) {
      console.log(id);
      setItems([]);
      setBarcodeData("");
      setConvenienceFee(0);
      
    } else {
      console.log(id);
      setItems(items.slice(items.indexOf(id, 1)));
      setBarcodeData("");
      setConvenienceFee(0);
    //   setItems([...items], items.splice(items.findIndex( v => v.id == id), 1));
      // setItems(items.filter(item => item.id != id));
    //   tempArray = items.filter( item => item.id != id);
    //   setItems(tempArray);
    }
  };

  useEffect(() => {
    console.log("Barcode : ", barcodeData);
    brandFirestoreId = localStorage.getItem("brandId");

    const productsCollectionRef = collection(db, `Partners/${partnerFirestoreId}/Brands-MoT/${brandFirestoreId}/Products`);   
    const getData = async () => {
      const q = query(
        productsCollectionRef,
        where("BarcodeNumb", "==", `${barcodeData}`)
        );
        const docsSnap = await getDocs(q);

      docsSnap.forEach((doc) => {
        //let category = doc.data().Category;
          setItems((prevItems) => [
            ...prevItems,
            {
              id: doc.id,
              Name: doc.data().Name,
              Category: doc.data().Category,
              MRP: doc.data().MRP,
              SellingPrice: doc.data().SellingPrice,
              ImageURL: doc.data().ImageURL,
              Quantity:1
              
            },
          ]);
        
      });
    };

    const getDataGrocery = async (grocBarcode) => {
      const q = query(
        productsCollectionRef,
        where("BarcodeNumb", "==", `${grocBarcode}`)
      );
      
      const docsSnap = await getDocs(q);
      
      docsSnap.forEach((doc) => {
        //let category = doc.data().Category;
          setItems((prevItems) => [
            ...prevItems,
            {
              id: doc.id,
              Name: doc.data().Name,
              Category: doc.data().Category,
              MRP: doc.data().MRP,
              SellingPrice: doc.data().SellingPrice,
              ImageURL: doc.data().ImageURL,
              Quantity:1
              
            },
          ]);
        
      });
    };

    if( barcodeData.length === 10) {
      let a = barcodeData.substring(0, 4);
      let b = barcodeData.substring(4, 7);
      setqtyKg(b);
      grocQtyKg = Number(b);
      let c = barcodeData.substring(7, 10);
      setqtyGm(c);
      grocQtyGm = Number(c);
      getDataGrocery(a);

    } else {
      getData();
    }
    // getData();
  }, [barcodeData]); // Here the dependency is the barcode state variable

  useEffect(() => {
    //Sets the Total Price logic
    let kgPrice = 0;
    let weight = 0;
    let finalGrocPrice = 0;
    let convenienceFee = 2;
    console.log("V", qtyKg)
    console.log(items);
   // console.log("called on items change");
    items.map((item) => {
        console.log(item.Name, item.Quantity);
        if (item.Category === "Groceries"){
          console.log(item.MRP, item.SellingPrice)
          if (item.MRP === item.SellingPrice) {
            kgPrice = item.MRP;
          } else {
            kgPrice = item.SellingPrice;
          }
          console.log(kgPrice);

          console.log("grocQtyKg", Number(grocQtyKg))
          weight = Number(qtyKg) + (Number(qtyGm) / 1000);
          finalGrocPrice = Number(weight) * Number(kgPrice);
          console.log(weight, finalGrocPrice)
          totSellingPrice += Number(finalGrocPrice * item.Quantity);
          taxAndCharges = (0.18 * Number(totSellingPrice)).toFixed(2);
          setConvenienceFee(2);
          totalP = Number(totSellingPrice + Number(taxAndCharges) + Number(convenienceFee));

        }else {

          totSellingPrice += Number(item.SellingPrice * item.Quantity);
          taxAndCharges = (0.18 * Number(totSellingPrice)).toFixed(2);
          setConvenienceFee(2);
          totalP = Number(totSellingPrice + Number(taxAndCharges) + Number(convenienceFee));
        }
    //   setTaxAndCharge((prev) => prev + 10);
    //   setTotalPrice(itemPrice + taxAndCharge);
    });

    setItemPrice(totSellingPrice.toFixed(2));
    setTaxAndCharge(taxAndCharges);
    setTotalPrice(totalP.toFixed(2));

    console.log(items);
  }, [items, isQuantityChanged]);

  
  const getQuantity = (qty, id) => {
    // console.log(qty,id);
    items.map((item)=>{
        if (item.id == id) {
            item.Quantity = qty;
        }
    })
    // console.log(items);
  }

//   const validateBarcode = (barcode) => {
//     if (barcode.length === 10) {
//       let a = barcode.substring(0, 4);
//       let b = barcode.substring(4, 7);
//       let c = barcode.substring(7, 10);
//     }
//     return a, b, c;
//   };

//   const groceryPriceCalculation = (a, b, c, MRP, SP) => {
//     let MRP;
//     let SP;
//     let weight;
//     if (MRP === SP) {
//       kgPrice = MRP;
//     } else {
//       kgPrice = SP;
//     }
//     weight = Number(b) + (Number(c) / 1000);
//     finalPrice = Number(weight) * Number(kgPrice);
//   };

//   const fmcgPriceCalculation = () => {
//       if (MRP === SP) {

//       }
//   }
  

    const toggleScanner = (value) => {
        setScanner(value);
    }

    const populateData = (data) => {
        //console.log(data);
        setBarcodeData(data);
      }

  return (
    <>
      <Scanner toggleScanner={toggleScanner}/>
      {scanner && <BarcodeReader toggleScanner={toggleScanner} populateData={populateData}/>}
      <Grid container justifyContent="center" spacing={1}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12}>
            {<CartItem item={item} handleToggleCart={handleToggleCart} getQuantity={getQuantity} setIsQuantityChanged={setIsQuantityChanged}/>}
          </Grid>
        ))}
      </Grid>
      <Grid conatianer style={{ margin: "30px 0px", backgroundColor:"#e2f9f0", padding:"12px 8px" }}>
        <div className="cart__item-total">
          <p style={{ margin: 0 }}>Item Total</p>
          <p style={{ margin: 0 }}>₹ {itemPrice}</p>
        </div>
        <div className="cart__taxes">
          <p style={{ margin: 0 }}>Taxes and charges</p>
          <p style={{ margin: 0 }}>₹ {taxAndCharge}</p>
        </div>
        <div className="cart__convenienceFee">
          <p style={{ margin: 0 }}>Convenience Fee</p>
          <p style={{ margin: 0 }}>₹ {convenienceFee}</p>
        </div>
        <div className="cart__total">
          <h4>Total</h4>
          <h4>₹ {totalPrice}</h4>
        </div>
      </Grid>
      <div className="cart__checkout-button">
        <Button
          className="checkout-btn"
          variant="text"
          style={{
            backgroundColor: "#20CE88",
            borderRadius: "8px",
            width: "85VW",
            margin: "10px 10px",
          }}
        >
          CHECKOUT
          <ArrowRightAltIcon />
        </Button>
      </div>
    </>
  );
};

export default Cart;
