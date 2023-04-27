import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
// import useStyles from '../../../custom-hooks/useStyles';
// import style from './style';

export default function LinearProgressBar({
  totalPercent, value, customClass, maximumMarks,
}) {
  // const classes = useStyles(style)();
  return (
    <span className={customClass}>
      <LinearProgress
        variant="determinate"
        maxvalue={maximumMarks}
        value={value}
      />
      {totalPercent && `${value}/${maximumMarks}`}
    </span>
  );
}
