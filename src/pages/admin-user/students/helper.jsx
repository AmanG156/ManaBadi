import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import {
  Grid,
} from '@mui/material';
import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
import commonStyle from '../../../utils/commonClasses';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';

export const DrawerWidth = 240;

export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DrawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DrawerWidth}px)`,
    marginLeft: `${DrawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export const getStudentObj = (student) => ({
  studentId: student?.id,
  studentName: `${student?.studentInfo?.firstName} ${student?.studentInfo?.lastName}`,
  acedemicYear: student?.enrolled_courses?.academicYear,
  courseFrom: student?.enrolled_courses?.course?.name,
  courseTo: student?.enrolled_courses?.course?.id,
  locationFrom: student?.enrolled_courses?.location?.name,
  locationTo: student?.enrolled_courses?.location?.id,
  sectionFrom: student?.enrolled_courses?.google_class?.section,
  sectionTo: student?.enrolled_courses?.course?.id && student?.enrolled_courses?.location?.id ? student?.enrolled_courses?.google_class?.id : '',
  changeLogs: '',
  profileImage: student?.studentInfo?.profilePhoto,
  firstName: student?.studentInfo?.firstName,
  middleName: student?.studentInfo?.middleName,
  lastName: student?.studentInfo?.lastName,
  selectedClassLevel: student?.enrolled_courses?.courseName,
  dateOfBirth: student?.dateOfBirth,
  gender: student?.studentInfo?.gender,
  tShirt: student?.enrolled_courses?.tShirtSize,
  grade: student?.enrolled_courses?.academicGrade,
  searchSchool: student?.enrolled_courses?.address?.address,
  sortedNearest: student?.enrolled_courses?.location?.name,
  academicSchool: student?.enrolled_courses?.address,
  extraCurricularActivities: student?.enrolled_courses?.extraCurricularActivities,
});

export const getCancelEnrollStudentObj = (student) => {
  const courses = student.enrolled_courses?.academicYear ? student.enrolled_courses : student.enrolled_courses[0];
  const paypalSaleId = student.enrolled_courses?.paymentInfoId;
  return ({
    studentId: student?.id,
    studentName: `${student?.studentInfo?.firstName} ${student?.studentInfo?.lastName}`,
    acedemicYear: student?.enrolled_courses?.academicYear,
    course: student?.enrolled_courses?.course?.name,
    location: student?.enrolled_courses?.location?.name,
    enrolled_courses: courses,
    paypalSaleId,
    changeLogs: '',
  });
};
export const getParentInfoObj = (selectedRow) => ({
  parentOneTitle: _.get(selectedRow, 'parent1Info.user_extended.title', ''),
  parentOneFirstName: _.get(selectedRow, 'parent1Info.firstName', ''),
  parentOneMiddleName: _.get(selectedRow, 'parent1Info.middleName', ''),
  parentOneLastName: _.get(selectedRow, 'parent1Info.lastName', ''),
  parentOneEmail: _.get(selectedRow, 'parent1Info.personalEmail', ''),
  parentOneProfession: _.get(selectedRow, 'parent1Info.user_extended.profession', ''),
  parentOneContact: _.get(selectedRow, 'parent1Info.contactNumber', ''),
  parentOneCompany: _.get(selectedRow, 'parent1Info.user_extended.nameOfCompany', ''),
  parentTwoTitle: _.get(selectedRow, 'parent2Info.user_extended.title', '') || '',
  parentTwoFirstName: _.get(selectedRow, 'parent2Info.firstName', '') || '',
  parentTwoLastName: _.get(selectedRow, 'parent2Info.lastName', '') || '',
  parentTwoMiddleName: _.get(selectedRow, 'parent2Info.middleName', '') || '',
  parentTwoEmail: _.get(selectedRow, 'parent2Info.personalEmail', '') || '',
  parentTwoProfession: _.get(selectedRow, 'parent2Info.user_extended.profession', '') || '',
  parentTwoContact: _.get(selectedRow, 'parent2Info.contactNumber', '') || '',
  parentTwoCompany: _.get(selectedRow, 'parent2Info.user_extended.nameOfCompany', '') || '',
  homeAddress: _.get(selectedRow, 'parent1Info.address.address', ''),
  aptSuite: _.get(selectedRow, 'parent1Info.address.aptSuite', ''),
  volunteer: _.get(selectedRow, 'parent1Info.user_extended.volunteerChoice', []),
  hearAboutUs: _.get(selectedRow, 'parent1Info.user_extended.recommendedSource', []),
  readTelugu: _.get(selectedRow, 'parent1Info.user_extended.readTelugu', ''),
  speakTelugu: _.get(selectedRow, 'parent1Info.user_extended.speakTelugu', ''),
  changeLog: '',
  homeAddressInfo: {
    lat: _.get(selectedRow, 'parent1Info.address.latitude', ''),
    lng: _.get(selectedRow, 'parent1Info.address.longitude', ''),
    add: _.get(selectedRow, 'parent1Info.address.address', ''),
  },
});

export const getParentPayload = (reqPayload, hearOptSelected) => ({
  parent1:
    {
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
        recommendedSource: hearOptSelected,
      },
    },
  parent2:
    {
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
        recommendedSource: hearOptSelected,
      },
    },
  changeLog: reqPayload?.changeLog,
});

