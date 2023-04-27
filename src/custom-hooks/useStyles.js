import React from 'react';
import { makeStyles } from '@mui/styles';

export default function useStyles(styles) {
  return React.useMemo(() => makeStyles(styles), [styles]);
}
