import React, { useEffect, useState, memo } from 'react';
import {
  Box,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ParentInfo from './parent-info';
import StudentInfo from './student-info';
import PaymentInfo from './payment-info';
import style from './style';
import useStyles from '../../custom-hooks/useStyles';
import logo from '../../assets/images/logo.png';
import RegisterHeader from './header';
import {
  getTShirts, getAllCourses, getAcademicGrades,
  getLocations,
  getExtraCurricularActivities,
} from '../../store/actions/getStudent';
import { getHearAboutUs, getVolunteers } from '../../store/actions/getParent';
import { removeSpecialChar } from '../../utils/methods';

function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [parentInfo, setParentInfo] = useState(0);
  const [studentInfo, setStudentInfo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState(0);
  const [registerPayload, setRegisterPayload] = useState(0);
  const [studentFormError, setStudentFormError] = useState(0);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getTShirts());
    dispatch(getAllCourses());
    dispatch(getAcademicGrades());
    dispatch(getVolunteers());
    dispatch(getHearAboutUs());
    dispatch(getLocations());
    dispatch(getExtraCurricularActivities());
  }, []);

  useEffect(() => {
    const parentPayload = {
      parent1:
      {
        user: {
          firstName: parentInfo?.parentOneFirstName
           && removeSpecialChar(parentInfo?.parentOneFirstName),
          lastName: parentInfo?.parentOneLastName
          && removeSpecialChar(parentInfo?.parentOneLastName),
          middleName: parentInfo?.parentOneMiddleName,
          contactNumber: parentInfo?.parentOneContact,
          personalEmail: parentInfo?.parentOneEmail,
        },
        userDetails: {
          title: parentInfo?.parentOneTitle,
          profession: parentInfo?.parentOneProfession,
          nameOfCompany: parentInfo?.parentOneCompany,
          readTelugu: parentInfo?.readTelugu,
          speakTelugu: parentInfo?.speakTelugu,
          volunteerChoice: parentInfo?.volunteer,
          recommendedSource: parentInfo?.hearAboutUs,
        },
      },
      parent2:
      {
        user: {
          firstName: parentInfo?.parentTwoFirstName
          && removeSpecialChar(parentInfo?.parentTwoFirstName),
          lastName: parentInfo?.parentTwoLastName
          && removeSpecialChar(parentInfo?.parentTwoLastName),
          middleName: parentInfo?.parentTwoMiddleName,
          contactNumber: parentInfo?.parentTwoContact,
          personalEmail: parentInfo?.parentTwoEmail,
        },
        userDetails: {
          title: parentInfo?.parentTwoTitle,
          profession: parentInfo?.parentTwoProfession,
          nameOfCompany: parentInfo?.parentTwoCompany,
          readTelugu: parentInfo?.readTelugu,
          speakTelugu: parentInfo?.speakTelugu,
          volunteerChoice: parentInfo?.volunteer,
          recommendedSource: parentInfo?.hearAboutUs,
        },
      },
    };
    const addressPayload = {
      addresses: {
        address: parentInfo?.homeAddress,
        aptSuite: parentInfo?.aptSuite,
        latitude: Number(parentInfo?.homeAddressInfo?.lat),
        longitude: Number(parentInfo?.homeAddressInfo?.lng),
      },
    };
    const payload = {
      parent1: parentPayload.parent1,
      // parent2: parentPayload.parent2,
      addresses: addressPayload.addresses,
    };
    const parant2 = Object.values(parentPayload?.parent2?.user);
    const result = parant2?.filter((i) => i !== undefined && i !== '');
    if (result?.length) {
      payload.parent2 = parentPayload.parent2;
    }

    payload.students = Object.entries(studentInfo).map((s) => ({
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
    setRegisterPayload(payload);
  }, [parentInfo, studentInfo]);
  const { t } = useTranslation();
  const classes = useStyles(style)();
  const navigate = useNavigate();

  const steps = [
    `${t('PARENT_INFO')}`,
    `${t('STUDENT_INFO')}`,
    `${t('PAYMENT_INFO')}`,
  ];
  const handleStepper = (index, callback) => {
    if (callback) { callback(); }
    setActiveStep(index);
  };
  const setStep = () => {
    if (activeStep === 0) {
      return (
        <ParentInfo
          {...{
            steps,
            activeStep,
            handleStepper,
            parentInfo,
            setParentInfo,
            setLoading,
            loading,
          }}
        />
      );
    }

    if (activeStep === 1) {
      return (
        <StudentInfo
          {...{
            steps,
            activeStep,
            handleStepper,
            paymentInfo,
            parentInfo,
            studentInfo,
            setStudentInfo,
            registerPayload,
            setLoading,
            loading,
            studentFormError,
            setStudentFormError,
          }}
        />
      );
    }

    return (
      <PaymentInfo
        customClasses={classes}
        {...{
          steps,
          activeStep,
          handleStepper,
          paymentInfo,
          parentInfo,
          studentInfo,
          setPaymentInfo,
          registerPayload,
          setLoading,
          loading,
        }}
      />
    );
  };
  return (
    <div className={classes.divWrapper}>
      <Box className={classes.logo}>
        <img
          src={logo}
          width={380}
          alt="ManaBadi SiliconAndhra Logo"
          className={classes.headerLogo}
          onClick={() => navigate('/')}
        />
      </Box>
      <Box className={classes.header} mt={2}>
        <RegisterHeader
          activeStep={activeStep}
          steps={steps}
          handleStepper={handleStepper}
        />
      </Box>
      {setStep()}
    </div>
  );
}

export default memo(Register);
