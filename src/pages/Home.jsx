import React, { Fragment, useEffect, useState, useContext } from "react";
import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Loyalty from "../components/Loyalty/Loyalty";
import TabButton from "../components/TabButton/TabButton";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";
// import PhoneAuth from "../components/PhoneAuth/PhoneAuth";
import { UserContext } from "../contexts/UserContext";


const Home = () => {
const user = useContext(UserContext)
// const [showPhoneAuth, setShowPhoneAuth] = useState(true);
  useEffect(()=> {
    console.log("trial", localStorage.getItem("trial"));
    console.log("context uuid : ", user);
    console.log("local storage uuid : ",localStorage.getItem("localStorageUserId"));

    if (localStorage.getItem("localStorageUserId") != null) {
      console.log("inside if of localStorage")
      // setShowPhoneAuth(false);
    }else {
      // setShowPhoneAuth(true); 
    }

  },[])

  const [partnerFirestoreId, setPartnerFirestoreId] = useState("");
  // const [showPhoneAuth, setShowPhoneAuth] = useState();
  useEffect(() => {
    const getPartner = async () => {
      const partnerCollectionRef = collection( db, "Partners" );

      const q = query(
        partnerCollectionRef,
        where("PartnerPID", "==", "1001")
      );
      const docSnap = await getDocs(q);
        docSnap.forEach((doc) => {
          setPartnerFirestoreId(doc.id);
          //Get rest of the Partner details here
        })
      
    };
    getPartner();
  
    return () => {
      
    }
  }, [partnerFirestoreId])
  

  return (
    <Fragment>
      <Banner />
      <Loyalty />
      <Brands partnerFirestoreId="VXM509inNCe8tZEBz1RD" />
      <TabButton />
      {/* <PhoneAuth open={showPhoneAuth}/> */}
    </Fragment>
  );
};

export default Home;
