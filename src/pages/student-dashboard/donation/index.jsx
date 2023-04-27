/* eslint-disable no-empty */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  TextareaAutosize,
} from '@mui/material';
import { useFormik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import * as Yup from 'yup';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import styles from './style';
import { Buttons } from '../../../constant';
import ButtonAtom from '../../../components/atoms/button';
import commonStyle from '../../../utils/commonClasses';
import { getDonations } from '../../../store/actions/getPayment';
import TextFieldAtom from '../../../components/atoms/textfield';
import { setLocalStorage } from '../../../utils/localStorageMethod';
import { donationService } from '../../../store/services/auth';
import Loader from '../../../components/atoms/loader';
import usePayment from '../../../custom-hooks/usePayment';

const MAX_NOTES = 150;

export default function Donation({ studentAccountDetails }) {
  const studentOptions = studentAccountDetails?.studentData?.map((i) => ({
    id: i.id,
    name: `${i?.studentInfo?.firstName}  ${i?.studentInfo?.lastName}`,
  }));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const paymentData = usePayment();
  const [loading, setLoading] = useState(false);
  const donationsForOptions = paymentData?.donations;
  const classes = useStyles(styles)();
  const commonClasses = useStyles(commonStyle)();

  useEffect(() => {
    dispatch(getDonations());
  }, []);
  const validationSchema = Yup.object({
    donationFor: Yup.string(t('DONATION_FOR_REQUIRED')).required(
      t('DONATION_FOR_REQUIRED'),
    ),
    donationCause:
      Yup.string(t('DONATION_CAUSE_REQUIRED'))
        .required(t('DONATION_CAUSE_REQUIRED')),
    donationAmount:
      Yup.number()
        .required(t('DONATION_AMOUNT_REQUIRED'))
        .moreThan(0, t('DONATION_AMOUNT_LESS_THAN_ZERO')),

    donationNotes: Yup.string(t('DONATION_NOTES_MIN'))
      .min(2, t('DONATION_NOTES_MIN'))
      .max(MAX_NOTES, t('DONATION_NOTES_MAX'))
      .required(
        t('DONATION_NOTES_MIN'),
      ),
  });
  const formik = useFormik({
    initialValues: {
      donationFor: studentOptions?.length === 1 ? studentOptions[0]?.name : '',
      donationCause: '',
      donationAmount: '',
      donationNotes: '',

    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      try {
        const donationCause = donationsForOptions?.find((i) => i?.id === values.donationCause);
        const redBody = {
          causeOfContribution: donationCause?.name,
          type: values.donationFor,
          amount: parseFloat(values.donationAmount),
          notes: values.donationNotes,
        };
        donationService(redBody).then((response) => {
          if (response?.success && response?.data?.approveLink) {
            setLocalStorage('orderId', response?.data?.orderId);
            setLocalStorage('isDonation', true);
            setLocalStorage('paymentFor', 'donation');
            window.location.assign(response?.data?.approveLink);
            setLoading(false);
          }
        }).catch(() => {
          setLoading(false);
        });
      } catch (err) {
      }
    },
  });
  const setPreviousFieldTouch = (key) => {
    const allFields = ['donationFor', 'donationCause', 'donationAmount', 'donationNotes'];
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
  const getErrorText = (key, notesError) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={notesError ? classes.notesErrorText : classes.errorText}>
      {formik.errors[key]}
    </span>
  ) : null);

  return (
    <Box>
      <Grid
        container
        className={classes.rowWrapper}
        item
        xs={12}
        md={12}
        lg={12}
        flexDirection="row"
      >
        <Grid item className={classes.labelWrapper}>
          <Typography className={classes.textStyle}>
            {t('DONATION_FOR')}
          </Typography>
        </Grid>
        <Grid item className={classes.dropdownWrapper}>
          {studentOptions?.length === 1 ? (
            <span className={classes.studentName}>
              {studentOptions[0]?.name}
            </span>
          )
            : (
              <Dropdown
                id="donationFor"
                name="donationFor"
                variant="standard"
                options={studentOptions}
                value={formik.values.donationFor}
                customClass={classes.dropdown}
                changeCss
                customFormControlCss={{ width: '100%' }}
                labelId="donationFor"
                handleChange={formik.handleChange}
                handleBlur={() => setPreviousFieldTouch('donationFor')}
              />
            )}
          {getErrorText('donationFor')}
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.rowWrapper}
        item
        xs={12}
        md={12}
        lg={12}
        flexDirection="row"
      >
        <Grid item className={classes.labelWrapper}>
          <Typography className={classes.textStyle}>
            {t('CONTRIBUTION_FOR_CAUSE')}
          </Typography>
        </Grid>
        <Grid item className={classes.dropdownWrapper}>
          <Dropdown
            id="donationCause"
            name="donationCause"
            variant="standard"
            options={donationsForOptions}
            value={formik.values.donationCause}
            customClass={classes.dropdown}
            changeCss
            customFormControlCss={{ width: '100%' }}
            labelId="donationCause"
            handleChange={formik.handleChange}
            handleBlur={() => setPreviousFieldTouch('donationCause')}
          />
          {getErrorText('donationCause')}
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.rowWrapperAmount}
        item
        xs={12}
        md={12}
        lg={12}
        flexDirection="row"
      >
        <Grid item xs={4} className={classes.labelWrapper}>
          <Typography className={classes.textStyle}>
            {t('DONATION_AMOUNT')}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <TextFieldAtom
            className={classes.donationAmount}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  $
                </InputAdornment>
              ),
            }}
            type="number"
            id="donationAmount"
            name="donationAmount"
            onChange={(e) => {
              if (e.target.value >= 0) {
                formik.handleChange(e);
              }
            }}
            onBlur={(e) => {
              setPreviousFieldTouch('donationAmount');
              formik.handleBlur(e);
              if (
                formik.values.donationAmount < 0
                || formik.values.donationAmount === ''
              ) {
                formik.setFieldValue('donationAmount', '0.00');
              } else {
                formik.setFieldValue(
                  'donationAmount',
                  formik.values.donationAmount.toFixed(2),
                );
              }
            }}
            value={formik.values.donationAmount}
            variant="standard"
            onKeyDown={(event) => {
              if (event.key === '+' || event.key === '-' || event.keyCode === 69) {
                event.preventDefault();
              }
            }}
          />
          {getErrorText('donationAmount')}
        </Grid>
      </Grid>
      <Grid mt={12} container item className={classes.notesWrapper}>
        <TextareaAutosize
          id="donationNotes"
          name="donationNotes"
          className={classes.textField}
          type="text"
          placeholder={t('DONATION_NOTES')}
          value={formik.values.donationNotes}
          onChange={(e) => {
            formik.handleChange(e);
          }}
          onBlur={() => setPreviousFieldTouch('donationNotes')}
        />
      </Grid>
      <Grid container item>
        <Typography
          className={classes.donationNotesLength}
          variant="p"
        >
          {`${formik.values.donationNotes.length}/${MAX_NOTES}`}

        </Typography>
        {getErrorText('donationNotes', true)}
      </Grid>
      <Grid container item className={classes.buttonWrapper}>
        <ButtonAtom
          name={t('DONATE')}
          btntype={Buttons.PRIMARY}
          onClick={formik.handleSubmit}
          className={`${commonClasses.secButton}`}
        />
      </Grid>
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}