export const parentInfoInitialValues = () => ({
  parentOneTitle: '',
  parentOneFirstName: '',
  parentOneMiddleName: '',
  parentOneLastName: '',
  parentOneEmail: '',
  parentOneProfession: '',
  parentOneContact: '',
  parentOneCompany: '',
  parentTwoTitle: '',
  parentTwoFirstName: '',
  parentTwoLastName: '',
  parentTwoMiddleName: '',
  parentTwoEmail: '',
  parentTwoProfession: '',
  parentTwoContact: '',
  parentTwoCompany: '',
  homeAddress: '',
  aptSuite: '',
  volunteer: [],
  hearAboutUs: [],
  readTelugu: false,
  speakTelugu: false,
  changeLog: '',
});

export function PaymentDialogContent({
  classes, stuPaymentInfo,
}) {
  const { t } = useTranslation('translation');
  return (
    <Grid container className={classes.PaymentContent}>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.paymentInfoKeys}>
          <Grid item className={classes.paymentInfoKey}>
            {`${t('STUDENT_NAME')}`}
          </Grid>
          <Grid item className={`${classes.paymentInfoValue} ${classes.value}`} xs={6}>
            &nbsp;
            :
            &nbsp;
            &nbsp;
            {`${_.get(stuPaymentInfo, 'student.studentInfo.first_name', '')} ${_.get(stuPaymentInfo, 'student.studentInfo.last_name', '')}`}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.paymentInfoKeys}>
          <Grid item className={classes.paymentInfoKey}>
            {`${t('ACADEMICYEAR')}`}
          </Grid>
          <Grid item className={`${classes.paymentInfoValue} ${classes.value}`} xs={6}>
            &nbsp;
            :
            &nbsp;
            &nbsp;
            {_.get(stuPaymentInfo, 'academic_year', '')}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.paymentInfoKeys}>
          <Grid item className={classes.paymentInfoKey}>
            {`${t('LOCATION')}`}
          </Grid>
          <Grid item className={`${classes.paymentInfoValue} ${classes.value}`} xs={6}>
            &nbsp;
            :
            &nbsp;
            &nbsp;
            {_.get(stuPaymentInfo, 'location.name', '')}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={0}>
            <Grid item md={6} className={classes.paymentInfoKeys}>
              <Grid item className={classes.paymentInfoKey}>
                {`${t('PAYPAL_SALE_ID')}`}
              </Grid>
              <Grid item className={`${classes.paymentInfoValue} ${classes.value}`} xs={6}>
                &nbsp;
                :
                &nbsp;
                &nbsp;
                {_.get(stuPaymentInfo, 'payment_info.order_id', '')}
              </Grid>
            </Grid>
            <Grid item md={6} className={`${classes.paymentInfoKeys}`}>
              <Grid container spacing={0}>
                <Grid item className={classes.paymentInfoKey}>
                  {t('PAYMENT_ID')}
                </Grid>
                <Grid item className={`${classes.paymentInfoValue} ${classes.value} ${classes.paymentId}`} xs={6}>
                  &nbsp;
                  :
                  &nbsp;
                  &nbsp;
                  {_.get(stuPaymentInfo, 'payment_info.id', '')}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid container justifyContent="flex-end" className={classes.totalDiscount}>
          <Grid item xs={12} lg={4} className={classes.totalInfoKeys}>
            <Grid item className={classes.totalInfoKey} xs={10}>
              {t('TOTAL_DISCOUNT')}
              &nbsp;
              &nbsp;
              :
            </Grid>
            <Grid item className={classes.totalInfoValue} xs={2}>
              $
              {Number(_.get(stuPaymentInfo, 'discount', 0)).toFixed(2)}
            </Grid>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" className={`${classes.totalDiscount} ${classes.totalPayment}`}>
          <Grid item xs={12} lg={4} className={classes.totalInfoKeys}>
            <Grid item className={`${classes.totalInfoKey} ${classes.amountMargin}`} xs={10}>
              {t('TOTAL_AMOUNT')}
              &nbsp;
              &nbsp;
              :
            </Grid>
            <Grid item className={classes.totalInfoValue} xs={2}>
              $
              {Number(_.get(stuPaymentInfo, 'total_fee', 0)).toFixed(2)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export function SwapCourseDialogFooter({
  classes, isCancelEnroll, customForm,
  t, secHandle, primaryHandle, viewLogs,
  disable,
}) {
  const isAccept = customForm?.values?.isAccept;
  const commonClasses = useStyles(commonStyle)();
  const userRole = getLocalStorage('userRole');
  const checkCancellEnrolStudent = () => {
    if (isCancelEnroll) {
      return disable || !isAccept;
    }
    return isAccept;
  };
  return (
    <Grid container className={`${classes.dialogButtons} ${classes.swapFooterBtn}`}>
      <Grid item xs={4} className={classes.viewLogs}>
        {(userRole === userRoles.SUPER_ADMIN)
                && (
                <>
                  <FindInPageOutlinedIcon style={{ height: 16 }} />
                  <div
                    onClick={() => viewLogs(secHandle)}
                  >
                    {t('VIEW_LOGS')}
                  </div>

                </>
                )}
      </Grid>
      <Grid item xs={8} className={classes.button} justifyContent="flex-end" display="flex">
        <ButtonAtom
          name={t('CANCEL')}
          onClick={secHandle}
          btntype={Buttons.SECONDARY}
        />
        <ButtonAtom
          name={isCancelEnroll ? t('CANCEL_ENROLLMENT') : t('MOVE_STUDENT')}
          onClick={() => primaryHandle()}
          btntype={Buttons.PRIMARY}
          disabled={checkCancellEnrolStudent()}
          className={checkCancellEnrolStudent() ? commonClasses.disabledButton : commonClasses.activeButton}
        />
      </Grid>

    </Grid>
  );
}
