import React, { Fragment } from "react";
import Banner from "../components/Banner/Banner";
import Brands from "../components/Brands/Brands";
import Loyalty from "../components/Loyalty/Loyalty";
import TabButton from "../components/TabButton/TabButton";


const Home = () => {
  return (
    <Fragment>
      <Banner />
      <Loyalty />
      <Brands />
      <TabButton />
    </Fragment>
  );
};

export default Home;
