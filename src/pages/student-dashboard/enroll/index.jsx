import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import EditParent from '../../register/parent-info';
import {
  getNextEnrollCourse,
} from '../../../store/actions/getStudent';
import { getFeeStructureForEnroll } from '../../../store/actions/getPayment';
import { Button, Checkbox } from '../../../components/atoms';
import { Buttons } from '../../../constant';
import { removeSpecialChar } from '../../../utils/methods';

import EditStudent from '../../admin-user/students/edit-student/edit';
import StudentInfo from '../../register/student-info';
import DialogAtom from '../../../components/atoms/dialog';
import EnrollPayment from './enroll-payment';
import useStudent from '../../../custom-hooks/useStudent';
import { gerParentPayload, getPrimaryStudentPayload, getStudent } from './helper';

function DisplayEditStudent({
  selectedStudent,
  isSibling,
  setStudentData,
  classes,
  setFormikControl,
  parentInfo,
  enrollCourseList,
}) {
  return (
    <Grid container justifyContent="flex-start">
      <Grid item xs={12}>
        <EditStudent
          isEnrollStudent
          isSibling={isSibling}
          studentInfo={selectedStudent}
          editStudentClasses={classes}
          setStudentData={setStudentData}
          setFormikControl={setFormikControl}
          parentInfo={parentInfo}
          enrollCourseList={enrollCourseList}
        />
      </Grid>
    </Grid>
  );
}

