import React, { memo } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import profilePic from '../../../assets/images/profileUpload.png';

const useStyles = makeStyles(() => ({
  avatar: {
    width: '3vw',
    height: '3vw',
    borderRadius: '50%',
  },
}));
function CommonProfileImage({ src }) {
  const classes = useStyles();
  return (
    <img
      alt="avatar"
      className={classes.avatar}
      src={src ? `${src}?${Date.now()}` : profilePic}
    />
  );
}
function areEqual(preProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return preProps.src === nextProps.src;
}
export default memo(CommonProfileImage, areEqual);
