import React from 'react'
import Navbar from '../Navbar/Navbar'
import ProfileHeader from './ProfileHeader'
import PurchaseItem from './PurchaseItem'

const MyPurchases = () => {
  return (
    <div>
        <Navbar />
        <ProfileHeader />
        <div className="purchases-container">
            <PurchaseItem />
        </div>
    </div>
  )
}

export default MyPurchases