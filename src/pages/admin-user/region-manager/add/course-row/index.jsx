import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Stack,
  TableCell,
  TableRow,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import styles from './style';
import useStyles from '../../../../../custom-hooks/useStyles';
import { PerformantTextField } from '../../../../../components/atoms';
import ButtonAtom from '../../../../../components/atoms/button';
import { Buttons } from '../../../../../constant';
import { AntSwitch } from '../../../../../utils/commonUiComponent';

export default function CourseRow(props) {
  const { t } = useTranslation();
  const {
    courseInfo, updateCourse,
  } = props;
  const [anchorEl, setAnchorEl] = React.useState();
  const open = Boolean(anchorEl);
  const classes = useStyles(styles)();
  const [status, setStatus] = useState(courseInfo?.isActive || false);

  const [savedValues, setSavedValues] = useState({
    fee: courseInfo?.fee?.fee || '0',
    examFee: courseInfo?.fee?.examFee || '0',
    registrationFee: courseInfo?.fee?.registrationFee || '0',
    repeatingDiscount: courseInfo?.fee?.repeatingDiscount || '0',
    siblingDiscount: courseInfo?.fee?.siblingDiscount || '0',
  });

  const handleClick = (event) => {
    setAnchorEl(null);
    setAnchorEl(event.currentTarget);
  };

  const validationSchema = Yup.object({
    fee: Yup.number(t('FEE_REQUIRED'))
      .test(
        'Is positive?',
        t('POSITIVE_REPEATING_DISCOUNT_REQUIRED'),
        (value) => value >= 0,
      )
      .required(t('FEE_REQUIRED'))
      .typeError(t('FEE_REQUIRED')),
    examFee: Yup.number(t('EXAM_FEE_REQUIRED'))
      .test(
        'Is positive?',
        t('POSITIVE_REPEATING_DISCOUNT_REQUIRED'),
        (value) => value >= 0,
      )
      .required(t('EXAM_FEE_REQUIRED'))
      .typeError(t('EXAM_FEE_REQUIRED')),
    registrationFee: Yup.number(t('REGISTRATION_FEE_REQUIRED'))
      .test(
        'Is positive?',
        t('POSITIVE_REPEATING_DISCOUNT_REQUIRED'),
        (value) => value >= 0,
      )
      .required(t('REGISTRATION_FEE_REQUIRED'))
      .typeError(t('REGISTRATION_FEE_REQUIRED')),
    repeatingDiscount: Yup.number(t('REPEATING_DISCOUNT_REQUIRED'))
      .test(
        'Is positive?',
        t('POSITIVE_REPEATING_DISCOUNT_REQUIRED'),
        (value) => value >= 0,
      )
      .required(t('REPEATING_DISCOUNT_REQUIRED'))
      .typeError(t('REPEATING_DISCOUNT_REQUIRED')),

    siblingDiscount: Yup.number(t('SIBLING_DISCOUNT_REQUIRED'))
      .test(
        'Is positive?',
        t('POSITIVE_REPEATING_DISCOUNT_REQUIRED'),
        (value) => value >= 0,
      )
      .required(t('SIBLING_DISCOUNT_REQUIRED'))
      .typeError(t('SIBLING_DISCOUNT_REQUIRED')),

  });

  const formik = useFormik({
    initialValues: {
      fee: courseInfo?.fee?.fee || '0',
      examFee: courseInfo?.fee?.examFee || '0',
      registrationFee: courseInfo?.fee?.registrationFee || '0',
      repeatingDiscount: courseInfo?.fee?.repeatingDiscount || '0',
      siblingDiscount: courseInfo?.fee?.siblingDiscount || '0',
    },
    validationSchema,
    onSubmit: () => {
    },
  });

  const setPreviousFieldTouch = (key) => {
    const allFields = [
      'fee',
      'examFee',
      'registrationFee',
      'repeatingDiscount',
      'siblingDiscount',
    ];

    const index = allFields.indexOf(key);
    if (index > -1) {
      const obj = {};
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i <= index; i++) {
        const element = allFields[i];
        obj[element] = true;
      }
      formik.setTouched({ ...formik.touched, ...obj }, true);
    }
  };

  // eslint-disable-next-line no-nested-ternary
  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : errorText ? (
    <span className={classes.errorText}>{errorText}</span>
  ) : null);

  const updateCourseInfo = () => {
    updateCourse({
      status,
      values: formik.values,
      valid: !Object.values(formik?.errors).length,
      errors: formik.errors,
    });
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.checked);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    updateCourseInfo();
  };

  useEffect(() => {
    updateCourseInfo();
  }, [status]);
  const exceptThisSymbols = ['e', 'E', '+', '-', '.'];

  const onCancel = () => {
    setAnchorEl(null);
    formik.setFieldValue('fee', savedValues?.fee || '0');
    formik.setFieldValue('examFee', savedValues?.examFee || '0');
    formik.setFieldValue('registrationFee', savedValues?.registrationFee || '0');
    formik.setFieldValue('repeatingDiscount', savedValues?.repeatingDiscount || '0');
    formik.setFieldValue('siblingDiscount', savedValues?.siblingDiscount || '0');
    updateCourse({
      status,
      values: {
        ...formik.values,
        fee: savedValues?.fee || '0',
        examFee: savedValues?.examFee || '0',
        registrationFee: savedValues?.registrationFee || '0',
        repeatingDiscount: savedValues?.repeatingDiscount || '0',
        siblingDiscount: savedValues?.siblingDiscount || '0',
      },
      valid: !Object.values(formik?.errors).length,
      errors: formik.errors,
    });
    setAnchorEl(null);
  };

  const onSave = () => {
    if (Object.keys(formik.errors).length) return;
    setSavedValues({
      fee: formik.values?.fee || '0',
      examFee: formik.values?.examFee || '0',
      registrationFee: formik.values?.registrationFee || '0',
      repeatingDiscount: formik.values?.repeatingDiscount || '0',
      siblingDiscount: formik.values?.siblingDiscount || '0',
    });
    handleCloseMenu();
  };

  return (
    <TableRow
      align="left"
      key={courseInfo?.name}
    >
      <TableCell align="left" component="th" scope="row">
        <p>{courseInfo?.name}</p>
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        <div className={`${classes.feeStructure} ${classes.levelDropdown}`}>
          <div className="label">Level</div>
          <p>{courseInfo?.level}</p>
        </div>

      </TableCell>
      <TableCell align="center" component="th" scope="row">

        <Grid item xs={12} md={3} lg={3} alignSelf="center">

          <Stack className={classes.switchUi} direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Typography className={`${classes.switchText} ${!status ? classes.inactiveText : null}`}>{t('INACTIVE_STATUS')}</Typography>
            <AntSwitch
              defaultChecked
              checked={status}
              onChange={handleStatusChange}
              inputProps={{ 'aria-label': 'ant design' }}
            />
            <Typography className={`${classes.switchText} ${status ? classes.activeText : null}`}>{t('ACTIVE_STATUS')}</Typography>
          </Stack>
        </Grid>

      </TableCell>
      <TableCell align="center" component="th" scope="row">
        <div className={classes.feeStructure}>
          <div className="label">Amount</div>
          <p>
            $
            {' '}
            {formik?.values?.fee}
          </p>
          <KeyboardArrowDownIcon className={classes.arrowIcon} onClick={(e) => { handleClick(e); }} />
          <Menu
            id="account-menu"
            open={open}
            className={classes.accountMenu}
            // onClose={() => handleCloseMenu()}
            // onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                filter: 'drop-shadow(0px 2px 1px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiMenuItem-root': {
                  borderBottom: '0.1vw solid #d0d0d0',
                  '@media (min-width: 1200px)': {
                    padding: '1vw',
                    fontSize: '0.9vw',
                  },
                  borderRadius: '0vw',
                  display: 'list-item',
                  overflow: 'auto',
                },
                '&.MuiPaper-root-MuiPopover-paper': {
                  overflow: 'auto',
                },
              },
            }}
          >
            <FormikProvider value={formik}>
              <Grid container spacing={1} className={classes.textFieldSet}>

                <Grid item xs={12} mt={1}>
                  <PerformantTextField
                    label={`${t('FEE')}`}
                    id="fee"
                    required
                    name="fee"
                    type="number"
                    value={formik.values.fee}
                    onBlur={() => setPreviousFieldTouch('fee')}
                    error={getErrorText('fee')}
                    onChange={formik.handleChange}
                    labelId="fee"
                    variant="outlined"
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <PerformantTextField
                    label={`${t('EXAM_FEE')}`}
                    id="examFee"
                    required
                    name="examFee"
                    type="number"
                    value={formik.values.examFee}
                    onBlur={() => setPreviousFieldTouch('examFee')}
                    error={getErrorText('examFee')}
                    onChange={formik.handleChange}
                    labelId="examFee"
                    variant="outlined"
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}

                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <PerformantTextField
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                    label={`${t('REGISTRATION_FEE')}`}
                    id="registrationFee"
                    required
                    name="registrationFee"
                    type="number"
                    value={formik.values.registrationFee}
                    onBlur={() => setPreviousFieldTouch('registrationFee')}
                    error={getErrorText('registrationFee')}
                    onChange={formik.handleChange}
                    labelId="registrationFee"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <PerformantTextField
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                    label={`${t('REPEATING_DISCOUNT')}`}
                    id="repeatingDiscount"
                    required
                    name="repeatingDiscount"
                    type="number"
                    value={formik.values.repeatingDiscount}
                    onBlur={() => setPreviousFieldTouch('repeatingDiscount')}
                    error={getErrorText('repeatingDiscount')}
                    onChange={formik.handleChange}
                    labelId="repeatingDiscount"
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12} mt={1}>
                  <PerformantTextField
                    onKeyDown={(e) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                    label={`${t('SIBLING_DISCOUNT')}`}
                    id="siblingDiscount"
                    required
                    name="siblingDiscount"
                    type="number"
                    value={formik.values.siblingDiscount}
                    onBlur={() => setPreviousFieldTouch('siblingDiscount')}
                    error={getErrorText('siblingDiscount')}
                    onChange={formik.handleChange}
                    labelId="siblingDiscount"
                    variant="outlined"
                  />
                </Grid>
                <ButtonAtom
                  btntype={Buttons.PRIMARY}
                  onClick={() => onSave()}
                  className={classes.secButton}
                  name={`${t('SAVE')}`}
                />
                <ButtonAtom
                  btntype={Buttons.SECONDARY}
                  onClick={onCancel}
                  className={classes.actionCancelButton}
                  name="Cancel"
                />
              </Grid>
            </FormikProvider>
          </Menu>
        </div>
      </TableCell>
    </TableRow>
  );
}
