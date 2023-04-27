/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function Toaster({ snackbarData, revertSnackBarData }) {
  const [data, setData] = useState({});
  useEffect(() => {
    setData(snackbarData);
  }, [snackbarData]);
  const handleSnackBar = (action, text = '', _type = 'success') => {
    setData({
      isVisible: action !== 'hide',
      data: text,
      type: _type,
    });
    revertSnackBarData();
  };
  return (
    <div>
      {data.isVisible
   && (
   <Snackbar open={data.isVisible} onClose={() => handleSnackBar('hide')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
     <Alert onClose={() => handleSnackBar('hide')} severity={data.type}>
       {data.data}
     </Alert>
   </Snackbar>
   )}
    </div>
  );
}

Toaster.propTypes = {
  snackbarData: PropTypes.objectOf(Object),
  revertSnackBarData: PropTypes.func,
};

Toaster.defaultProps = {
  snackbarData: {},
  revertSnackBarData: '',
};

export default Toaster;
