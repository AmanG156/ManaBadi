/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CheckboxAtom from '../../../components/atoms/checkbox/index';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import { useStyles } from './style';
import CourseManagerTable from './course-manager-table/index';
import { DialogAtom } from '../../../components/atoms';
import AddCreateCourse from './Add/index';
import {
  getAllCoursesforManager, createCourse, editCourse,
} from '../../../store/actions/getCourseManager';
import { GetAllCourses, GetOnlyActiveCourses } from './helper';

export default function CourseManager() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const csvLink = useRef();

  const [dataForDownload, setDataForDownload] = useState([]);
  const [isDeactivateChecked, setIsDeactivateChecked] = useState(false);
  const [showAddCourseDialog, setShowAddCourseDialog] = useState(false);
  const [showEditCourseDialog, setShowEditCourseDialog] = useState(false);
  const courseManager = useSelector((state) => state.getCourseManager);
  const [coursesData, setCoursesData] = useState([]);
  const [baseCourse, setBaseCourse] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [bDownloadReady, setDownloadReady] = useState(false);
  const now = moment().format('MM-DD-yyyy');
  const currentTime = moment().format('hh:mm');
  const name = 'Course-Manager';

  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  useEffect(() => {
    dispatch(getAllCoursesforManager());
  }, []);

  useEffect(() => {
    const courses = new GetOnlyActiveCourses(courseManager?.coursesData);
    setCoursesData(courses);
  }, [courseManager?.coursesData]);

  const handleInactive = () => {
    setIsDeactivateChecked(!isDeactivateChecked);
  };

  useEffect(() => {
    if (isDeactivateChecked) {
      const courses = new GetAllCourses(courseManager?.coursesData);
      setCoursesData(courses);
    } else {
      const courses = new GetOnlyActiveCourses(courseManager?.coursesData);
      setCoursesData(courses);
    }
  }, [isDeactivateChecked]);

  const exportRoleList = () => {
    const headers = ['Course Name', 'Base Course', 'Status', 'Fee', 'Exam Fee', 'Registration Fee', 'Repeating Discount', 'Sibling Discount'];
    const data = coursesData.map((elem) => [elem?.name, elem?.baseCourse ? 'Yes' : 'No', elem?.isActive, `$ ${elem?.fee.fee}`, `$ ${elem?.fee.examFee}`, `$ ${elem?.fee.registrationFee}`, `$ ${elem?.fee.repeatingDiscount}`, `$ ${elem?.fee.siblingDiscount}`]);
    setDataForDownload([headers, ...data]);
    setDownloadReady(true);
  };

  const refreshList = () => {
    dispatch(getAllCoursesforManager());
  };

  const handleCreateCourse = (values) => {
    const payload = {
      name: values.courseName,
      fee: values.fee,
      registrationFee: values.registrationFee,
      examFee: values.examFee,
      repeatingDiscount: values.repeatingDiscount,
      siblingDiscount: values.siblingDiscount,
      isActive: status,
      baseCourse,
      minimumAge: 5,
      maximumAge: 5,
      nextCourses: values.nextPossibleCourse,
    };
    setShowAddCourseDialog(false);
    dispatch(createCourse(payload, refreshList));
    setIsDeactivateChecked(isDeactivateChecked);
  };

  const handleEditCourse = (values) => {
    const payload = {
      name: values.courseName,
      fee: values.fee,
      registrationFee: values.registrationFee,
      examFee: values.examFee,
      repeatingDiscount: values.repeatingDiscount,
      siblingDiscount: values.siblingDiscount,
      isActive: status,
      baseCourse,
      minimumAge: 5,
      maximumAge: 5,
      nextCourses: values.nextPossibleCourse,
      courseId: values.courseId,
    };
    setShowEditCourseDialog(false);
    dispatch(editCourse(payload, refreshList));
  };

  const formik = useFormik({
    initialValues: {
      courseName: '',
      fee: parseFloat(0, 10).toFixed(2),
      examFee: parseFloat(0, 10).toFixed(2),
      registrationFee: parseFloat(0, 10).toFixed(2),
      repeatingDiscount: parseFloat(0, 10).toFixed(2),
      siblingDiscount: parseFloat(0, 10).toFixed(2),
      nextPossibleCourse: [],
      status: false,
      baseCourse: false,
    },
    validationSchema: Yup.object({
      courseName: Yup.string(t('COURSE_NAME_REQUIRED'))
        // .matches(/^[aA-zZ\s]+$/, t('NOT_SPECIAL_CHAR'))
        .required(t('COURSE_NAME_REQUIRED'))
        .typeError(t('COURSE_NAME_REQUIRED')),
      fee: Yup.number(t('INVALID_NUMBER'))
        .required(t('FEE_REQUIRED'))
        .typeError(t('INVALID_NUMBER')),
      examFee: Yup.number(t('EXAM_FEE_REQUIRED'))
        .required(t('EXAM_FEE_REQUIRED'))
        .typeError(t('INVALID_NUMBER')),
      registrationFee: Yup.number(t('REGISTRATION_FEE_REQUIRED'))
        .required(t('REGISTRATION_FEE_REQUIRED'))
        .typeError(t('INVALID_NUMBER')),
      repeatingDiscount: Yup.number(t('REPEATING_DISCOUNT_REQUIRED'))
        .required(t('REPEATING_DISCOUNT_REQUIRED'))
        .typeError(t('INVALID_NUMBER')),
      siblingDiscount: Yup.number(t('SIBLING_DISCOUNT_REQUIRED'))
        .required(t('SIBLING_DISCOUNT_REQUIRED'))
        .typeError(t('INVALID_NUMBER')),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        handleEditCourse(values);
      } else {
        handleCreateCourse(values);
      }
    },
  });

  useEffect(() => {
    const row = selectedRow?.[0];
    formik.values.courseName = row?.courseName;
    formik.values.fee = row?.fee ? parseFloat(row?.fee, 10).toFixed(2) : parseFloat(0, 10).toFixed(2);
    formik.values.examFee = row?.examFee ? parseFloat(row?.examFee, 10).toFixed(2) : parseFloat(0, 10).toFixed(2);
    formik.values.registrationFee = row?.registrationFee ? parseFloat(row?.registrationFee, 10).toFixed(2) : parseFloat(0, 10).toFixed(2);
    formik.values.repeatingDiscount = row?.repeatingDiscount ? parseFloat(row?.repeatingDiscount, 10).toFixed(2) : parseFloat(0, 10).toFixed(2);
    formik.values.siblingDiscount = row?.siblingDiscount ? parseFloat(row?.siblingDiscount, 10).toFixed(2) : parseFloat(0, 10).toFixed(2);
    formik.values.status = row?.status;
    formik.values.baseCourse = row?.baseCourse;
    formik.values.courseId = row?.courseId;
    formik.values.nextPossibleCourse = [];
    row?.fromCourse?.forEach((obj) => {
      formik.values.nextPossibleCourse.push(obj.toCourseId);
    });

    if (selectedRow.length > 0) {
      setIsEdit(true);
    }
  }, [selectedRow]);

  const getErrorText = (key, errorText) => (formik.touched[key] && formik.errors[key] ? (
    <span data-testid={key} className={classes.errorText}>
      {formik.errors[key]}
      {' '}
    </span>
  ) : errorText ? (<span className={classes.errorText}>{errorText}</span>) : null);

  return (
    <>
      <Grid className={classes.roleRoot}>
        <Grid container item className={classes.titleRow}>
          <Grid item>
            <Typography className={classes.headerTitle}>
              {t('COURSE_MANAGER')}
            </Typography>
          </Grid>
          <Grid className={classes.dFlex}>
            <div>
              <ButtonAtom
                className={classes.addbutton}
                name={t('EXPORT_TO_CSV')}
                btntype={Buttons.PRIMARY}
                type={Buttons.PRIMARY}
                onClick={() => exportRoleList()}
              />
              <CSVLink
                data={dataForDownload}
                filename={`${name} - ${now} - ${currentTime}`}
                className="hidden"
                ref={csvLink}
                target="_blank"
              />
            </div>
            <ButtonAtom
              className={classes.addbutton}
              name={t('ADD')}
              btntype={Buttons.PRIMARY}
              type={Buttons.PRIMARY}
              onClick={() => {
                setSelectedRow([]);
                setIsEdit(false);
                setShowAddCourseDialog(!showAddCourseDialog);
              }}
              icon={<AddIcon />}
            />
          </Grid>
        </Grid>
        <div className={classes.deactiveCheckbox}>
          <CheckboxAtom
            label={t('VIEW_INACTIVE')}
            id="acceptCheckbox"
            checked={isDeactivateChecked}
            customClasses={classes.viewInactive}
            handleChange={() => handleInactive()}
          />
        </div>
        <Grid container className={classes.roleManagerContainer}>
          <Grid container className={classes.roleManagerList}>
            <Grid className={classes.tableView}>
              <CourseManagerTable
                tableData={coursesData}
                setSelectedRow={setSelectedRow}
                setShowEditCourseDialog={setShowEditCourseDialog}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <DialogAtom
        isOpen={showAddCourseDialog}
        dialogHeading={t('ADD_COURSE')}
        customClass={classes.addCourseDialogAtom}
        content={(
          <AddCreateCourse
            source="createCourse"
            formik={formik}
            setShowAddCourseDialog={setShowAddCourseDialog}
            showAddCourseDialog={showAddCourseDialog}
            getErrorText={getErrorText}
            baseCourse={baseCourse}
            setBaseCourse={setBaseCourse}
            status={status}
            setStatus={setStatus}
            coursesData={coursesData}
          />
        )}
        secHandle={() => setShowAddCourseDialog(false)}
      />
      <DialogAtom
        isOpen={showEditCourseDialog}
        dialogHeading={t('EDIT_COURSE')}
        customClass={classes.addCourseDialogAtom}
        content={(
          <AddCreateCourse
            source="createCourse"
            formik={formik}
            setShowAddCourseDialog={setShowEditCourseDialog}
            showAddCourseDialog={showEditCourseDialog}
            getErrorText={getErrorText}
            baseCourse={baseCourse}
            setBaseCourse={setBaseCourse}
            status={status}
            setStatus={setStatus}
            coursesData={coursesData}
          />
        )}
        secHandle={() => setShowEditCourseDialog(false)}
      />
    </>
  );
}
