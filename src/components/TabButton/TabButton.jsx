import { Button } from '@material-ui/core';
import React from 'react';

const TabButton = () => {
  return (
    <div style={{marginTop:'62px', marginBottom:'24px', marginLeft:'15px', marginRight:'15px'}}>
        <Button variant="contained" size="medium" style={{borderRadius:'20px',backgroundColor:'#20CE88',color:'white', padding:'8px 40px'}}>
          Outlet
        </Button>
        <span> </span>
        <Button variant="contained" size="medium" style={{borderRadius:'20px', padding:'8px 40px'}}>
          Profile
        </Button>
    </div>
  )};

export default TabButton;
