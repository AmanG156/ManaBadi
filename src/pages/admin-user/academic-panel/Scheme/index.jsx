import React, { useEffect, useState } from 'react';
import {
  Box, Grid, TextField, Typography,
} from '@mui/material';
import { FormikProvider, useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';

import { Dropdown } from '../../../../components/atoms';

import styles from './styles';

const DUMMY_COURSES = [
  { id: 1, key: 'course_1' },
  { id: 2, key: 'course_2' },
  { id: 3, key: 'course_3' },
];

const DUMMY_ACADEMIC_YEAR = [
  { id: 1, key: '2022-2023' },
  { id: 2, key: '2021-2022' },
  { id: 3, key: '2020-2021' },
];

const DUMMY_QUARTERS = [
  { id: 1, key: 'QUARTER1' },
  { id: 2, key: 'QUARTER2' },
  { id: 3, key: 'QUARTER3' },
  { id: 4, key: 'QUARTER4' },
];

const useGetCourseRows = (ques) => {
  const [rows, setRow] = useState([]);

  useEffect(() => {
    if (ques < rows.length) {
      return;
    }

    setRow([]);
    [...Array(ques)].map((_, i) => setRow((oldRows) => [...oldRows, i]));
  }, [ques]);

  return { rows, setRow };
};

function RenderFieldsGrid() {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      courses: '',
      academicYear: '',
      quarter: '',
      schemaLabel: '',
      passingCriteria: '',
      weightage: '',
      totalQuestions: '',
      maxMarks: '',
    },
  });

  // used incase of decreasing number of questions by deleting course rows
  const setTotalQuestions = (questions) => {
    formik.setFieldValue('totalQuestions', questions);
  };

  return (
    <Box>
      <FormikProvider value={formik}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Dropdown
              label={`${t('COURSES')}`}
              id="courses"
              name="courses"
              labelId="courses"
              disabled={false}
              value={formik.values.courses}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={DUMMY_COURSES.map((course) => ({
                id: course.id,
                name: course.key,
              }))}
              customStyles={styles.dropDownCont}
            />
          </Grid>
          <Grid item xs={3}>
            <Dropdown
              label={`${t('ACADEMICYEAR')}`}
              id="academicYear"
              name="academicYear"
              labelId="academicYear"
              disabled={false}
              value={formik.values.academicYear}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={DUMMY_ACADEMIC_YEAR.map((year) => ({
                id: year.id,
                name: year.key,
              }))}
              customStyles={styles.dropDownCont}
            />
          </Grid>
          <Grid item xs={3}>
            <Dropdown
              label={`${t('QUARTER')}`}
              id="quarter"
              name="quarter"
              labelId="quarter"
              disabled={false}
              value={formik.values.quarter}
              handleChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={DUMMY_QUARTERS.map((quarter) => ({
                id: quarter.id,
                name: quarter.key,
              }))}
              customStyles={styles.dropDownCont}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.LABEL')}
              id="schemaLabel"
              labelId="schemaLabel"
              name="schemaLabel"
              required
              type="text"
              disabled={false}
              value={formik.values.schemaLabel}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          {/* row 2 */}
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.PASSING_CRITERIA')}
              id="passingCriteria"
              name="passingCriteria"
              labelId="passingCriteria"
              required
              type="number"
              disabled={false}
              value={formik.values.passingCriteria}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.WEIGHTAGE')}
              id="weightage"
              name="weightage"
              labelId="weightage"
              required
              type="number"
              disabled={false}
              value={formik.values.weightage}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.TOTAL_QUESTIONS')}
              required
              id="totalQuestions"
              name="totalQuestions"
              labelId="totalQuestions"
              type="number"
              disabled={false}
              value={formik.values.totalQuestions}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.MAXIMUM_MARKS')}
              id="maxMarks"
              labelId="maxMarks"
              name="maxMarks"
              required
              type="number"
              disabled={false}
              value={formik.values.maxMarks}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
        </Grid>
      </FormikProvider>
      <RenderCourseField
        questions={formik.values.totalQuestions || 0}
        {...{ setTotalQuestions }}
      />
    </Box>
  );
}

function RenderCourseField({ questions, setTotalQuestions }) {
  const { t } = useTranslation();
  const { rows, setRow } = useGetCourseRows(questions);

  if (!rows || !rows.length) {
    return <div />;
  }

  const deleteRow = (id) => {
    // decrease num of question in field
    setTotalQuestions(questions - 1);

    // delete selected row
    setRow((oldRows) => oldRows.filter((rowID) => rowID !== id));
  };

  return (
    <Box marginTop={2}>
      <Box style={styles.courseTableHeadingCont}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Typography style={styles.courseTableHeading}>
              {t('SCHEMA.CATEGORY')}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={styles.courseTableHeading}>
              {t('SCHEMA.MARKS')}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={styles.courseTableHeading}>
              {t('SCHEMA.NOTES')}
            </Typography>
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </Box>
      <Box marginTop={2}>
        {rows.map((id) => (
          <RenderCourseFieldsRow key={id} rowNo={id} deleteRow={deleteRow} />
        ))}
      </Box>
    </Box>
  );
}

function RenderCourseFieldsRow({ rowNo, deleteRow }) {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      [`category-${rowNo}`]: '',
      [`marks-${rowNo}`]: '',
      [`notes-${rowNo}`]: '',
    },
  });

  const onCrossClick = () => deleteRow(rowNo);

  return (
    <FormikProvider value={formik}>
      <Box marginTop={2}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.CATEGORY')}
              id={`category-${rowNo}`}
              required
              name={`category-${rowNo}`}
              type="number"
              disabled={false}
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              labelId={`category-${rowNo}`}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.MARKS')}
              id={`marks-${rowNo}`}
              required
              name={`marks-${rowNo}`}
              type="number"
              disabled={false}
              value={formik.values.marks}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              labelId={`marks-${rowNo}`}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label={t('SCHEMA.NOTES')}
              id={`notes-${rowNo}`}
              required
              name={`notes-${rowNo}`}
              type="text"
              disabled={false}
              value={formik.values.notes}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              labelId={`notes-${rowNo}`}
              size="small"
              inputProps={{ style: styles.textFieldLabel }}
              InputLabelProps={{ style: styles.textFieldLabel }}
            />
          </Grid>
          <Grid item xs={3}>
            <Box>
              <ClearIcon onClick={onCrossClick} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormikProvider>
  );
}

function Scheme() {
  return (
    <Box m={3}>
      <RenderFieldsGrid />
    </Box>
  );
}

export default Scheme;
