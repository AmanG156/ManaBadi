import * as React from 'react';
import style from './style';

function DividerWithText({ children }) {
  const classes = style();
  return (
    <div className={classes.container}>
      <div className={classes.border} />
      <span className={classes.content}>{children}</span>
      <div className={classes.border} />
    </div>
  );
}
export default DividerWithText;
