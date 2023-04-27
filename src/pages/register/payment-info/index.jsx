import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, Paper, Box } from '@mui/material';
import _ from 'lodash';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import style from '../style';
import commonStyle from '../../../utils/commonClasses';
import Dropdown from '../../../components/atoms/dropdown';
import CheckboxAtom from '../../../components/atoms/checkbox';
import { setLocalStorage } from '../../../utils/localStorageMethod';
import TextFieldAtom from '../../../components/atoms/textfield';
import DialogAtom from '../../../components/atoms/dialog';
import { getDonations } from '../../../store/actions/getPayment';
import BTN from '../../../constant/buttonTypes';
import { createLinkService } from '../../../store/services/auth';
import { avoidNegativeValue, calculateTotalFee, calculateTotalPayment } from '../../../utils/methods';
import Loader from '../../../components/atoms/loader';
import usePayment from '../../../custom-hooks/usePayment';

function DialogContent({ data, classes, redirectToPaymentLoading }) {
  const { t } = useTranslation('translation');
  return (
    <Grid item xs={12} ld={10} className={classes.content}>
      {redirectToPaymentLoading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
      {data}
      <ul className={classes.list}>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.DESCRIPTION.FIRST')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.DESCRIPTION.SECOND')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.DESCRIPTION.THIRD')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.DESCRIPTION.FOURTH')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.DESCRIPTION.FIFTH')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.PSTU_EXAM.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PSTU_EXAM.DESCRIPTION.FIRST')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PSTU_EXAM.DESCRIPTION.SECOND')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PSTU_EXAM.DESCRIPTION.THIRD')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PSTU_EXAM.DESCRIPTION.FOURTH')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.LATE_FEE.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.LATE_FEE.DESCRIPTION.FIRST')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.FIRST')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.SECOND')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.THIRD')}
        </li>
        <li className={classes.listItem}>
          <b>
            {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.FOURTH')}
          </b>
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.FIFTH')}
        </li>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.CANCELLATION_POLICY.DESCRIPTION.SIXTH')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.PRIVACY_POLICY.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PRIVACY_POLICY.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.PERSONALLY_COLLECTEC_INFO.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.PERSONALLY_COLLECTEC_INFO.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.IP_ADDRESSES.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.IP_ADDRESSES.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.COOKIES.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.COOKIES.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.INFO_USED.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.INFO_USED.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.EMAIL_PRIVACY.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.EMAIL_PRIVACY.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.EXTERNAL_LINKS.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.EXTERNAL_LINKS.DESCRIPTION')}
        </li>
        <h3>{t('TERMS_AND_CONDITIONS.MODIFICATIONS.TITLE')}</h3>
        <li className={classes.listItem}>
          {t('TERMS_AND_CONDITIONS.MODIFICATIONS.DESCRIPTION')}
        </li>
      </ul>
    </Grid>
  );
}
function DialogFooter({
  classes,
  setDialogOpen,
  t,
  registerClasses,
  amount,
  type,
  donationOptions,
  setLoading,
}) {
  const selectedType = _.find(donationOptions, (co) => co.id === type);
  const [iAccept, setIsAccept] = useState(false);
  const [ischeckBoxError, setCheckBoxError] = useState(false);
  const commonclasses1 = useStyles(commonStyle)();
  // const paymentData = usePayment();
  // const feeStructure = paymentData?.feeStructure;
  const feeStructure = useSelector((state) => state?.getPayment?.feeStructure);
  const setIAcceptCheckBox = () => {
    setIsAccept(!iAccept);
    setCheckBoxError(false);
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const redBody = {
        registrationId: feeStructure?.registrationId,
        donation: {
          type: selectedType?.name,
          amount: Number(amount),
        },
      };
      createLinkService(redBody)
        .then((response) => {
          if (response?.success && response?.data?.approveLink) {
            setLocalStorage('orderId', response?.data?.orderId);
            setLocalStorage('registrationId', feeStructure?.registrationId);
            setLocalStorage('paymentFor', 'register');
            setLocalStorage('isDonation', '');
            window.location.assign(response?.data?.approveLink);
            setLoading(false);
          }
        })
        .catch(() => {
          setLoading(false);
          // console.log('err', err);
        });
    } catch (err) {
      // console.log(err);
    }
  };
  const handleClick = async (event) => {
    event.preventDefault();
    await handleSubmit(event.target.value);
  };
  const validPayment = (event) => {
    setCheckBoxError(!iAccept);
    if (iAccept) {
      handleClick(event);
    }
  };
  const setTitle = (title) => (
    <Grid container className={classes.termsText}>
      <Grid item xs={12}>
        {title}
      </Grid>
    </Grid>
  );
  const getErrorText = () => (ischeckBoxError ? (
    <div className={`${classes.error} ${registerClasses.errorText}`}>
      {t('ACCEPT_TERMS_AND_CONDITION')}
    </div>
  ) : (
    <div />
  ));

  return (
    <Grid>
      <Grid item xs={12} className={classes.acceptCheckbox}>
        <CheckboxAtom
          label={setTitle(t('TERMS_AND_CONDITIONS.I_ACCEPT'))}
          id="acceptCheckbox"
          checked={iAccept}
          handleChange={setIAcceptCheckBox}
        />
        {getErrorText()}
      </Grid>
      <Grid
        container
        className={classes.dialogButtons}
        justifyContent="flex-end"
      >
        <ButtonAtom
          name={t('CANCEL')}
          onClick={() => setDialogOpen(false)}
          btntype={Buttons.SECONDARY}
          className={commonclasses1.secButton}
        />
        <ButtonAtom
          name={t('CONTINUE_TO_PAYMENT')}
          disabled={!iAccept}
          onClick={(event) => validPayment(event)}
          btntype={!iAccept ? BTN.DISABLE : BTN.PRIMARY}
          className={commonclasses1.activeButton}
          style={{
            background: !iAccept ? 'DISABLED_COLOR' : '#00bfa5',
          }}
        />
      </Grid>
    </Grid>
  );
}
export default function PaymentInfo({
  handleStepper,
  setPaymentInfo,
  paymentInfo,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const commonClasses = useStyles(commonStyle)();
  const classes = useStyles(styles)();
  const registerClasses = useStyles(style)();
  const [loading, setLoading] = useState(true);
  const [redirectToPaymentLoading, setRedirectToPaymentLoading] = useState(false);
  const [inputFields, setInputFields] = useState({});
  const [isDialogOpen, setDialogOpen] = useState(false);
  useEffect(() => {
    dispatch(getDonations());
    setLocalStorage('orderId', '');
    setLocalStorage('registrationId', '');
    setLocalStorage('paymentFor', '');
    setLocalStorage('isDonation', '');
  }, []);
  const columns = [
    {
      label: t('STUDENT_NAME'),
      field: 'studentName',
      headerName: t('STUDENT_NAME'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'studentNameHeader',
      cellClassName: 'studentNameCell',
    },
    {
      label: t('CLASS'),
      field: 'class',
      headerName: t('CLASS'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'classHeader',
      cellClassName: 'classCell',
    },
    {
      label: t('COURSE_FEE'),
      field: 'courseFee',
      headerName: t('COURSE_FEE'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'courseFeeHeader',
      cellClassName: 'courseFeeCell',
    },
    {
      label: t('REGISTRATION_FEE'),
      field: 'registrationFee',
      headerName: t('REGISTRATION_FEE'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'registrationFeeHeader',
      cellClassName: 'registrationFeeCell',
    },
    {
      label: t('PSTU_FEE'),
      field: 'pstuFee',
      headerName: t('PSTU_FEE'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'pstuFeeHeader',
      cellClassName: 'pstuFeeCell',
    },
    {
      label: t('DISCOUNT'),
      field: 'discount',
      type: 'success',
      headerName: t('DISCOUNT'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'discountHeader',
      cellClassName: 'discountCell',
    },
    {
      label: t('TOTAL_FEE'),
      field: 'totalFee',
      headerName: t('TOTAL_FEE'),
      align: 'left',
      headerAlign: 'center',
      headerClassName: 'totalFeeHeader',
      cellClassName: 'totalFeeCell',
    },
  ];
  const validationSchema = Yup.object({
  });

  const textField = (
    label,
    id,
    type,
    handleChange,
    onBlur,
    value,
    error,
    required = true,
    disable = false,
  ) => (
    <TextFieldAtom
      label={label}
      id={id}
      required={required}
      name={id}
      type={type}
      value={value}
      onBlur={onBlur}
      error={error}
      onChange={handleChange}
      disable={disable}
      onKeyDown={(event) => {
        if (event.key === '+' || event.key === '-' || event.keyCode === 69) {
          event.preventDefault();
        }
      }}
    />
  );
  const selectBox = (
    label,
    id,
    type,
    handleChange,
    onBlur,
    value,
    options,
    error,
    required = true,
  ) => (
    <Dropdown
      minWidth="100%"
      label={label}
      id={id}
      name={id}
      type={type}
      value={value}
      onBlur={onBlur}
      error={error}
      options={options}
      required={required}
      handleChange={handleChange}
      labelId={id}
    />
  );
  async function saveData(values, setSubmitting) {
    if (setSubmitting) setSubmitting(true);
    setInputFields(inputFields);
  }
  const formik = useFormik({
    initialValues: paymentInfo || {
      contributionCause: 0,
      contributionAmount: '0.00',
    },
    validationSchema,
    onSubmit: (values) => {
      if (!values.contributionCause) {
        // formik.setFieldError('contributionAmount', t('SELECT_CAUSE'));
        setPaymentInfo(values);
        setDialogOpen(true);
        saveData(values);
      } else if (Number(values.contributionAmount) > 0) {
        setPaymentInfo(values);
        setDialogOpen(true);
        saveData(values);
      } else {
        formik.setFieldError('contributionAmount', t('AMOUNT_GREATER_THAN_ZERO'));
      }
    },
  });
  useEffect(() => {
    setPaymentInfo(formik.values);
  }, []);

  const setHeaderTitle = () => (
    <Grid container justifyContent="space-between">
      <Grid item xs={8}>
        <div
          className={`${registerClasses.headerTitle} ${classes.headerTitle}`}
        >
          {t('PAYMENT_INFORMATION')}
        </div>
      </Grid>
      <Grid container item justifyContent="flex-end" xs={4}>
        <ButtonAtom
          btntype={Buttons.SECONDARY}
          icon={<ArrowBackIosIcon />}
          // customCss={customCss}
          // className={commonclasses.secButton}
          className={classes.commonButtonNew}
          onClick={() => {
            setPaymentInfo(formik.values);
            handleStepper(1);
          }}
        />
      </Grid>
      <div className={classes.heading}>{t('FEE_DETAILS')}</div>
      <div className={classes.borderBottom} />
    </Grid>
  );

  const getError = (key) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={`${classes.errorText} ${registerClasses.errorText}`}>
      {formik.errors[key]}
    </span>
  ) : null);

  useEffect(() => {
    if (!formik.values.contributionCause) {
      formik.setFieldValue('contributionAmount', '0.00');
    }
  }, [formik.values.contributionCause]);

  const contributionCauseFunc = (donationOptions) => (
    <Grid container spacing={2} className={classes.mainContainer}>
      <form
        onSubmit={formik.handleSubmit}
        name="contribution-info"
        noValidate
        autoComplete="off"
      />
      <Grid item xs={0} md={3} lg={6} />
      <Grid item xs={8} md={5} lg={4.5} className={classes.contributionCause}>
        {selectBox(
          t('CONTRIBUTION_CAUSE'),
          'contributionCause',
          'text',
          (e) => {
            formik.handleChange(e);
            if (!e.target.value) {
              formik.setFieldValue('contributionAmount', '0.00');
            }
          },
          formik.handleBlur,
          formik.values.contributionCause,
          donationOptions,
          getError('contributionCause'),
          false,
        )}
        {getError('contributionCause')}
      </Grid>
      <Grid item xs={3} md={4} lg={1.5} className={classes.contributionAmount}>
        {textField(
          t('$'),
          'contributionAmount',
          'number',
          (e) => {
            if (e.target.value >= 0 || e.target.value === '-') {
              formik.handleChange(e);
            }
          },
          (e) => {
            formik.handleBlur(e);
            if (
              formik.values.contributionAmount < 0
              || formik.values.contributionAmount === ''
            ) {
              formik.setFieldValue('contributionAmount', '0.00');
            } else {
              formik.setFieldValue(
                'contributionAmount',
                formik?.values?.contributionAmount?.toFixed(2),
              );
            }
          },
          formik.values.contributionAmount,
          getError('contributionAmount'),
          false,
          !formik.values.contributionCause,
        )}
      </Grid>
    </Grid>
  );

  const handleDialogCancel = async () => {
    setDialogOpen(false);
  };

  const paymentData = usePayment();
  const donationOptions = [
    {
      name: ' ',
      id: 0,
    },
  ].concat(paymentData?.donations);

  // create fee structure  data
  let tableData = [];
  if (paymentData?.feeStructure?.students) {
    tableData = paymentData.feeStructure.students.map((data, index) => {
      const pstuFee = data?.enrollmentCourse?.feeStructure?.examFee;
      const courseFee = data?.enrollmentCourse?.feeStructure?.fee;
      const discount = data?.enrollmentCourse?.feeStructure?.discount;
      const total = data?.enrollmentCourse?.feeStructure?.total;
      const regFee = data?.enrollmentCourse?.feeStructure?.registrationFee;
      const className = data?.enrollmentCourse?.courseName;
      const studentName = `${data?.user?.firstName} ${data?.user?.lastName}`;

      return ({
        id: index,
        studentName: studentName || '',
        class: className || null, // "c1cc7cc8-8162-4225-8942-b1800a0564c3"
        courseFee: courseFee ? `$ ${courseFee?.toFixed(2)}` : '$ 0.00',
        registrationFee: regFee ? `+ $ ${regFee?.toFixed(2)}` : '+ $ 0.00',
        pstuFee: pstuFee ? `+ $ ${pstuFee?.toFixed(2)}` : '+ $ 0.00',
        discount: discount ? `- $ ${discount?.toFixed(2)}` : '- $ 0.00',
        totalFee: total ? `$ ${total?.toFixed(2)}` : '$ 0.00',
      });
    });
  }
  useEffect(() => {
    if (paymentData?.feeStructure?.students?.length) setLoading(false);
  }, [paymentData?.feeStructure?.students]);

  const totalAmount = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8.5} lg={7} />
      <Grid item xs={8} md={8} lg={3} className={classes.textAlign}>
        {t('TOTAL_PAYABLE')}
      </Grid>
      <Grid item xs={4} md={4} lg={2} className={classes.paddingLeft}>
        {`$ ${calculateTotalPayment(paymentData?.feeStructure?.students, formik.values.contributionAmount)}`}
      </Grid>
    </Grid>
  );

  return (
    <Box className={registerClasses.gridContainer}>
      <Grid container>
        <Paper className={classes.root}>
          <Grid container className={classes.headerContainer}>
            <Grid item xs={12}>
              {setHeaderTitle()}
            </Grid>
          </Grid>

          <Grid
            container
            className={`${registerClasses.mainContainer} ${classes.mainContainer}`}
          >
            <DataGrid
              rows={tableData}
              columns={columns}
              autoHeight
              disableColumnFilter
              disableColumnSelector
              disableColumnMenu
              disableSelectionOnClick
              hideFooter
              className={classes.dataGrid}
              loading={loading}
            />
            <Grid container spacing={2} className={classes.summaryGrid}>
              <Grid item xs={1} md={1} lg={7} />

              <Grid item xs={7} md={7} lg={3} className={classes.textAlign}>
                {t('TOTAL_FEE')}
              </Grid>
              <Grid item xs={4} md={4} lg={2} className={classes.paddingLeft}>
                {`$ ${calculateTotalFee(paymentData?.feeStructure?.students)}`}
              </Grid>
            </Grid>
            {contributionCauseFunc(donationOptions)}
          </Grid>
          <Grid container className={classes.totalPayment}>
            {totalAmount()}
          </Grid>

          <div className={classes.footerBottom} />
          <Grid
            container
            justifyContent="flex-end"
            className={classes.payButton}
          >
            <Grid container spacing={2} justifyContent="flex-end">
              {getError('contributionAmount')}
            </Grid>
            <Grid item className={classes.buttons}>
              <ButtonAtom
                // btntype={Buttons.PRIMARY}
                onClick={formik.handleSubmit}
                className={commonClasses.activeButton}
                name={t('PROCEED')}
              />
            </Grid>
          </Grid>
          <DialogAtom
            isOpen={isDialogOpen}
            dialogHeading={t('TERMS_AND_CONDITIONS.TITLE')}
            content={(
              <DialogContent
                classes={classes}
                redirectToPaymentLoading={redirectToPaymentLoading}
              />
            )}
            secHandle={handleDialogCancel}
            footer={(
              <DialogFooter
                registerClasses={registerClasses}
                classes={classes}
                setDialogOpen={setDialogOpen}
                t={t}
                amount={avoidNegativeValue(formik.values.contributionAmount)}
                type={formik.values.contributionCause}
                donationOptions={donationOptions}
                setLoading={setRedirectToPaymentLoading}
              />
            )}
          />
        </Paper>
      </Grid>
    </Box>
  );
}
