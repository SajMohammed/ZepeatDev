import React from 'react';

const Brand = ({ id, image, handleBrandOnClick }) => {
    const handleOnClick = () => {
        handleBrandOnClick(id);
    }
  return (

    <div style={{display:'flex',justifyContent:'center',margin:0}} onClick={handleOnClick}>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', width:'145px',height:'209px',backgroundColor:'#F3F6F8', borderRadius:'32px'}}>
            <img src={image} style={{width:"130px", height:"40px"}} />
        </div>
    </div>
      
)};

export default Brand;
