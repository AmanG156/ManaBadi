import React, { useEffect } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import useStyles from '../../../../custom-hooks/useStyles';
import profilePic from '../../../../assets/images/profileUpload.png';
import styles from './style';

function Chip(props) {
  const {
    handleCheck, tagIndex, listData, onDelete,
  } = props;
  const classes = useStyles(styles)();
  useEffect(() => { }, [listData]);
  return (
    <div className="app">
      {listData?.map((opt, index) => (
        <div key={opt?.id}>
          {opt?.name && index === tagIndex ? (
            <div className={opt?.isPrimary === true
              ? classes.checkListContainer
              : classes.nonPrimaryCheckListContainer}
            >
              <span className={opt.isPrimary === true ? classes.primaryItemName : classes.itemName}>
                <div className={classes.labelImage}>
                  <img src={opt?.profilePhoto || profilePic} alt="" />
                </div>
                <div className={classes.labelDetails}>
                  <p>{opt?.name}</p>
                  <p>{opt?.manabadiEmail}</p>
                </div>
                <span>
                  <span className={opt.isPrimary === true ? classes.checkedCross : classes.crossIcon}>
                    <CloseIcon onClick={() => onDelete(index)} />
                  </span>
                  {opt.isPrimary === true ? (
                    <span className={classes.checkedIcon} onClick={() => handleCheck(opt)}>
                      <StarRateIcon />
                    </span>
                  ) : (
                    <span className={classes.unCheckedIcon} onClick={() => handleCheck(opt)}>
                      <StarOutlineIcon />
                    </span>
                  )}
                </span>
              </span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default Chip;
