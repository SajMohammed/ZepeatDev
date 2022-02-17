import React, { Fragment, useEffect } from 'react';
import Cart from '../components/Cart/Cart';
import Loyalty from '../components/Loyalty/Loyalty';
import TabButton from '../components/TabButton/TabButton';

const Checkout = () => {
  
  return (

    <Fragment>
        <Loyalty />
        <Cart />
        <TabButton />
    </Fragment>
  
  )};

export default Checkout;
