import React from 'react';

const Brand = ({image}) => {
  return (

    <div style={{display:'flex',justifyContent:'center',margin:0}}>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',width:'145px',height:'209px',backgroundColor:'#F3F6F8', borderRadius:'32px'}}>
            <img src={image} />
        </div>
    </div>
      
)};

export default Brand;
