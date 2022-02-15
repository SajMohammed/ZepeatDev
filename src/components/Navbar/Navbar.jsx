import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Navbar = () => {
  return (
    <div>
        <AppBar position="relative" color="inherit">
            <Toolbar style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <KeyboardBackspaceIcon />
                <ShoppingBagIcon />
            </Toolbar>
        </AppBar>
    </div>
  )
};

export default Navbar;
