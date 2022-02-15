import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CartItem from "./CartItem/CartItem";
import "./cart.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Scanner from "../Scanner/Scanner";
import { db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

// const items = [
//   { id: 1, name: "Nivya Body Cream", category: "Self Grooming", price: "250" },
//   { id: 2, name: "Vim Bar", category: "Home Care", price: "50" },
//   { id: 3, name: "Rite Bite", category: "Self Grooming", price: "306" },
// ];

const Cart = () => {
  const [items, setItems] = useState([]);
  const [barcode, setBarcode] = useState("4003");
  const [itemPrice, setItemPrice] = useState(0);
  const [taxAndCharge, setTaxAndCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isQuantityChanged, setIsQuantityChanged] = useState(0);
  let totSellingPrice = 0;
  let taxAndCharges = 0;
  let totalP = 0;
  let partnerFirestoreId = "VXM509inNCe8tZEBz1RD";
  let brandsFirestoreId = "iuu6AvatBJfqc9Mtn4Zj";

  const productsCollectionRef = collection(
    db,
    `Partners/${partnerFirestoreId}/Brands-MoT/${brandsFirestoreId}/Products`
  );

  const handleToggleCart = (id) => {
    console.log(items.length);
    if (items.length == 1) {
      console.log(id);
      setItems([]);
    } else {
      console.log(id);
      setItems(items.slice(items.indexOf(id, 1)));
      // setItems(items.filter(item => item.id != id));
    }
  };

  useEffect(() => {
    const getData = async () => {
      const q = query(
        productsCollectionRef,
        where("Category", "==", "Groceries")
      );
      const docsSnap = await getDocs(q);

      docsSnap.forEach((doc) => {
        let category = doc.data().Category;
        if (category === "Groceries") {
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
        }
      });
    };
    getData();
  }, []); // Here the dependency is the barcode state variable

  useEffect(() => {
    //Sets the Total Price logic
    
    console.log(items);
   // console.log("called on items change");
    items.map((item) => {
        console.log(item.Name, item.Quantity);
      totSellingPrice += Number(item.SellingPrice * item.Quantity);
      taxAndCharges = 20;
      totalP = Number(totSellingPrice + Number(taxAndCharges));
    //   setTaxAndCharge((prev) => prev + 10);
    //   setTotalPrice(itemPrice + taxAndCharge);
    });

    setItemPrice(totSellingPrice);
    setTaxAndCharge(taxAndCharges);
    setTotalPrice(totalP);

    console.log(items);
  }, [items, isQuantityChanged]);

  useEffect(() => {
    
  },[])
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

  return (
    <>
      <Scanner />
      <Grid container justifyContent="center" spacing={1}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12}>
            {<CartItem item={item} handleToggleCart={handleToggleCart} getQuantity={getQuantity} setIsQuantityChanged={setIsQuantityChanged}/>}
          </Grid>
        ))}
      </Grid>
      <Grid conatianer style={{ marginTop: "30px" }}>
        <div className="cart__item-total">
          <p style={{ margin: 0 }}>Item Total</p>
          <p style={{ margin: 0 }}>₹ {itemPrice}</p>
        </div>
        <div className="cart__taxes">
          <p style={{ margin: 0 }}>Taxes and charges</p>
          <p style={{ margin: 0 }}>₹ {taxAndCharge}</p>
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
