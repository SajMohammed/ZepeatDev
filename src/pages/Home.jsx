import React, { Fragment, useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Loyalty from "../components/Loyalty/Loyalty";
import TabButton from "../components/TabButton/TabButton";
import { db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";


const Home = () => {

  const [partnerFirestoreId, setPartnerFirestoreId] = useState("");
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
    </Fragment>
  );
};

export default Home;
