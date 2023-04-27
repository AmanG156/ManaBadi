/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import BTN from '../../../constant/buttonTypes';

export default function ButtonAtom(props) {
  const {
    onClick, name, disabled, btntype, icon, type, className, customCss, id,
  } = props;
  const classes = useStyles(styles)();

  const getClass = (btype) => {
    if (btype === BTN.PRIMARY) return classes.primaryButton;
    if (btype === BTN.SECONDARY) return classes.secButton;
    if (btype === BTN.DISABLE) return classes.disableButton;
    if (btype === BTN.ICON) return classes.iconButton;
    return classes.customizedButton;
  };

  return (
    <Button
      style={customCss}
      // data-testid="button"
      type={type}
      className={clsx(className, getClass(btntype))}
      onClick={onClick}
      disabled={disabled}
      data-testid={id}
    >
      <span className={classes.icon}>{icon}</span>
      {name}
    </Button>
  );
}
