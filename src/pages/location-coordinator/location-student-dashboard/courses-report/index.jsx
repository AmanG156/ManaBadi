import React, { useEffect, useState } from 'react';
import {
  Table, Grid, FormControl, RadioGroup, Radio,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../../../custom-hooks/useStyles';
import { getCubejsApi } from '../../../../utils/cube';
import styles from './style';
import { getAllCourses } from '../../../../store/actions/getStudent';

const categories = ['notScored', 'absent', 'score65', 'score75', 'score100'];

const getCategory = (item) => {
  const marks = item['LocationPanelScore.totalMarks'];
  const isPresent = item['LocationPanelScore.isPresent'];
  if (!isPresent) {
    return 'absent';
  } if (!marks) {
    return 'notScored';
  }
  switch (true) {
    case ((marks > 0) && (marks <= 64)):
      return 'score65';
    case ((marks > 64) && (marks <= 75)):
      return 'score75';
    case ((marks > 75) && (marks <= 100)):
      return 'score100';
    default:
      return 'notScored';
  }
};

function CoursesReport({ location, year }) {
  const classes = useStyles(styles)();
  const dispatch = useDispatch();
  const reduxStore = useSelector((state) => state?.getStudent);

  const { t } = useTranslation();
  const [data, setData] = useState({});
  const [selectedQuarter, setQuarter] = useState('Q1');
  const [availableQuarters] = useState(['Q1', 'Q2', 'Q3']);
  const [availableCourses, setCourses] = useState([]);

  useEffect(() => {
    dispatch(getAllCourses());
  }, []);

  const query = {
    measures: ['LocationPanelScore.count'],
    order: [['LocationPanelScore.quarter',
      'asc'],
    ['Course.name',
      'asc']],
    filters: [{
      member: 'LocationPanelScore.locationId',
      operator: 'equals',
      values: [location],
    },
    {
      member: 'LocationPanelScore.academicYear',
      operator: 'equals',
      values: [year],
    }],
    dimensions: ['LocationPanelScore.quarter', 'Course.name', 'LocationPanelScore.totalMarks', 'LocationPanelScore.isPresent'],
  };

  useEffect(() => {
    if (reduxStore?.courses.length > 0) {
      setData({});
      setCourses(reduxStore?.courses.map((course) => course.name));
      getCubejsApi().load(query).then((resultSet) => {
        if ((resultSet?.rawData() || []).length > 0) {
          const obje = {};
          resultSet?.rawData().map((item) => {
            const obj = {
              quarter: item['LocationPanelScore.quarter'],
              courseName: item['Course.name'],
              marks: item['LocationPanelScore.totalMarks'],
              category: getCategory(item),
              isPresent: item['LocationPanelScore.isPresent'],
            };

            obje[obj.quarter] = {
              ...obje[obj.quarter],
              [`${obj.category}-${obj.courseName}`]: obj.marks,
            };

            return obj;
          });
          setData(obje);
          setQuarter('Q1');
        }
      });
    }
  }, [location, year, reduxStore?.courses.length]);

  const renderHeader = () => {
    if (!reduxStore?.courses || (reduxStore?.courses.length === 0) || Object.entries(data).length === 0) {
      return null;
    }

    return (reduxStore?.courses || []).map((course, index) => (<TableCell key={`${course.name}-${index} `} className={classes.tableHeader} align="right">{course.name}</TableCell>));
  };

  const renderQuarterRadioBox = () => {
    if (!availableQuarters || (availableQuarters.length === 0)) {
      return null;
    }

    return availableQuarters.map((quarter) => (
      <FormControlLabel
        onChange={(e) => setQuarter(e.target.name)}
        key={quarter}
        name={quarter}
        checked={selectedQuarter === quarter}
        control={<Radio size="small" />}
        label={quarter}
      />
    ));
  };

  const renderBody = () => {
    if (!data || (reduxStore.courses?.length === 0) || (Object.entries(data).length === 0)
    || !data[selectedQuarter]) {
      return <div className={classes.noData}>{t('NO_DATA')}</div>;
    }

    return categories.map((category, i) => (
      <TableRow
        key={category + i}
        className={classes.tableRow}
      >
        <TableCell component="th" scope="row">{t(category.toUpperCase())}</TableCell>
        {availableCourses.map((course, index) => (
          <TableCell
            key={`${category}-${course}-${index}`}
            align="center"
            className={data[selectedQuarter][`${category}-${course}`] && classes[`${category}`]}
          >
            {data[selectedQuarter][`${category}-${course}`]}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderTable = () => {
    if ((Object.entries(data).length === 0) || !data[selectedQuarter]) {
      return (<div className={classes.noData}>{t('NO_DATA')}</div>);
    }

    return (
      <TableContainer>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHeader}>
              <TableCell />
              {renderHeader()}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderBody()}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Grid container item direction="column">
      <div className={`${classes.testScoreTitle} `}>
        {t('TEST_SCORE')}
      </div>
      <Grid className={classes.radioButtonWrapper}>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            defaultValue="top"
          >
            {renderQuarterRadioBox()}
          </RadioGroup>
        </FormControl>
      </Grid>
      <div className={classes.horizontalLine} />
      {renderTable()}
    </Grid>
  );
}

export default function CoursesReportWrapper({ location, year }) {
  return (
    <CoursesReport location={location} year={year} />
  );
}
