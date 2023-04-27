import React, { useEffect } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';

function Chip(props) {
  const {
    handleCheck, tagIndex, listData, onDelete,
  } = props;
  const classes = useStyles(styles)();
  useEffect(() => {}, [listData]);
  return (
    <div className="app">
      {listData?.map((opt, index) => (
        <div key={opt?.id}>
          {opt?.name && index === tagIndex ? (
            <div className={opt?.checked === true
              ? classes.checkListContainer
              : classes.nonPrimaryCheckListContainer}
            >
              <span className={classes.itemName}>
                {opt?.name}
                <span>
                  <span className={classes.crossIcon}>
                    <CloseIcon onClick={() => onDelete(index)} />
                  </span>
                  {opt.checked === true ? (
                    <span className={classes.checkListIcon}>
                      <StarRateIcon onClick={() => handleCheck(opt?.id)} />
                    </span>
                  ) : (
                    <span className={classes.checkListIcon}>
                      <StarOutlineIcon onClick={() => handleCheck(opt?.id)} />
                    </span>
                  )}
                </span>
              </span>
              <p className={classes.itemEmail}>{opt?.manabadiEmail}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Chip;
