import React, { Fragment, useEffect } from 'react';
import Cart from '../components/Cart/Cart';
import Header from '../components/Header/Header';
import Loyalty from '../components/Loyalty/Loyalty';
import Navbar from '../components/Navbar/Navbar';
import TabButton from '../components/TabButton/TabButton';

const Checkout = () => {
  
  return (

    <Fragment>
        <Navbar />
        <Header title="Zepeat X MoT" />
        <Loyalty />
        <Cart />
        <TabButton />
    </Fragment>
  
  )};

export default Checkout;
