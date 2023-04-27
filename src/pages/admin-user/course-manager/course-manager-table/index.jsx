import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';

function createData(
  courseName,
  baseCourse,
  status,
  feeStructure,
  fee,
  examFee,
  registrationFee,
  repeatingDiscount,
  siblingDiscount,
  fromCourse,
  courseId,
) {
  return {
    courseName,
    baseCourse: baseCourse ? 'Yes' : 'No',
    status: status ? 'Active' : 'InActive',
    feeStructure,
    fee,
    examFee,
    registrationFee,
    repeatingDiscount,
    siblingDiscount,
    fromCourse,
    courseId,
  };
}

function ExpandableTableRow({
  children,
  expandComponent,
  classes,
  rowData,
  setSelectedRow,
  setShowEditCourseDialog,
  ...otherProps
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <TableRow {...otherProps}>
        {children}
        <TableCell padding="checkbox" align="right" className={classes.actionCell}>
          <Box display="flex">
            <EditIcon onClick={() => {
              const row = [];
              row.push(rowData);
              setSelectedRow(row);
              setShowEditCourseDialog(true);
            }}
            />
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>

        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell padding="checkbox" />
          {expandComponent}
        </TableRow>
      )}
    </>
  );
}

export default function CourseManagerTable({ tableData, setSelectedRow, setShowEditCourseDialog }) {
  const rows = [];
  tableData.map((item) => rows.push(createData(
    item?.name,
    item?.baseCourse,
    item?.isActive,
    item?.feeStructure,
    item?.fee?.fee,
    item?.fee?.examFee,
    item?.fee?.registrationFee,
    item?.fee?.repeatingDiscount,
    item?.fee?.siblingDiscount,
    item?.fromCourse,
    item?.id,
  )));
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.roleManagerTable}>
          <TableRow>
            <TableCell>{t('COURSE_NAME')}</TableCell>
            <TableCell align="left">{t('BASE_COURSE')}</TableCell>
            <TableCell align="center">{t('STATUS')}</TableCell>
            <TableCell align="right">{t('FEE_STRUCTURE')}</TableCell>
            <TableCell align="right">{t('Actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.roleManagerTable}>
          {rows.map((row) => (
            <ExpandableTableRow
              key={row.name}
              classes={classes}
              rowData={row}
              setSelectedRow={setSelectedRow}
              setShowEditCourseDialog={setShowEditCourseDialog}
              expandComponent={(
                <TableCell colSpan="5">
                  <Grid container spacing={3}>
                    <Grid item xs={6} />
                    <Grid item xs={3} justify-content="flex-end" className={classes.expandedData}>
                      <Typography className={classes.feeStructure}>
                        <p className={classes.feeName}>
                          {t('FEE')}
                          :
                          {' '}
                        </p>
                        <p className={classes.feeValue}>
                          $
                          {row.fee}
                        </p>
                      </Typography>
                      <Typography className={classes.feeStructure}>
                        <p className={classes.feeName}>
                          {t('EXAM_STRUCTURE')}
                          :
                        </p>
                        <p className={classes.feeValue}>
                          {' '}
                          $
                          {row.examFee}
                        </p>
                      </Typography>
                      <Typography className={classes.feeStructure}>
                        <p className={classes.feeName}>
                          {t('REGISTRATION_FEE')}
                          :
                        </p>
                        <p className={classes.feeValue}>
                          {' '}
                          $
                          {row.registrationFee}
                        </p>
                      </Typography>
                      <Typography className={classes.feeStructure}>
                        <p className={classes.feeName}>
                          {' '}
                          {t('REPEATING_DISCOUNT')}
                          :
                        </p>
                        <p className={classes.feeValue}>
                          {' '}
                          $
                          {row.repeatingDiscount}
                        </p>
                      </Typography>
                      <Typography className={classes.feeStructure}>
                        <p className={classes.feeName}>
                          {t('SIBLING_DISCOUNT')}
                          :
                        </p>
                        <p className={classes.feeValue}>
                          {' '}
                          $
                          {row.siblingDiscount}
                        </p>
                      </Typography>
                    </Grid>
                  </Grid>
                </TableCell>
              )}
            >
              <TableCell component="th" scope="row">
                {row.courseName}
              </TableCell>
              <TableCell>{row.baseCourse?.toString()}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="right">
                $
                {row.fee}
              </TableCell>
            </ExpandableTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
