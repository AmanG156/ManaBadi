/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Typography,
  TableContainer, Table, TableHead,
  TableRow, TableBody, TableCell,
  InputAdornment,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import {
  parseISO,
} from 'date-fns/esm';
import moment from 'moment';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import Dropdown from '../../../components/atoms/dropdown';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import DatePickerAtom from '../../../components/atoms/datepicker';
import TextFieldAtom from '../../../components/atoms/text-field-with-label';
import {
  getAssignedYearsDetails,
  getAcademicYears,
} from '../../../store/actions/getLocationCoordinator';
import {
  getAllCourses,
} from '../../../store/actions/getStudent';
import Loader from '../../../components/atoms/loader';
import {
  postAcademicInfoService,
  updateAcademicInfoService,
} from '../../../store/services/auth';

const HEADERS = ['S.No', 'COURSES', 'REGISTRATION_START_DATE',
  'REGISTRATION_END_DATE', 'LATE_FEE_START_DATE', 'LAE_FEE_AMOUNT'];

export default function RegistrationDates() {
  const classes = useStyles(styles)();
  const { t } = useTranslation('translation');
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const [rowsObj, setRowsDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [academicError, setAcademicError] = useState(null);
  const [isNewAcademicYear, setIsNewAcademicYear] = useState(false);
  const { locationCoordinator, courses } = useSelector((state) => ({
    locationCoordinator: state?.getLocationCoordinator,
    courses: state?.getStudent,
  }));

  const currentYearDetails = locationCoordinator?.assignedYearsDetails;

  const [assignedYears, setAssignedYears] = useState([]);
  const [selectedAssignedYear, setSelectedYear] = useState('');
  const [newAcademicYear, setNewAcademicYear] = useState('');
  const courseList = courses?.courses;
  const [minAcademicDate, setMinAcademicDate] = useState('');
  const [maxAcademicDate, setMaxAcademicDate] = useState('');

  useEffect(() => {
    const loadFalse = () => setLoading(false);
    dispatch(getAllCourses());
    dispatch(getAcademicYears(loadFalse));
  }, []);

  useEffect(() => {
    // const currentYear = assignedYears.length - 1;
    if (!isNewAcademicYear) {
      const currentYear = new Date().getFullYear();
      const selectedYear = assignedYears.filter((opt) => opt?.id.substring(0, 4) === currentYear.toString());
      if (((assignedYears || []).length > 0) && (courseList.length > 0)) {
        setSelectedYear(selectedYear[0]?.id);
      }
    }
  }, [assignedYears, courseList.length]);

  useEffect(() => {
    if (!selectedAssignedYear) {
      return;
    }
    const minYear = selectedAssignedYear.split('-')[0];
    const maxYear = selectedAssignedYear.split('-')[1];
    const minDate = parseISO(`${minYear}-01-01`) || null;
    const maxDate = parseISO(`${maxYear}-12-31`) || null;
    setMinAcademicDate(minDate);
    setMaxAcademicDate(maxDate);
  }, [selectedAssignedYear]);

  useEffect(() => {
    if ((locationCoordinator?.academicYears || []).length > 0) {
      let years = locationCoordinator?.academicYears.map(
        (year) => ({ id: year, name: year }),
      );
      years = years.sort((a, b) => {
        const year1 = a.id.split('-')[0];
        const year2 = b.id.split('-')[0];
        return parseInt(year1, 10) - parseInt(year2, 10);
      });
      setAssignedYears(years);
    } else {
      const currentYear = new Date().getFullYear();
      const prevYear = new Date().getFullYear() - 1;
      const obj = { id: `${prevYear}-${currentYear}`, name: `${prevYear}-${currentYear}` };
      setAssignedYears([obj]);
    }
  }, [locationCoordinator?.academicYears]);

  useEffect(() => {
    const rowsCopy = { ...rowsObj };
    if (currentYearDetails.length === 0) {
      return;
    }
    currentYearDetails.forEach((details) => {
      if (details.courseId !== null) {
        // eslint-disable-next-line no-param-reassign
        rowsCopy[details.courseId] = {
          ...rowsCopy[details.courseId],
          registrationStartDate: details.registrationStartDate
            && parseISO(details.registrationStartDate),
          registrationEndDateWithLateFee:
            details.registrationEndDateWithoutLateFee
            && parseISO(details.registrationEndDateWithoutLateFee),
          registrationEndDateWithoutLateFee:
            details.registrationEndDateWithLateFee
            && parseISO(details.registrationEndDateWithLateFee),
          lateFeeAmount: details.lateFeeAmount,
          shouldUpdate: true,
          detailsId: details.id,
        };
      }
    });
    setRowsDetails(rowsCopy);
    setRows(Object.values(rowsCopy));
    setAcademicError(null);
  }, [currentYearDetails]);

  useEffect(() => {
    if (rows.length === 0) {
      return;
    }
    const errValidations = rows.reduce((validationsObj, row) => {
      // eslint-disable-next-line no-param-reassign
      validationsObj[row.courseId] = {
        registrationStartDate: {
          isDirty: false,
          errors: [],
        },
        registrationEndDateWithoutLateFee: {
          isDirty: false,
          errors: [],
        },
        registrationEndDateWithLateFee: {
          isDirty: false,
          errors: [],
        },
        lateFeeAmount: {
          isDirty: false,
          errors: [],
        },
        hasError: false,
      };
      return validationsObj;
    }, {});

    setErrors(errValidations);
  }, [rows.length, currentYearDetails]);

  const refreshCourseDetails = () => {
    const values = courseList.map((course, index) => ({
      sNo: (index + 1),
      course: course.name,
      registrationStartDate: null,
      registrationEndDateWithoutLateFee: null,
      registrationEndDateWithLateFee: null,
      lateFeeAmount: 0,
      courseId: course.id,
      shouldUpdate: false,
      valueChanged: false,
      errors: [],
    }));
    const rowsObject = values.reduce((obj, row) => {
      // eslint-disable-next-line no-param-reassign
      obj[row.courseId] = row;
      return obj;
    }, {});
    setRowsDetails(rowsObject);
    setRows(values);
  };

  useEffect(() => {
    if ((selectedAssignedYear === null) || (courseList.length === 0)) {
      return;
    }
    refreshCourseDetails();

    dispatch(getAssignedYearsDetails(
      { academicYear: selectedAssignedYear },
      () => setLoading(false),
    ));
  }, [selectedAssignedYear, courseList.length]);

  const validateStartEndDate = (validations, courseId, row, selector) => {
    const {
      registrationStartDate,
      registrationEndDateWithoutLateFee,
    } = row;
    const startDate = moment(registrationStartDate, 'MM/DD/YYYY');
    const endDate = moment(registrationEndDateWithoutLateFee, 'MM/DD/YYYY');

    if ([startDate.toISOString(), endDate.toISOString()].includes('Invalid date')) {
      return validations[courseId];
    }

    if (!registrationStartDate) {
      validations[courseId].registrationStartDate.errors.push(t('REGISTRATION_START_DATE_SHOULD_BE_FILLED'));
      validations[courseId].hasError = true;
      return validations[courseId];
    }
    validations[courseId].registrationStartDate.errors = validations[courseId].registrationStartDate.errors
      .filter((err) => err !== t('REGISTRATION_START_DATE_SHOULD_BE_FILLED'));

    if (!registrationEndDateWithoutLateFee) {
      return validations[courseId];
    }
    switch (selector) {
      case 'registrationStartDate':
        if (startDate.isSameOrAfter(endDate.toISOString())) {
          validations[courseId].registrationStartDate.errors.push(t('END_DATE_GREATER_THAN_START_DATE'));
          validations[courseId].hasError = true;
        } else {
          validations[courseId].registrationStartDate.errors = validations[courseId].registrationStartDate.errors
            .filter((err) => err !== t('END_DATE_GREATER_THAN_START_DATE'));
        }
        break;
      case 'registrationEndDateWithoutLateFee':
        if (startDate.isSameOrAfter(endDate.toISOString())) {
          validations[courseId].registrationEndDateWithoutLateFee.errors.push(t('END_DATE_GREATER_THAN_START_DATE'));
          validations[courseId].hasError = true;
        } else {
          validations[courseId].registrationEndDateWithoutLateFee.errors = validations[courseId].registrationEndDateWithoutLateFee.errors
            .filter((err) => err !== t('END_DATE_GREATER_THAN_START_DATE'));
        }
        break;
      default:
    }

    return validations[courseId];
  };

  const validateLateFeeDate = (validations, courseId, row) => {
    const {
      registrationStartDate,
      registrationEndDateWithoutLateFee,
      registrationEndDateWithLateFee,
    } = row;
    const lateFeeDate = moment(registrationEndDateWithLateFee, 'MM/DD/YYYY');

    if (!registrationStartDate || !registrationEndDateWithoutLateFee || !registrationEndDateWithLateFee) {
      validations[courseId].registrationEndDateWithLateFee.errors = validations[courseId].registrationEndDateWithLateFee.errors
        .filter((err) => err !== t('LATEFEE_GREATER_THAN_ENDDATE'));
      validations[courseId].hasError = false;
      return validations[courseId];
    }

    if (lateFeeDate.isBetween(minAcademicDate, maxAcademicDate, null, '()')) {
      validations[courseId].registrationEndDateWithLateFee.errors = validations[courseId].registrationEndDateWithLateFee.errors
        .filter((err) => err !== t('DATE_RANGE_ERROR'));
    } else {
      validations[courseId].registrationEndDateWithLateFee.errors.push(t('DATE_RANGE_ERROR'));
      validations[courseId].hasError = true;
    }

    if (lateFeeDate.isBetween(registrationStartDate, registrationEndDateWithoutLateFee, null, '()')) {
      validations[courseId].registrationEndDateWithLateFee.errors = validations[courseId].registrationEndDateWithLateFee.errors
        .filter((err) => err !== t('LATEFEE_GREATER_THAN_ENDDATE'));
      validations[courseId].hasError = false;
    } else {
      validations[courseId].registrationEndDateWithLateFee.errors.push(t('LATEFEE_GREATER_THAN_ENDDATE'));
      validations[courseId].hasError = true;
    }

    return validations[courseId];
  };

  const checkStartDate = (validations, row, courseId) => {
    const {
      registrationStartDate,
    } = row;
    validations[courseId].registrationStartDate.isDirty = true;
    if (!registrationStartDate) {
      validations[courseId].registrationStartDate.errors.push(t('REG_DATES_REQUIRED'));
      validations[courseId].hasError = true;
    } else {
      validations[courseId].registrationStartDate.errors = validations[courseId].registrationStartDate.errors
        .filter((err) => err !== t('REG_DATES_REQUIRED'));
      const startDate = moment(registrationStartDate, 'MM-DD-YYYY');
      if (startDate.isBetween(minAcademicDate, maxAcademicDate, null, '()')) {
        validations[courseId].registrationStartDate.errors = validations[courseId].registrationStartDate.errors
          .filter((err) => err !== t('DATE_RANGE_ERROR'));
      } else {
        validations[courseId].registrationStartDate.errors.push(t('DATE_RANGE_ERROR'));
        validations[courseId].hasError = true;
      }

      validations[courseId] = validateStartEndDate(validations, courseId, row, 'registrationStartDate');
      validations[courseId] = validateLateFeeDate(validations, courseId, row);
    }
    return validations[courseId];
  };

  const checkEndDate = (validations, row, courseId) => {
    const {
      registrationEndDateWithoutLateFee,
    } = row;
    validations[courseId].registrationEndDateWithoutLateFee.isDirty = true;

    if (!registrationEndDateWithoutLateFee) {
      validations[courseId].registrationEndDateWithoutLateFee.errors.push(t('REG_DATES_REQUIRED'));
      validations[courseId].hasError = true;
    } else {
      validations[courseId].registrationEndDateWithoutLateFee.errors = validations[courseId].registrationEndDateWithoutLateFee.errors
        .filter((err) => err !== t('REG_DATES_REQUIRED'));
      validations[courseId].hasError = false;
      const endDate = moment(registrationEndDateWithoutLateFee, 'MM-DD-YYYY');
      if (endDate.isBetween(minAcademicDate, maxAcademicDate, null, '()')) {
        validations[courseId].registrationEndDateWithoutLateFee.errors = validations[courseId].registrationEndDateWithoutLateFee.errors
          .filter((err) => err !== t('DATE_RANGE_ERROR'));
      } else {
        validations[courseId].registrationEndDateWithoutLateFee.errors.push(t('DATE_RANGE_ERROR'));
        validations[courseId].hasError = true;
      }
      validations[courseId] = validateStartEndDate(validations, courseId, row, 'registrationEndDateWithoutLateFee');
      validations[courseId] = validateLateFeeDate(validations, courseId, row);
    }

    return validations[courseId];
  };

  const checkLateFeeDate = (validations, row, courseId) => {
    const {
      registrationEndDateWithLateFee,
      lateFeeAmount,
    } = row;
    const lateFee = parseInt(lateFeeAmount, 10);
    if (registrationEndDateWithLateFee && (lateFee === 0)) {
      validations[courseId].registrationEndDateWithLateFee.isDirty = true;
      validations[courseId].lateFeeAmount.errors.push(t('LATEFEE_AMOUNT_REQUIRED'));
      validations[courseId].registrationEndDateWithLateFee.errors = validations[courseId].registrationEndDateWithLateFee.errors.filter((err) => err !== t('LATE_FEE_DATE_REQUIRED'));
      validations[courseId] = validateLateFeeDate(validations, courseId, row);
      validations[courseId].hasError = true;
    } else if (!registrationEndDateWithLateFee && (lateFee > 0)) {
      validations[courseId].lateFeeAmount.isDirty = true;

      validations[courseId].registrationEndDateWithLateFee.errors.push(t('LATE_FEE_DATE_REQUIRED'));
      validations[courseId].registrationEndDateWithLateFee.isDirty = true;

      validations[courseId].lateFeeAmount.errors = validations[courseId].lateFeeAmount.errors.filter((err) => err !== t('LATEFEE_AMOUNT_REQUIRED'));
      validations[courseId] = validateLateFeeDate(validations, courseId, row);
      validations[courseId].hasError = true;
    } else {
      validations[courseId].lateFeeAmount.isDirty = true;
      validations[courseId].registrationEndDateWithLateFee.isDirty = true;

      validations[courseId].lateFeeAmount.errors = validations[courseId].lateFeeAmount.errors.filter((err) => err !== t('LATEFEE_AMOUNT_REQUIRED'));
      validations[courseId].registrationEndDateWithLateFee.errors = validations[courseId].registrationEndDateWithLateFee.errors.filter((err) => err !== t('LATE_FEE_DATE_REQUIRED'));
      validations[courseId] = validateLateFeeDate(validations, courseId, row);
      validations[courseId].hasError = false;
    }
    return validations[courseId];
  };

  const showError = (courseId, validations = '') => {
    if (Object.entries(errors).length === 0) {
      return null;
    }
    let validationErrors = Object.values(validations || errors[courseId]);
    validationErrors = validationErrors.reduce((errArray, err) => {
      if (!err?.errors) {
        return errArray;
      }
      return [...errArray, ...err.errors];
    }, []);

    return (validationErrors.length > 0) ? validationErrors[0] : null;
  };

  const validateRow = (row, action = 'all', selector = '') => {
    const validations = { ...errors };
    const {
      courseId,
    } = row;

    if (action === 'switch') {
      switch (selector) {
        case 'registrationStartDate':
          validations[courseId] = checkStartDate(validations, row, courseId);
          break;
        case 'registrationEndDateWithoutLateFee':
          validations[courseId] = checkStartDate(validations, row, courseId);
          validations[courseId] = checkEndDate(validations, row, courseId);
          break;
        case 'registrationEndDateWithLateFee':
          validations[courseId] = checkStartDate(validations, row, courseId);
          if (validations[courseId].registrationStartDate.isDirty && validations[courseId].registrationStartDate.errors.length === 0) {
            validations[courseId] = checkEndDate(validations, row, courseId);
            validations[courseId] = checkLateFeeDate(validations, row, courseId);
          }
          break;
        case 'lateFeeAmount':
          validations[courseId] = checkStartDate(validations, row, courseId);
          validations[courseId] = checkEndDate(validations, row, courseId);
          validations[courseId] = checkLateFeeDate(validations, row, courseId);
          break;
        default:
      }
    } else {
      validations[courseId] = checkStartDate(validations, row, courseId);
      validations[courseId] = checkEndDate(validations, row, courseId);
      validations[courseId] = checkLateFeeDate(validations, row, courseId);
    }

    setErrors(validations);
    const hasError = showError(courseId, validations[courseId]);
    return !!hasError;
  };

  const handleChange = (courseId, newValue, selector) => {
    setAcademicError(null);
    if ((selector === 'lateFeeAmount') && parseInt(newValue, 10) < 0) {
      return;
    }
    const obj = { ...rowsObj };
    obj[courseId][selector] = newValue;
    obj[courseId].valueChanged = true;
    setRowsDetails(obj);
    setRows(Object.values(obj));
    validateRow(obj[courseId], 'switch', selector);
  };

  const handleAcademicYear = () => {
    const values = rows.reduce((obj, row) => [
      ...obj, row.registrationStartDate, row.registrationEndDateWithoutLateFee], []);
    if (values.includes(null)) {
      setAcademicError(t('ACADEMIC_INFO_ERROR'));
      return;
    }
    if (isNewAcademicYear) {
      setAcademicError(t('ACADEMIC_INFO_ERROR'));
      setSelectedYear(newAcademicYear.id);
    } else {
      setAcademicError(null);
      const years = assignedYears.map((y) => {
        const year = y.id.replace(/\s/g, '').split('-')[1];
        return Number(year);
      });
      const maxYear = Math.max(...years);
      const obj = { id: `${maxYear}-${maxYear + 1}`, name: `${maxYear}-${maxYear + 1}` };
      setSelectedYear(obj.id);
      setAssignedYears([...assignedYears, obj]);
      setIsNewAcademicYear(true);
      setNewAcademicYear(obj);
      refreshCourseDetails();
    }
  };

  const showMinDate = (startDate) => {
    if (!startDate) {
      return minAcademicDate;
    }

    const date = moment(startDate, 'MM-DD-YYYY').add(1, 'day');
    return parseISO(date.toISOString());
  };

  const showMaxDate = (endDate) => {
    if (!endDate) {
      return maxAcademicDate;
    }

    const date = moment(endDate, 'MM-DD-YYYY').subtract(1, 'day');
    return parseISO(date.toISOString());
  };

  const save = () => {
    const validatedRows = rows.map((row) => validateRow(row, 'all'));
    if (validatedRows.find((value) => value === true)) {
      return;
    }
    const updatedRows = rows.filter((row) => row.shouldUpdate);
    const createdRows = rows.filter((row) => !row.shouldUpdate && row.valueChanged);
    const promises = [];

    updatedRows.forEach((row) => {
      const body = {
        year: selectedAssignedYear,
        registrationStartDate: row.registrationStartDate,
        registrationEndDate: row.registrationEndDateWithoutLateFee,
        lateFeeStartDate: (row.registrationEndDateWithLateFee === '') ? null : row.registrationEndDateWithLateFee,
        lateFeeAmount: (row.lateFeeAmount === '') ? null : parseFloat(row.lateFeeAmount, 10).toFixed(2),
        courseId: row.courseId,
        id: row.detailsId,
      };
      promises.push(updateAcademicInfoService(body));
    });
    createdRows.forEach((row) => {
      const body = {
        year: selectedAssignedYear,
        registrationStartDate: row.registrationStartDate,
        registrationEndDate: row.registrationEndDateWithoutLateFee,
        lateFeeStartDate: (row.registrationEndDateWithLateFee === '') ? null : row.registrationEndDateWithLateFee,
        lateFeeAmount: (row.lateFeeAmount === '') ? null : parseFloat(row.lateFeeAmount, 10).toFixed(2),
        courseId: row.courseId,
      };
      promises.push(postAcademicInfoService(body));
    });
    if (promises.length === 0) {
      return;
    }
    Promise.all(promises).then(() => {
      window.location.reload();
    }).catch(() => {
      // console.error(err);
    });
  };

  return (
    <Box className={classes.gridContainer}>
      <Grid container item className={classes.titleRow}>
        <Grid item container sx={{ alignItems: 'center' }}>
          {/* <Typography className={classes.headerTitle}>
            {t('SETTINGS')}
          </Typography> */}
          <Typography className={classes.headerTitle}>
            {/* /
            {' '} */}
            {t('REGISTRATION_DATES')}

            {/* {t('SETTINGS')} */}
          </Typography>
          {/* <Typography className={classes.headerDesc}>
            {' / '}
            {t('REGISTRATION_DATES')}
          </Typography> */}

        </Grid>
      </Grid>
      <Grid item xs={12} container className={classes.dropdownWrapper}>
        <Grid xs={6} lg={10}>
          <Dropdown
            id="year"
            variant="standard"
            name="year"
            value={selectedAssignedYear || ''}
            options={assignedYears}
            customClass={classes.dropdown}
            handleChange={(e) => setSelectedYear(e.target.value)}
            customSelectClass={classes.select}
            changeCss
            customFormControlCss={{ width: '100%' }}
            label="year"
          />
        </Grid>
        <Grid className={classes.addAcademicBtn} xs={6} lg={2}>
          <ButtonAtom
            name={t('ADD_ACADEMIC_YEAR')}
            btntype={Buttons.PRIMARY}
            type={Buttons.PRIMARY}
            onClick={() => handleAcademicYear()}
            icon={<AddIcon />}
          />
        </Grid>

      </Grid>
      {
        academicError && (
          <Grid item mt={1} container justifyContent="flex-start">
            <Typography className={classes.academicErrorText} sx={{ paddingLeft: '0 !important' }}>{academicError}</Typography>
          </Grid>
        )
      }
      {
        loading ? (
          <Grid>
            <Loader message={t('LOADING')} />
          </Grid>
        )
          : (
            <>
              <Grid mt={6} item container>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table" className={classes.registrationTable}>
                    <TableHead className={classes.tableHead}>
                      <TableRow>
                        {
                          HEADERS.map((h) => (<TableCell>{t(h)}</TableCell>))
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                      {rows.map((row) => (
                        <>
                          <TableRow
                            key={row.sNo}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="td" scope="row">
                              {row.sNo}
                            </TableCell>
                            <TableCell className={classes.tableCellCourse}>
                              {row.course}
                            </TableCell>
                            <TableCell className={classes.tableCells}>
                              <DatePickerAtom
                                wrapperClassName={classes.datePicker}
                                label={`${t('START_DATE')}*`}
                                minWidth="100%"
                                id={`startDate-${row.sNo}`}
                                name={`startDate-${row.sNo}`}
                                value={row.registrationStartDate}
                                type="date"
                                error={errors[row.courseId]?.registrationStartDate?.isDirty && (((errors[row.courseId]?.registrationStartDate?.errors)
                                  || []).length > 0)}
                                minDate={minAcademicDate}
                                maxDate={maxAcademicDate}
                                onBlur={(e) => handleChange(row.courseId, e.target.value, 'registrationStartDate')}
                                onChange={(newDate) => handleChange(row.courseId, newDate, 'registrationStartDate')}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCells}>
                              <DatePickerAtom
                                wrapperClassName={classes.datePicker}
                                label={`${t('END_DATE')}*`}
                                minWidth="100%"
                                id={`endDate-${row.sNo}`}
                                name={`endDate-${row.sNo}`}
                                value={row.registrationEndDateWithoutLateFee}
                                type="date"
                                error={errors[row.courseId]?.registrationEndDateWithoutLateFee?.isDirty
                                  && ((
                                    (errors[row.courseId]?.registrationEndDateWithoutLateFee?.errors)
                                    || []).length > 0)}
                                onBlur={(e) => handleChange(row.courseId, e.target.value, 'registrationEndDateWithoutLateFee')}
                                onChange={(newDate) => handleChange(row.courseId, newDate, 'registrationEndDateWithoutLateFee')}
                                minDate={showMinDate(row.registrationStartDate)}
                                maxDate={maxAcademicDate}
                              />
                            </TableCell>
                            <TableCell className={classes.tableCells}>
                              <DatePickerAtom
                                wrapperClassName={classes.datePicker}
                                label={`${t('START_DATE')}`}
                                minWidth="100%"
                                id={`lateFeeEndDate-${row.sNo}`}
                                name={`lateFeeEndDate-${row.sNo}`}
                                value={row.registrationEndDateWithLateFee || null}
                                type="date"
                                error={errors[row.courseId]?.registrationEndDateWithLateFee?.isDirty
                                  && (((errors[row.courseId]?.registrationEndDateWithLateFee?.errors)
                                    || []).length > 0)}
                                onBlur={(e) => handleChange(row.courseId, e.target.value, 'registrationEndDateWithLateFee')}
                                minDate={showMinDate(row.registrationStartDate)}
                                maxDate={showMaxDate(row.registrationEndDateWithoutLateFee)}
                                onChange={(newDate) => handleChange(row.courseId, newDate, 'registrationEndDateWithLateFee')}
                              />
                            </TableCell>
                            <TableCell className={classes.LateFeeAmount}>
                              <TextFieldAtom
                                className={classes.LateFeeAmount}
                                label={`${t('LATE_FEE')}`}
                                id={`lateFee-${row.sNo}`}
                                name={`lateFee-${row.sNo}`}
                                value={row.lateFeeAmount || 0}
                                InputProps={{
                                  startAdornment: <InputAdornment position="end">$</InputAdornment>,
                                }}
                                custominputProps={{ style: { textAlign: 'right' } }}
                                type="number"
                                onChange={(e) => handleChange(row.courseId, e.target.value, 'lateFeeAmount')}
                                onBlur={(e) => handleChange(row.courseId, e.target.value, 'lateFeeAmount')}
                              />
                            </TableCell>
                          </TableRow>
                          {
                            showError(row.courseId)
                            && (
                              <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell className={classes.errorText} colSpan={5} size="medium">{showError(row.courseId)}</TableCell>
                              </TableRow>
                            )

                          }

                        </>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid mt={3} container justifyContent="flex-end">
                <ButtonAtom
                  name={t('CANCEL')}
                  btntype={Buttons.secondary}
                  className={classes.secButton}
                  onClick={() => { window.location.reload(); }}
                />
                <ButtonAtom
                  name={t('SAVE')}
                  btntype={Buttons.PRIMARY}
                  className={classes.actionBtn}
                  onClick={() => save()}
                />
              </Grid>
            </>
          )
      }
    </Box>
  );
}
