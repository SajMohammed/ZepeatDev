import React from 'react';
import BarcodeIcon from '../../assets/BarcodeIcon.png';

const Scanner = ({toggleScanner}) => {
  return (
    <div className="scanner__container" onClick = {() => {toggleScanner(true)}} style={{backgroundColor:"var(--color-bg)", margin:'20px 30px', padding:'16px 0px', borderRadius:'32px'}}>
        <div className="scanner__barcode">
            <img src={BarcodeIcon} alt="Barcode Icon" />
        </div>
        <h5 style={{margin:0, color:"var(--color-secondary)"}}>Scan New Product</h5>
    </div>
  
  )};

export default Scanner;
