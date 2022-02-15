import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

const Loyalty = () => {
  return (
      
    <div style={{marginTop:'24px', marginBottom:'24px'}}>
        <CircularProgress color="primary" variant="determinate" value={75} style={{color:'#20CE88'}} />
        <Typography variant="h5" style={{marginTop:'20px'}}>Loyalty Progress</Typography>
    </div>

  )};

export default Loyalty;
