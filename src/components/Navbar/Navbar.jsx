import React from 'react';
import { AppBar, Badge, Toolbar, Typography } from '@material-ui/core';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <AppBar position="relative" color="inherit">
            <Toolbar style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Link to="/"><KeyboardBackspaceIcon /></Link>
            <Badge color="secondary" badgeContent={0} showZero>
                <ShoppingBagIcon />
          </Badge>
            </Toolbar>
        </AppBar>
    </div>
  )
};

export default Navbar;
