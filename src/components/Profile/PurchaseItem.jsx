import { Card, CardContent } from '@mui/material';
import React from 'react'

const PurchaseItem = ({ brand, price, date}) => {
  return (
    <div className="purchaseItem-container" style={{margin:"5px 10px"}}>
        <Card>
            <CardContent style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"20px 20px"}}>
                <div className="brand-container">
                <h3>Brand</h3>
                <h3>Partner</h3>
                </div>
                <div>
                <p>Price</p>
                <p>Date</p>
                </div>
            </CardContent>
        </Card>
    </div>
    )
}

export default PurchaseItem