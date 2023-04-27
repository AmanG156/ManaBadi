import React from 'react';
import {
  Box, CircularProgress,
} from '@mui/material';
import loaderStyle from './style';

function Loader({ message }) {
  return (
    <Box
      style={loaderStyle}
    >
      <CircularProgress color="inherit" />
      <h5>{message}</h5>
    </Box>
  );
}
export default Loader;
