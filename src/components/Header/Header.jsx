import React from 'react';

const Header = ({title}) => {
  return (
      <>
        <div style={{marginTop:'10px', color:'var(--color-primary)'}}>
            <h2>{title}</h2>
        </div>
        <div className="header__location" style={{display:'flex', justifyContent:'flex-start', marginLeft:'12px'}}>
            <p style={{marginTop:0, color:'var(--color-primary)'}}>Location : Trivandrum</p>
        </div>
      </>
  )};

export default Header;