export default function EnrollStudent({
  showAddSibling,
  setShowAddSibling,
  studentAccountDetails,
}) {
  const { t } = useTranslation();
  const [parentLoading, setParentLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isParentValid, setParentValid] = useState(false);
  const [parentFormik, setParentFormik] = useState(false);
  const [parentConscent, setParentConscent] = useState(false);
  const [parentConscentError, setParentConscentError] = useState('');
  const [primaryStudentConscent, setPrimaryStudentConscent] = useState(false);

  const [primaryStudentConscentError, setPrimaryStudentConscentError] = useState('');
  const [primaryStudentFormikControl, setPrimaryStudentFormikControl] = useState('');

  const [siblingConscent, setSiblingConscent] = useState({});
  const [siblingConscentError, setSiblingConscentError] = useState({});

  const [siblingFormikControl, setSiblingFormikControl] = useState({});
  const [siblingData, setSiblingData] = useState([]);
  const [primaryStudentData, setPrimaryStudentData] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedStudentData = useStudent();
  const [selectedStudent] = useState(
    studentAccountDetails?.studentData?.find((stu) => stu.primaryStudent),
  );

  const dispatch = useDispatch();

  const handleClose = () => {
    setIsPaymentDialogOpen(false);
  };

  React.useEffect(() => {
    dispatch(getNextEnrollCourse(selectedStudent?.id));
  }, []);
  const enrollClasses = useStyles(style)();
  const [expandedPanel, setExpandedPanel] = useState(1);
  useEffect(() => {
    if (showAddSibling) {
      setExpandedPanel(siblingData.length + 3);
    }
  }, [showAddSibling]);
  const reduxStorePayment = useSelector((state) => state?.getPayment);

  const enrollCourseList = selectedStudentData?.enrollCourseList;
  const enrollStudentData = reduxStorePayment?.enrollStudentData;

  useEffect(() => {
    const sibling = studentAccountDetails?.studentData?.filter(
      (stu) => !stu.primaryStudent,
    );
    const tempSiblingConscent = {};
    const sibData = sibling?.map((i, ind) => {
      const studentInfo = i?.studentInfo;
      const enrolledCourses = i?.enrolled_courses;
      tempSiblingConscent[ind] = false;
      const {
        firstName, gender, lastName, middleName, profilePhoto,
        manabadiEmail,
      } = studentInfo;

      const {
        academicGrade,
        address,
        // courseName,
        extraCurricularActivities,
        location,
        tShirtSize,
      } = enrolledCourses;
      // const option = enrollCourseList?.filter((it) => it?.name === courseName);
      return {
        studentId: i?.id,
        studentName: `${firstName} ${lastName}`,
        academicYear: '2022-2023',
        profileImage: profilePhoto,
        firstName,
        middleName,
        lastName,
        selectedClassLevel: '',
        dateOfBirth: i?.dateOfBirth,
        gender,
        tShirt: tShirtSize,
        grade: academicGrade,
        searchSchool: address,
        sortedNearest: location?.id,
        academicSchool: address,
        extraCurricularActivities,
        manabadiEmail,
      };
    });
    setSiblingConscent(tempSiblingConscent);
    setSiblingData(sibData);
  }, [studentAccountDetails?.studentData, enrollCourseList]);
  const [parentInfo, setParentInfo] = useState({
    parentOneTitle: studentAccountDetails?.parent1Data?.user_extended?.title,
    parentOneFirstName: studentAccountDetails?.parent1Data?.firstName,
    parentOneMiddleName: studentAccountDetails?.parent1Data?.middleName,
    parentOneLastName: studentAccountDetails?.parent1Data?.lastName,
    parentOneEmail: studentAccountDetails?.parent1Data?.personalEmail,
    parentOneProfession:
      studentAccountDetails?.parent1Data?.user_extended?.profession,
    parentOneContact: formatPhoneNumberIntl(studentAccountDetails?.parent1Data?.contactNumber),
    parentOneCompany:
      studentAccountDetails?.parent1Data?.user_extended?.nameOfCompany,
    parentTwoTitle: studentAccountDetails?.parent2Data?.user_extended?.title,
    parentTwoFirstName: studentAccountDetails?.parent2Data?.firstName,
    parentTwoLastName: studentAccountDetails?.parent2Data?.lastName,
    parentTwoMiddleName: studentAccountDetails?.parent2Data?.middleName,
    parentTwoEmail: studentAccountDetails?.parent2Data?.personalEmail,
    parentTwoProfession:
      studentAccountDetails?.parent2Data?.user_extended?.profession,
    parentTwoContact: formatPhoneNumberIntl(studentAccountDetails?.parent2Data?.contactNumber),
    parentTwoCompany:
      studentAccountDetails?.parent2Data?.user_extended?.nameOfCompany,
    homeAddress: studentAccountDetails?.addressData?.address,
    homeAddressInfo: {
      lat: studentAccountDetails?.addressData?.latitude,
      lng: studentAccountDetails?.addressData?.longitude,
      add: studentAccountDetails?.addressData?.address,
    },
    aptSuite: studentAccountDetails?.addressData?.aptSuite,
    volunteer:
      studentAccountDetails?.parent1Data?.user_extended?.volunteerChoice || [],
    hearAboutUs:
      studentAccountDetails?.parent1Data?.user_extended?.recommendedSource?.filter((i) => i !== null && i !== undefined)
      || [],
    readTelugu: studentAccountDetails?.parent1Data?.user_extended?.readTelugu,
    speakTelugu: studentAccountDetails?.parent1Data?.user_extended?.speakTelugu,
  });
  const studentInfo = selectedStudent?.studentInfo;
  const enrolledCourses = selectedStudent?.enrolled_courses;

  useEffect(() => {
  }, [primaryStudentData, siblingData]);
  const {
    academicGrade,
    address,
    // courseName,
    extraCurricularActivities,
    location,
    tShirtSize,
  } = enrolledCourses;
  // const option = enrollCourseList?.filter((i) => i?.name === courseName);

  useEffect(() => {
    const studentObj = getStudent(
      studentInfo,
      selectedStudent,
      '2022-2023',
      tShirtSize,
      academicGrade,
      address,
      location,
      extraCurricularActivities,
    );
    setPrimaryStudentData(studentObj);
  }, [
    enrollCourseList,
    studentAccountDetails?.studentData,
    selectedStudent,
    enrolledCourses,
  ]);

  const [addedSiblingInfo, setAddedSiblingInfo] = useState(0);
  const [studentFormError, setStudentFormError] = useState(0);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const classes = useStyles(style)();

  const setHeaderTitle = (title) => (
    <Grid container item xs={12} spacing={0} justifyContent="space-between">
      <Grid item xs={12}>
        <div className={classes.headerTitle}>{title}</div>
      </Grid>
      <div className={classes.borderBottom} />
    </Grid>
  );
  const makeAccordin = (summaryTitle, detail, panel, showRemove = false) => (
    <Accordion
      expanded={expandedPanel === panel}
      onChange={handleAccordionChange(panel)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid item className={enrollClasses.headerContainer} xs={12}>
          <div>
            <div className={enrollClasses.siblingTitle}>
              {setHeaderTitle(summaryTitle, 0)}
            </div>
            {showRemove ? (
              <div
                className={enrollClasses.removeTitle}
                onClick={() => {
                  setShowAddSibling(false);
                  setAddedSiblingInfo(0);
                }}
              >
                {t('REMOVE')}
              </div>
            ) : (
              ''
            )}
          </div>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <Grid item xs={12}>
          {detail}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
  const getEnrollFeeStructure = (addSiblingData = {}) => {
    setParentLoading(true);
    const payload = gerParentPayload(parentInfo, studentAccountDetails);
    const studentPayload = [];
    const primaryStudentInfo = getPrimaryStudentPayload(primaryStudentData);
    if (!Object.keys(primaryStudentFormikControl.errors).length && primaryStudentConscent) {
      studentPayload.push(primaryStudentInfo);
    }
    Object.keys(siblingFormikControl).forEach((sc, index) => {
      const sib = { ...siblingData[index] };
      if (!Object.keys(siblingFormikControl[sc].errors).length && siblingConscent[index]) {
        studentPayload.push({
          user: {
            firstName: sib?.firstName,
            middleName: sib?.middleName,
            lastName: sib?.lastName,
            studentId: sib?.studentId,
            gender: sib?.gender,
            manabadiEmail: sib?.manabadiEmail,
          },
          studentDetail: {
            image: sib?.profileImage,
            dateOfBirth: sib?.dateOfBirth,
          },
          academicSchool: {
            address: sib?.academicSchool?.address,
            aptSuite: 'A5',
            latitude: sib?.academicSchool?.latitude,
            longitude: sib?.academicSchool?.longitude,
          },
          enrollmentCourse: {
            academicYear: sib?.academicYear,
            academicGrade: sib?.grade,
            locationId: sib?.sortedNearest,
            tShirtSize: sib?.tShirt,
            courseId: sib?.selectedClassLevel?.id,
            courseName: sib?.selectedClassLevel?.name,
            extraCurricularActivities: sib?.extraCurricularActivities || [],
          },
        });
      }
    });
    let newStudents = [];
    if (showAddSibling && Object.keys(addSiblingData).length) {
      newStudents = Object.entries(addSiblingData).map((s) => ({
        user: {
          firstName: s[1]?.firstName && removeSpecialChar(s[1]?.firstName),
          middleName: s[1].middleName,
          lastName: s[1]?.lastName && removeSpecialChar(s[1]?.lastName),
          gender: s[1].gender,
        },
        studentDetail: {
          image: s[1]?.profileImage,
          dateOfBirth: s[1]?.dateOfBirth,
        },
        academicSchool: {
          address: s[1]?.searchSchool,
          aptSuite: 'A5',
          latitude: Number(s[1]?.studentSchoolInfo?.lat),
          longitude: Number(s[1]?.studentSchoolInfo?.lng),
        },
        enrollmentCourse: {
          academicYear: s[1].academicYear,
          academicGrade: s[1].selectedGrade?.name,
          locationId: s[1]?.sortedNearest,
          tShirtSize: s[1].selectedTshirtOption?.name,
          courseId: s[1].selectedClassLevel?.id,
          courseName: s[1].selectedClassLevel?.name,
          extraCurricularActivities: s[1]?.selectedExtraCurricularActivities?.map((i) => i?.name),
        },
      }));
    }
    payload.students = studentPayload;
    payload.isNewEnrollment = true;
    payload.newStudents = newStudents;
    dispatch(getFeeStructureForEnroll(payload));
    setIsPaymentDialogOpen(true);
    setParentLoading(false);
  };
  const parentDetail = () => (
    <Grid item justifyContent="flex-start" xs={12}>
      <Grid className={classes.editParentBlock}>
        <EditParent
          setLoading={setParentLoading}
          setParentInfo={setParentInfo}
          setParentFormik={setParentFormik}
          parentInfo={parentInfo}
          source="editParent"
          primaryButton={t('SAVE')}
          loading={parentLoading}
          isEnrollStudent
          editParentClasses={classes}
          setParentValid={setParentValid}
          isParentValid={isParentValid}
        />
        <Grid
          xs={12}
          className={classes.confirmCheck}
        >
          <Checkbox
            label={t('CONSCENT')}
            checked={parentConscent}
            handleChange={(e) => {
              setParentConscent(e.target.checked);
              if (e.target.checked) {
                setParentConscentError('');
              } else {
                setParentConscentError(t('PARENT_CONSCENT_ERROR'));
              }
            }}
            customClasses={classes.errorCheckBox}
          />
          <span className={enrollClasses.errorText}>
            {parentConscentError ? t(parentConscentError) : ''}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
  const onFormSubmit = (addSiblingData = {}) => {
    // Check if parent information is valid or not
    parentFormik.submitForm();
    primaryStudentFormikControl?.submitForm();
    if (siblingData.length) {
      Object.keys(siblingFormikControl).forEach((sc) => {
        siblingFormikControl[sc]?.submitForm();
      });
    }
    if (!isParentValid) {
      return;
    }

    // Check if parent conscent is checked or not
    if (!parentConscent) {
      setParentConscentError(t('PARENT_CONSCENT_ERROR'));
      return;
    }
    setParentConscentError('');

    // Show conscent error if primary student info is valid
    if (!Object.keys(primaryStudentFormikControl.errors).length) {
      if (!primaryStudentConscent) {
        setPrimaryStudentConscentError(t('CHECK_SELECTION_REQUIRED'));
      } else {
        setPrimaryStudentConscentError('');
      }
    }
    // Show conscent error if sibling student info is valid
    if (siblingData.length) {
      const tempSiblingConscentError = {};
      Object.keys(siblingFormikControl).forEach((sc, index) => {
        if (!Object.keys(siblingFormikControl[sc].errors).length) {
          if (!siblingConscent[index]) {
            tempSiblingConscentError[index] = t('CHECK_SELECTION_REQUIRED');
          } else {
            tempSiblingConscentError[index] = '';
          }
        }
      });
      setSiblingConscentError({ ...tempSiblingConscentError });
    }

    // Check primary student info and conscent checked or not
    let primaryStudentValid = false;
    if (!Object.keys(primaryStudentFormikControl.errors).length && primaryStudentConscent) {
      primaryStudentValid = true;
    }

    // Check sibling info and conscent checked or not
    let isSiblingInfoValid = false;
    if (siblingData.length) {
      Object.keys(siblingFormikControl).forEach((sc, index) => {
        if (!Object.keys(siblingFormikControl[sc].errors).length && siblingConscent[index]) {
          isSiblingInfoValid = true;
        }
      });
    }

    if (!(primaryStudentValid || isSiblingInfoValid || (showAddSibling && Object.keys(addSiblingData).length))) return;
    getEnrollFeeStructure(addSiblingData);
  };
  const getEnrollCourseList = (stuId) => {
    if (!stuId) return [];
    const data = enrollCourseList?.find((stu) => stu.studentId === stuId);
    if (!data || !data?.course) return [];
    const courses = data?.course.map((i) => ({
      id: i?.toCourse?.id,
      name: i?.toCourse?.name,
    }));
    return courses;
  };
  return (
    <Box className={classes.accordin}>
      {makeAccordin(t('PARENT_INFORMATION'), parentDetail(), 1)}
      {primaryStudentData && (
        <>
          {makeAccordin(
            `${primaryStudentData?.studentName} (${t('PRIMARY_STUDENT')})`,
            <Grid className={classes.editStudentBlock}>
              <DisplayEditStudent
                isEnrollStudent
                selectedStudent={primaryStudentData}
                setStudentData={setPrimaryStudentData}
                accordin={2}
                classes={classes}
                parentInfo={parentInfo}
                enrollCourseList={getEnrollCourseList(primaryStudentData?.studentId)}
                setFormikControl={(c) => {
                  setPrimaryStudentFormikControl(c);
                }}
              />
              <Grid
                item
                xs={12}
              >
                <Checkbox
                  label={t('CONSCENT')}
                  checked={primaryStudentConscent}
                  handleChange={(e) => {
                    setPrimaryStudentConscent(e.target.checked);
                    if (e.target.checked) {
                      setPrimaryStudentConscentError('');
                    } else {
                      setPrimaryStudentConscentError(t('CHECK_SELECTION_REQUIRED'));
                    }
                  }}
                  customClasses={classes.primaryStudentConscentError}
                />
                <span className={`${classes.errorText} ${classes.moreRightSpace}`}>
                  {primaryStudentConscentError
                    ? t(primaryStudentConscentError)
                    : ''}
                </span>
              </Grid>
            </Grid>,
            2,
          )}
        </>
      )}
      <div className="flow">
        {siblingData?.map((point, index) => (
          <>
            {makeAccordin(
              `${point?.studentName} (${t('SIBLING')})`,
              <>
                <Grid className={classes.editStudentBlock}>
                  <DisplayEditStudent
                    isEnrollStudent
                    enrollCourseList={getEnrollCourseList(point?.studentId)}
                    setStudentData={(sData) => {
                      const siData = [...siblingData];
                      siData[index] = sData;
                      setSiblingData(siData);
                    }}
                    selectedStudent={point}
                    accordin={index + 3}
                    classes={classes}
                    parentInfo={parentInfo}
                    setFormikControl={(c) => {
                      setSiblingFormikControl({
                        ...siblingFormikControl,
                        [index]: c,
                      });
                    }}
                  />
                </Grid>
                <Checkbox
                  label={t('CONSCENT')}
                  checked={siblingConscent[index]}
                  handleChange={(e) => {
                    const tSiblingConscenet = { ...siblingConscent };
                    tSiblingConscenet[index] = e.target.checked;
                    setSiblingConscent(tSiblingConscenet);
                    const tSiblingConscentError = { ...siblingConscentError };
                    tSiblingConscentError[index] = e.target.checked ? '' : t('CHECK_SELECTION_REQUIRED');
                    setSiblingConscentError(tSiblingConscentError);
                  }}
                />
                <span className={`${classes.errorText} ${classes.moreRightSpace}`}>
                  {siblingConscentError[index]
                    ? siblingConscentError[index]
                    : ''}
                </span>
              </>,
              index + 3,
            )}
          </>
        ))}
      </div>
      {showAddSibling
        && makeAccordin(
          t('ADD_NEW_SIBLING'),
          <StudentInfo
            setStudentInfo={setAddedSiblingInfo}
            studentInfo={addedSiblingInfo}
            loading={studentLoading}
            setLoading={setStudentLoading}
            studentFormError={studentFormError}
            setStudentFormError={setStudentFormError}
            source="editStudent"
            parentInfo={{
              homeAddressInfo: {
                lat: studentAccountDetails?.addressData?.latitude,
                lng: studentAccountDetails?.addressData?.longitude,
              },
            }}
            onStudentSubmit={(data) => onFormSubmit(data)}
            editStudentClasses={classes}
          />,
          siblingData.length + 3,
          true,
        )}
      <DialogAtom
        isOpen={isPaymentDialogOpen}
        onClose={handleClose}
        dialogHeading="Payment Information"
        customClass={classes.paymentDialogAtom}
        content={(
          <EnrollPayment
            loading={loading}
            setLoading={setLoading}
            classes={classes}
            enrollStudentData={enrollStudentData}
          />
        )}
        secHandle={() => setIsPaymentDialogOpen(false)}
      />
      {!showAddSibling && (
        <Grid textAlign="right" mt={2}>
          <Button
            name={t('SAVE')}
            onClick={() => onFormSubmit({})}
            btntype={Buttons.PRIMARY}
          />
        </Grid>
      )}
    </Box>
  );
}
