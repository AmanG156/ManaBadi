import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';

import styles from './style';
import useStyles from '../../../../../custom-hooks/useStyles';
import CourseRow from '../course-row';

export default function ListOfCourses(props) {
  const { t } = useTranslation();

  const classes = useStyles(styles)();
  const { data, updateCourseDetails } = props;

  return (
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <Grid container spacing={1}>
        <TableContainer>
          <Table sx={12} aria-label="simple table">
            <TableHead className={classes.regionManagerTable}>
              <TableRow>
                <TableCell align="left"><h3 className={classes.title}>{`${t('COURSE_NAME')}`}</h3></TableCell>
                <TableCell align="center"><h3 className={classes.title}>{`${t('LEVEL')}`}</h3></TableCell>
                <TableCell align="center"><h3 className={classes.title}>{`${t('STATUS')}`}</h3></TableCell>
                <TableCell align="center">
                  {' '}
                  <h3 className={classes.title}>{`${t('FEE_STRUCTURE')}`}</h3>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody className={classes.regionManagerTable}>
              {data.map((row, index) => (
                <CourseRow
                  key={row?.id}
                  courseInfo={row}
                  updateCourse={(details) => {
                    updateCourseDetails(index, {
                      info: row,
                      details,
                    });
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
