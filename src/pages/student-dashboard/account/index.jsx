import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
import ButtonAtom from '../../../components/atoms/button';
import style from './style';
import { newDOB, removeSpecialChar } from '../../../utils/methods';
import EditParent from '../../register/parent-info';
import ParentCard from './parent-card';
import {
  getStudentAccountDetails,
  addSibling,
} from '../../../store/actions/getStudent';

import EditStudent from '../../admin-user/students/edit-student/edit';
import { updateParentInfoByStudent } from '../../../store/actions/getParent';
import StudentInfo from '../../register/student-info';
import DialogAtom from '../../../components/atoms/dialog';
import AddSiblingPayment from './add-sibling-payment';

function DisplayEdit({ onClick }) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  return (
    <Grid item justifyContent="flex-end" xs={12} className={classes.displayEdit}>
      <Grid>
        <ButtonAtom
          name={t('EDIT')}
          onClick={onClick}
          btntype={Buttons.PRIMARY}
        />
      </Grid>
    </Grid>
  );
}

function setData(key, value) {
  const classes = useStyles(style)();
  return (
    <Grid container spacing={0} className={classes.dataPadding}>
      <Grid item xs={4} className={classes.label}>
        {key}
      </Grid>
      <Grid item xs={8} className={classes.value}>
        <span> : </span>
        <span className={classes.previewValue}>{`${value}`}</span>
      </Grid>
    </Grid>
  );
}
function setAdditionalData(key, value) {
  const classes = useStyles(style)();
  return (
    <Grid container spacing={0} className={classes.dataPadding}>
      <Grid item xs={4} className={classes.label}>
        {key}
      </Grid>
      <Grid item xs={8} className={classes.value}>
        <span className={classes.collon}> : </span>
        <span className={classes.previewValue}>{`${value}`}</span>
      </Grid>
    </Grid>
  );
}
function DisplayStudent({ studentInfo }) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  return (
    <Grid container justifyContent="flex-start">
      <Grid container justifyContent="flex-start" direction="row">
        <Grid item xs={2} className={classes.image}>
          <img
            alt="profile-img"
            src={`${studentInfo?.studentInfo?.profilePhoto}?${Date.now()}`}
            className={classes.profileImg}
          />
        </Grid>
        <Grid item xs={10} className={classes.studentDetails}>
          <Grid item xs={12}>
            {setData(t('DOB'), newDOB(studentInfo?.dateOfBirth) || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(t('GENDER'), studentInfo?.studentInfo?.gender || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(
              t('TSHIRT'),
              studentInfo?.enrolled_courses?.tShirtSize || '',
            )}
          </Grid>
          <Grid item xs={12}>
            {setData(t('ACADEMICYEAR'), studentInfo?.enrolled_courses?.academicYear || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(t('ACA_GRADE'), studentInfo?.enrolled_courses?.academicGrade || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(t('CLASSLEVEL'), studentInfo?.enrolled_courses?.courseName || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(t('ACADEMIC_SCHOOL'), studentInfo?.enrolled_courses?.address?.address || '')}
          </Grid>
          <Grid item xs={12}>
            {setData(
              t('EXTRA_ACTIVITIES'),
              studentInfo?.enrolled_courses?.extraCurricularActivities?.join(', ') || '',
            )}
          </Grid>
          <Grid item xs={12}>
            {setData(
              t('MANABADI_LOCATION'),
              studentInfo?.enrolled_courses?.location?.name || '',
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.outerContainer}>
        <Divider />
      </Grid>
    </Grid>
  );
}

function DisplayEditStudent({
  setEditStudent, selectedStudent, isStudent, isSibling,
  setEditSibling, setSiblingData, classes, setStudentState,
}) {
  const studentInfo = selectedStudent?.studentInfo;
  const enrolledCourses = selectedStudent?.enrolled_courses;
  const {
    firstName,
    gender,
    lastName,
    // manabadiEmail,
    middleName,
    profilePhoto,
  } = studentInfo;
  const {
    academicGrade,
    academicYear,
    address,
    courseName,
    extraCurricularActivities,
    location,
    tShirtSize,
  } = enrolledCourses;
  const studentObj = {
    studentId: selectedStudent?.id,
    studentName: `${firstName}
    ${lastName}`,
    academicYear,
    profileImage: profilePhoto,
    firstName,
    middleName,
    lastName,
    selectedClassLevel: courseName,
    dateOfBirth: selectedStudent?.dateOfBirth,
    gender,
    tShirt: tShirtSize,
    grade: academicGrade,
    searchSchool: address,
    sortedNearest: location?.name,
    academicSchool: address,
    extraCurricularActivities,
  };
  return (
    <Grid container justifyContent="flex-start">
      <EditStudent
        isStudent={isStudent}
        isSibling={isSibling}
        studentInfo={studentObj}
        setEditStudent={setEditStudent}
        setEditSibling={setEditSibling}
        siblingId={isSibling ? selectedStudent?.id : null}
        setSiblingData={setSiblingData}
        editStudentClasses={classes}
        setStudentState={setStudentState}
      />
    </Grid>
  );
}

function additionalInfoLeft(parentInfo) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  function getVolunteer() {
    return parentInfo?.volunteer?.join(', ');
  }
  return (
    <>
      <Grid item xs={12}>
        {setAdditionalData(t('HOMEADDRESS'), parentInfo?.homeAddress || '')}
      </Grid>
      <Grid item xs={12}>
        {setAdditionalData(t('APISUITE'), parentInfo?.aptSuite || '', true)}
      </Grid>
      <div className={classes.additionalInfo}>
        <Grid item xs={12}>
          {setData(t('VOLUNTEER_FOR'), getVolunteer() || '')}
        </Grid>
      </div>
    </>
  );
}

function additionalInfoRight(parentInfo) {
  const { t } = useTranslation();
  const getHearAboutUsOp = () => parentInfo.hearAboutUs?.join(', ');

  return (
    <>
      <div>
        <Grid item xs={12}>
          {setData(t('HEARABOUT'), getHearAboutUsOp() || '')}
        </Grid>
      </div>

      <Grid item xs={12}>
        {setData(
          t('SPEAK_TELGU'),
          parentInfo?.speakTelugu ? t('YES') : t('NO'),
          true,
        )}
      </Grid>

      <Grid item xs={12}>
        {setData(
          t('READ_TELGU'),
          parentInfo?.readTelugu ? t('YES') : t('NO'),
          true,
        )}
      </Grid>
    </>
  );
}
function DisplayParent({ parentInfo }) {
  const classes = useStyles(style)();
  const { t } = useTranslation();
  return (
    <Grid container justifyContent="flex-start" direction="row">
      <Grid item xs={12} sm={5.8} className={classes.outerContainer}>
        {ParentCard(
          t('PARENT_ONE'),
          parentInfo?.parentOneTitle,
          parentInfo?.parentOneFirstName,
          parentInfo?.parentOneMiddleName,
          parentInfo?.parentOneLastName,
          parentInfo?.parentOneEmail,
          parentInfo?.parentOneContact,
          parentInfo?.parentOneProfession,
          parentInfo?.parentOneCompany,
          setData,
        )}
      </Grid>
      <Grid item sm={0.2} />
      <Grid item xs={12} sm={6} className={classes.outerContainer}>
        {parentInfo?.parentTwoTitle && ParentCard(
          t('PARENT_TWO'),
          parentInfo?.parentTwoTitle,
          parentInfo?.parentTwoFirstName,
          parentInfo?.parentTwoMiddleName,
          parentInfo?.parentTwoLastName,
          parentInfo?.parentTwoEmail,
          parentInfo?.parentTwoContact,
          parentInfo?.parentTwoProfession,
          parentInfo?.parentTwoCompany,
          setData,
        )}
      </Grid>
      <Grid container justifyContent="flex-start" direction="row" className={classes.additionalContainer}>
        <Grid container>
          <Grid item xs={12} className={classes.titleContainer}>
            {(t('ADDITIONAL_INFO'))}

          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6} className={classes.outerContainer}>
            {additionalInfoLeft(parentInfo)}
          </Grid>

          <Grid item xs={12} sm={6} className={classes.outerContainer}>
            {additionalInfoRight(parentInfo)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default function AccountDetail({
  showAddSibling, setStudentState,
  setShowAddSibling, studentAccountDetails,
}) {
  const { t } = useTranslation();
  const [parentLoading, setParentLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const reduxStorePayment = useSelector((state) => state?.getStudent);
  const addSiblingData = reduxStorePayment?.siblingData;

  const dispatch = useDispatch();

  const [siblingData, setSiblingData] = useState(() => studentAccountDetails
    ?.studentData?.filter((stu) => !stu.primaryStudent));
  const [editParent, setEditParent] = useState(false);

  const registerClasses = useStyles(style)();
  const [expandedPanel, setExpandedPanel] = useState(false);
  useEffect(() => {
    if (showAddSibling) {
      setExpandedPanel(siblingData.length + 3);
    }
  }, [showAddSibling]);
  useEffect(() => {
  }, [siblingData]);
  const [parentInfo, setParentInfo] = useState({
    parentOneTitle: studentAccountDetails?.parent1Data?.user_extended?.title,
    parentOneFirstName: studentAccountDetails?.parent1Data?.firstName,
    parentOneMiddleName: studentAccountDetails?.parent1Data?.middleName,
    parentOneLastName: studentAccountDetails?.parent1Data?.lastName,
    parentOneEmail: studentAccountDetails?.parent1Data?.personalEmail,
    parentOneProfession: studentAccountDetails?.parent1Data?.user_extended?.profession,
    parentOneContact: studentAccountDetails?.parent1Data?.contactNumber,
    parentOneCompany: studentAccountDetails?.parent1Data?.user_extended?.nameOfCompany,
    parentTwoTitle: studentAccountDetails?.parent2Data?.user_extended?.title,
    parentTwoFirstName: studentAccountDetails?.parent2Data?.firstName,
    parentTwoLastName: studentAccountDetails?.parent2Data?.lastName,
    parentTwoMiddleName: studentAccountDetails?.parent2Data?.middleName,
    parentTwoEmail: studentAccountDetails?.parent2Data?.personalEmail,
    parentTwoProfession: studentAccountDetails?.parent2Data?.user_extended?.profession,
    parentTwoContact: studentAccountDetails?.parent2Data?.contactNumber,
    parentTwoCompany: studentAccountDetails?.parent2Data?.user_extended?.nameOfCompany,
    homeAddress: studentAccountDetails?.addressData?.address,
    homeAddressInfo: {
      lat: studentAccountDetails?.addressData?.latitude,
      lng: studentAccountDetails?.addressData?.longitude,
      add: studentAccountDetails?.addressData?.address,
    },
    aptSuite: studentAccountDetails?.addressData?.address?.aptSuite,
    volunteer: studentAccountDetails?.parent1Data?.user_extended?.volunteerChoice || [],
    hearAboutUs: studentAccountDetails?.parent1Data?.user_extended?.recommendedSource || [],
    readTelugu: studentAccountDetails?.parent1Data?.user_extended?.readTelugu,
    speakTelugu: studentAccountDetails?.parent1Data?.user_extended?.speakTelugu,
    changeLog: '',
  });
  const [editStudent, setEditStudent] = useState(false);
  const [editSibling, setEditSibling] = useState(false);

  const [studentInfo, setStudentInfo] = useState({
    studentId: studentAccountDetails?.studentData && studentAccountDetails?.studentData[0]?.length
      ? studentAccountDetails?.studentData[0]?.id : '',
    profileImage: '',
    dateOfBirth: '',
    gender: '',
    selectedTshirtOption: '',
    academicYear: '',
    tShirt: '',
    selectedGrade: '',
    grade: '',
    searchSchool: '',
    selectedClassLevel: '',
    selectedSortedNearestAddress: '',
  });
  const [addedSiblingInfo, setAddedSiblingInfo] = useState(0);
  const [studentFormError, setStudentFormError] = useState(0);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const openEditParent = () => {
    setEditParent(true);
    setEditStudent(false);
    setEditSibling(false);
    setExpandedPanel(1);
  };
  const openEditStudent = () => {
    setEditStudent(true);
    setEditSibling(false);
    setEditParent(false);
    setExpandedPanel(2);
  };
  const openEditSibling = (sibling) => {
    setEditSibling(true);
    setEditStudent(false);
    setEditParent(false);
    setExpandedPanel(sibling);
  };

  const classes = useStyles(style)();

  const setHeaderTitle = (title) => (
    <Grid container spacing={0} justifyContent="space-between">
      <Grid item xs={12}>
        <div className={classes.headerTitle}>{title}</div>
      </Grid>
      <div className={classes.borderBottom} />
    </Grid>
  );
  const makeAccordin = (summaryTitle, detail, panel, edit, openEdit, showRemove = false) => (
    <Accordion
      expanded={expandedPanel === panel}
      onChange={handleAccordionChange(panel)}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Grid
          item
          className={registerClasses.headerContainer}
          xs={12}
        >
          <div>
            <div className={registerClasses.siblingTitle}>{setHeaderTitle(summaryTitle, 0)}</div>
            {showRemove ? (
              <div
                className={registerClasses.removeTitle}
                onClick={() => {
                  setShowAddSibling(false);
                  setAddedSiblingInfo(0);
                }}
              >
                {t('REMOVE')}
              </div>
            ) : ''}
          </div>
        </Grid>
      </AccordionSummary>

      <AccordionDetails>
        <Grid item xs={12}>
          {detail}
          {edit && <DisplayEdit onClick={openEdit} />}
        </Grid>

      </AccordionDetails>
    </Accordion>
  );
  const onUpdateParentProfile = (reqPayload) => {
    setParentLoading(true);
    const parentPayload = {
      parent1: {
        user: {
          firstName: reqPayload?.parentOneFirstName,
          lastName: reqPayload?.parentOneLastName,
          middleName: reqPayload?.parentOneMiddleName,
          contactNumber: reqPayload?.parentOneContact,
          personalEmail: reqPayload?.parentOneEmail,
        },
        userDetails: {
          title: reqPayload?.parentOneTitle,
          profession: reqPayload?.parentOneProfession,
          nameOfCompany: reqPayload?.parentOneCompany,
          readTelugu: reqPayload?.readTelugu,
          speakTelugu: reqPayload?.speakTelugu,
          volunteerChoice: reqPayload?.volunteer,
          recommendedSource: reqPayload?.hearAboutUs,
        },
      },
      parent2: {
        user: {
          firstName: reqPayload?.parentTwoFirstName,
          lastName: reqPayload?.parentTwoLastName,
          middleName: reqPayload?.parentTwoMiddleName,
          contactNumber: reqPayload?.parentTwoContact,
          personalEmail: reqPayload?.parentTwoEmail,
        },
        userDetails: {
          title: reqPayload?.parentTwoTitle,
          profession: reqPayload?.parentTwoProfession,
          nameOfCompany: reqPayload?.parentTwoCompany,
          readTelugu: reqPayload?.readTelugu,
          speakTelugu: reqPayload?.speakTelugu,
          volunteerChoice: reqPayload?.volunteer,
          recommendedSource: reqPayload?.hearAboutUs,
        },
      },
      changeLog: reqPayload?.changeLog,
    };
    const addressPayload = {
      addresses: {
        address: reqPayload?.homeAddress,
        aptSuite: reqPayload?.aptSuite,
        latitude: Number(reqPayload?.homeAddressInfo?.lat),
        longitude: Number(reqPayload?.homeAddressInfo?.lng),
      },
    };
    const payload = {
      parent1: parentPayload.parent1,
      address: addressPayload.addresses,
    };
    const parent2 = Object.values(parentPayload?.parent2?.user);
    const result = parent2?.filter((i) => i !== undefined && i !== '');
    if (result?.length) {
      payload.parent2 = parentPayload.parent2;
    }
    const refreshList = () => {
      const loadRefreshData = () => {
        setEditParent(false);
        setParentLoading(false);
      };
      dispatch(getStudentAccountDetails(loadRefreshData));
    };
    dispatch(updateParentInfoByStudent(payload, refreshList));
  };

  const parentDetail = () => (
    <Grid item justifyContent="flex-start" xs={12}>
      {editParent ? (
        <Grid className={classes.editParentBlock}>
          <EditParent
            setLoading={setParentLoading}
            setParentInfo={setParentInfo}
            parentInfo={parentInfo}
            source="editParent"
            onCancel={() => setEditParent(false)}
            onFormSubmit={onUpdateParentProfile}
            primaryButton={t('SAVE')}
            loading={parentLoading}
            isStudent
            editParentClasses={classes}
          />
        </Grid>
      ) : (
        <DisplayParent parentInfo={parentInfo} />
      )}
    </Grid>
  );

  const onContinueToPayment = (data) => {
    const payload = Object.entries(data).map((s) => ({
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
        aptSuite: '',
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
    dispatch(addSibling({
      students: payload,
      isNewRegistration: false,
      addresses: {
        address: studentAccountDetails?.addressData?.address,
        aptSuite: studentAccountDetails?.addressData?.aptSuite,
        latitude: studentAccountDetails?.addressData?.latitude,
        longitude: studentAccountDetails?.addressData?.longitude,
      },
    }));
    setIsPaymentDialogOpen(true);
  };
  const getPrimaryStudent = () => studentAccountDetails
    ?.studentData?.find((stu) => stu.primaryStudent);
  return (
    <Box className={classes.accordin}>
      {makeAccordin(t('PARENT_INFORMATION'), parentDetail(), 1, !editParent, openEditParent)}
      {getPrimaryStudent() && (
        <>
          {makeAccordin(
            `${getPrimaryStudent()?.studentInfo?.firstName} ${getPrimaryStudent()?.studentInfo?.lastName
            } (${t('PRIMARY_STUDENT')})`,
            editStudent ? (
              <Grid className={classes.editStudentBlock}>
                <DisplayEditStudent
                  accordin={2}
                  selectedStudent={getPrimaryStudent() || studentInfo}
                  editStudent={editStudent}
                  setEditStudent={setEditStudent}
                  setStudentInfo={setStudentInfo}
                  isStudent
                  setSiblingData={setSiblingData}
                  classes={classes}
                  setStudentState={setStudentState}
                />
              </Grid>
            ) : (
              <DisplayStudent
                studentInfo={getPrimaryStudent() || studentInfo}
              />
            ),
            2,
            !editStudent,
            openEditStudent,
          )}
        </>
      )}
      <div className="flow">
        {siblingData?.map((point, index) => (
          <>
            {makeAccordin(
              `${point?.studentInfo?.firstName} ${point?.studentInfo?.lastName} (${t('SIBLING')})`,
              editSibling ? (
                <Grid className={classes.editStudentBlock}>
                  <DisplayEditStudent
                    selectedStudent={point}
                    accordin={index + 3}
                    editStudent={editStudent}
                    setEditSibling={setEditSibling}
                    setStudentInfo={setStudentInfo}
                    isSibling
                    setSiblingData={setSiblingData}
                    classes={classes}
                    setStudentState={setStudentState}
                  />
                </Grid>
              ) : (
                <DisplayStudent studentInfo={point} />
              ),
              index + 3,
              !editSibling,
              () => openEditSibling(index + 3),
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
            onStudentSubmit={(data) => onContinueToPayment(data)}
            editStudentClasses={classes}
          />,
          siblingData.length + 3,
          null,
          null,
          true,
        )}
      <DialogAtom
        isOpen={isPaymentDialogOpen}
        onClose={() => setIsPaymentDialogOpen(false)}
        dialogHeading="Payment Information"
        customClass={classes.paymentDialogAtom}
        content={(
          <AddSiblingPayment
            addSiblingData={addSiblingData}
          />
        )}
        secHandle={() => setIsPaymentDialogOpen(false)}
      />
    </Box>
  );
}
