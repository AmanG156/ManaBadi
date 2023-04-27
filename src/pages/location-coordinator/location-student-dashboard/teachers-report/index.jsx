import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  IconButton, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Grid,
} from '@mui/material';
import {
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './style';
import useStyles from '../../../../custom-hooks/useStyles';
import { NavigateRoutes } from '../../../../constant';
import MailIcon from '../../../../assets/svg/mailIcon';
import { getTeachers } from '../../../../store/actions/getLocationCoordinator';
import Constant from '../../../../store/constant';
import { setLocalStorage } from '../../../../utils/localStorageMethod';
import { getCubejsApi } from '../../../../utils/cube';

const getStudentIds = (items) => items[0].series.map((item) => item.x);

function TeachersReport({ location, year }) {
  const classes = useStyles(styles)();
  const [studentIds, setStudentIds] = useState([]);
  const dispatch = useDispatch();
  const [isDataPresent, setDataPresence] = useState(true);

  const { t } = useTranslation('translation');

  const headers = [t('TEACHER'), t('STUDENTS_NOT_SCORED'), t('ACTIONS')];
  const navigate = useNavigate();

  const query = {
    measures: ['LocationPanelScore.count'],
    filters: [{
      member: 'LocationPanelScore.locationId',
      operator: 'equals',
      values: [location],
    },
    {
      member: 'LocationPanelScore.academicYear',
      operator: 'equals',
      values: [year],
    },
    { member: 'LocationPanelScore.isPresent', operator: 'equals', values: ['true'] },
    { member: 'LocationPanelScore.totalMarks', operator: 'notSet' }],
    dimensions: ['LocationPanelScore.studentId'],
    order: { 'LocationPanelScore.count': 'desc' },
  };

  const reduxStore = useSelector((state) => state?.getLocationCoordinator);
  const teachers = reduxStore?.notScoredStudentTeachers;

  useEffect(() => {
    getCubejsApi().load(query).then((resultSet) => {
      if ((resultSet?.rawData() || []).length > 0) {
        const ids = getStudentIds(resultSet?.series());
        setStudentIds(ids);
      } else {
        setStudentIds([]);
      }
    });
  }, [location, year]);

  useEffect(() => {
    setDataPresence(teachers.length > 0);
  }, [teachers]);

  useEffect(() => {
    dispatch(getTeachers({
      locationId: location,
      academicYear: year,
      studentArray: studentIds,
    }));
  }, [studentIds]);

  const renderTable = () => (
    <TableContainer className={classes.tableContainer}>
      <Table aria-label="sticky table" className={classes.table}>
        <TableHead>
          <TableRow className={classes.tableHeader}>
            {
              headers.map((header, index) => <TableCell key={`${header}-${index} `} align="left">{header}</TableCell>)
            }
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {teachers.map((row) => (
            <TableRow
              key={row.teacherName}
              className={classes.tableRow}
            >
              <TableCell align="left">{`${row.firstName} ${row.lastName}`}</TableCell>
              <TableCell align="left">{row.count}</TableCell>
              <TableCell className={classes.emailIcon}>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => {
                    dispatch({ type: Constant.RECIPIENTS, payload: [row.manabadiEmail] });
                    setLocalStorage('selectedLocation', location);
                    dispatch({ type: Constant.MAIL_FILTER, payload: 'Location' });
                    setLocalStorage('selectedYear', year);
                    navigate(NavigateRoutes.LOCATION_COORDINATOR_EMAIL);
                  }}
                  aria-label="mail"
                >
                  <MailIcon color="#000000" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Grid container item direction="column">
      <div className={`${classes.teacherStatsTitle} `}>
        {t('TEACHER_SCORES_TO_BE_UPDATED')}
      </div>
      {
        isDataPresent ? renderTable() : (
          <>
            <div className={classes.horizontalLine} />
            <div className={classes.noData}>{t('NO_DATA')}</div>
          </>
        )
      }
    </Grid>
  );
}

export default function TeachersReportWrapper({ location, year }) {
  if (!location || !year) {
    return null;
  }
  return (
    <TeachersReport location={location} year={year} />
  );
}
