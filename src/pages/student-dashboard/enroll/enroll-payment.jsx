import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Dropdown, Loader, TextField } from '../../../components/atoms';
import { getDonations } from '../../../store/actions/getPayment';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import { setLocalStorage } from '../../../utils/localStorageMethod';
import { createLinkService } from '../../../store/services/auth';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import { calculateTotalFee, calculateTotalPayment } from '../../../utils/methods';
import usePayment from '../../../custom-hooks/usePayment';

function EnrollPayment({
  enrollStudentData, loading,
  setLoading,
}) {
  const [contributionCause, setContributionCause] = useState('');
  // const contributionAmount = '0.00';
  const [contributionAmount, setContributionAmount] = useState('0.00');
  const [contributionError, setContributionError] = useState('');
  const { t } = useTranslation('translation');
  const classes = useStyles(style)();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDonations());
  }, []);
  const paymentData = usePayment();
  const donationOptions = [{
    name: ' ', id: 0,
  }].concat(paymentData?.donations);

  const showError = (e) => {
    if (e.target.value !== 0 && Number(contributionAmount) === 0) {
      setContributionError('');
      // setContributionError(t('AMOUNT_GREATER_THAN_ZERO'));
    } else {
      setContributionError('');
    }
  };
  const handleSubmit = async () => {
    // if ((contributionCause?.name && Number(contributionAmount) > 0) || !contributionCause?.name) {
    if (contributionCause && Number(contributionAmount) > 0) {
      setContributionError('');
      setLoading(true);
      try {
        const redBody = {
          registrationId: enrollStudentData?.registrationId,
          donation: {
            type: contributionCause?.name,
            amount: Number(contributionAmount),
          },
        };
        createLinkService(redBody)
          .then((response) => {
            if (response?.success && response?.data?.approveLink) {
              setLocalStorage('orderId', response?.data?.orderId);
              setLocalStorage('registrationId', enrollStudentData?.registrationId);
              setLocalStorage('paymentFor', 'enroll');
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
    } else if (contributionCause && Number(contributionAmount) <= 0) { // else if (contributionCause?.name && Number(contributionAmount) <= 0) {
      setContributionError(t('AMOUNT_GREATER_THAN_ZERO'));
    } else if (!contributionCause) {
      // setContributionError(t('SELECT_CAUSE'));
      setContributionError('');
    } else {
      setContributionError('');
    }
  };

  const getStudentsData = () => {
    const existingStudents = enrollStudentData?.students || [];
    const newStudents = enrollStudentData?.newStudents || [];
    return [...existingStudents, ...newStudents];
  };

  return (
    <Box className={classes.mn} sx={{ flexGrow: 1 }}>
      <Grid className={classes.tableView}>
        <TableContainer>
          <Table sx={12} aria-label="simple table">
            <TableHead className={classes.tableheadBg}>
              <TableRow>
                <TableCell align="left" colSpan={3}>Student Name</TableCell>
                <TableCell align="left">Class</TableCell>
                <TableCell align="right" colSpan={2}>Course Fee</TableCell>
                <TableCell align="right" colSpan={2}>Registration Fee</TableCell>
                <TableCell align="right" colSpan={2}>PSTU Fee</TableCell>
                <TableCell align="right" colSpan={2}>Discount</TableCell>
                <TableCell align="right" colSpan={2}>Total Fee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getStudentsData()?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    '&:last-child td, &:last-child th': { borderBottom: 1, borderTop: 1, borderBlockColor: '#e0e0e0' },
                  }}
                >
                  <TableCell component="th" scope="row" align="left" colSpan={3}>
                    {row?.user?.firstName}
                    {' '}
                    {row?.user?.lastName}
                  </TableCell>
                  <TableCell align="left">{row?.enrollmentCourse?.courseName}</TableCell>
                  <TableCell align="right" colSpan={2}>
                    $
                    {' '}
                    {row?.enrollmentCourse?.feeStructure?.fee?.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
                    +$
                    {' '}
                    {row?.enrollmentCourse?.feeStructure?.registrationFee?.toFixed(2)}
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
                    +$
                    {' '}
                    {row?.enrollmentCourse?.feeStructure?.examFee?.toFixed(2)}

                  </TableCell>
                  <TableCell align="right" colSpan={2} className={classes.discount}>
                    -$
                    {' '}
                    {row?.enrollmentCourse?.feeStructure?.discount ? row?.enrollmentCourse?.feeStructure?.discount.toFixed(2) : '0.00'}

                  </TableCell>
                  <TableCell align="right" component="th" scope="row" colSpan={2}>
                    $
                    {' '}
                    {row?.enrollmentCourse?.feeStructure?.total?.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableHead className={classes.tableheadColor}>
              <TableRow>
                <TableCell colSpan={12} align="right">
                  Total Fee
                </TableCell>
                <TableCell align="right">
                  {`$ ${calculateTotalFee(getStudentsData())}`}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead className={classes.tableheadColor}>
              <TableRow>
                <TableCell colSpan={6} align="right" />
                <TableCell colSpan={6} align="right">
                  <FormControl fullWidth>
                    <Dropdown
                      labelId="contributionCause"
                      id="contributionCause"
                      value={contributionCause}
                      label={t('CONTRIBUTION_CAUSE')}
                      handleChange={(e) => {
                        if (!e.target.value) {
                          setContributionAmount('0.00');
                        }
                        setContributionCause(e.target.value);
                        showError(e);
                      }}
                      options={donationOptions}
                    />
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <FormControl fullWidth>
                    <TextField
                      label={t('$')}
                      id="contributionAmount"
                      value={contributionAmount}
                      type="number"
                      disable={!(contributionCause)}
                      onChange={(e) => {
                        if (e.target.value <= 0 || e.target.value === '') {
                          setContributionAmount(e.target.value);
                          // setContributionError(t('AMOUNT_GREATER_THAN_ZERO'));
                        } else {
                          setContributionAmount(e.target.value);
                        // const fixed = e.target.value;
                        // setContributionAmount(Number(fixed)?.toFixed(2));
                        // setContributionError('');
                        }
                      }}
                      onBlur={
                          (e) => {
                            if (e.target.value <= 0 || e.target.value === '') {
                              setContributionAmount('0.00');
                              setContributionError(t('AMOUNT_GREATER_THAN_ZERO'));
                              // setContributionAmount(e.target.value);
                              // setContributionError('');
                            } else {
                              const fixed = e.target.value;
                              setContributionAmount(Number(fixed)?.toFixed(2));
                              setContributionError('');
                            }
                          }
                        }
                    />
                  </FormControl>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableHead className={classes.totalPaymentRow}>
              <TableRow>
                <TableCell colSpan={12} align="right">
                  Total Payable
                </TableCell>
                <TableCell align="right">
                  {`$ ${calculateTotalPayment(getStudentsData(), contributionAmount)}`}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid xs={60} className={classes.paymentStudent}>
          <span className={classes.errorText}>{contributionError}</span>
        </Grid>

        <Grid xs={12} className={classes.paymentStudent}>
          <ButtonAtom name={t('CONTINUE_TO_PAYMENT')} btntype={Buttons.PRIMARY} onClick={handleSubmit} />
        </Grid>
      </Grid>
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}

export default EnrollPayment;
