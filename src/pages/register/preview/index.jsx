import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box, Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Buttons } from '../../../constant';
import styles, { responsive } from './style';
import useStyles from '../../../custom-hooks/useStyles';
import ButtonAtom from '../../../components/atoms/button';
// import style from './style';
import { getNewFormattedDate } from '../../../utils/methods';
import { EditIcon } from '../../../assets/svg';

export default function PreviewRegister({
  parentInfo, studentInfo,
  navigateToPannel,
}) {
  const { t } = useTranslation();
  const registerClasses = useStyles(styles)();

  const classes = useStyles(styles)();
  const setTitle = (title, button) => (
    <Grid item container justifyContent="flex-start" className={classes.prevHeading}>
      <Grid item xs={8}>
        {title}
      </Grid>
      <Grid item xs={4}>
        {button}
      </Grid>
    </Grid>
  );

  const setHeaderTitle = (title, panel) => (
    <Grid container spacing={0} justifyContent="space-between">
      <Grid item xs={8}>
        <div className={classes.headerTitle}>
          {title}
        </div>
      </Grid>
      <Grid item xs={4}>
        <ButtonAtom
          btntype={Buttons.ICON}
          className={classes.editButton}
          name={t('EDIT')}
          icon={<EditIcon />}
          onClick={() => navigateToPannel(panel)}
        />
      </Grid>
      <div className={classes.borderBottom} />
    </Grid>
  );

  const setData = (key, value, optional) => (
    <Grid container spacing={0} className={classes.dataPadding}>
      <Grid item xs={4.5} className={classes.label}>
        {key}
        {optional ? null : '*'}
      </Grid>
      <Grid item xs={7.5} className={classes.value}>
        <span className={classes.collon}> :  </span>
        <span className={classes.previewValue}>
          {`${value}`}
        </span>
      </Grid>
    </Grid>
  );

  const parentCard = (
    heading,
    title,
    firstName,
    middleName,
    lastName,
    email,
    contactNo,
    profession,
    company,
    button,
  ) => (
    <div>
      {setTitle(heading, button)}
      <Grid item xs={12}>
        {title && setData(t('TITLE'), title)}
      </Grid>
      <Grid item xs={12}>
        {firstName && setData(t('FIRST_NAME'), firstName)}
      </Grid>
      <Grid item xs={12}>
        {middleName && setData(t('MIDDLE_NAME'), middleName, true)}
      </Grid>
      <Grid item xs={12}>
        {lastName && setData(t('LAST_NAME'), lastName)}
      </Grid>
      <Grid item xs={12}>
        {email && setData(t('EMAIL'), email)}
      </Grid>
      <Grid item xs={12}>
        {contactNo && setData(t('CONTACT_NO'), formatPhoneNumberIntl(contactNo))}
      </Grid>
      <Grid item xs={12}>
        {profession && setData(t('PROFESSION'), profession)}
      </Grid>
      <Grid item xs={12}>
        {company && setData(t('NAME_OF_COMPANY'), company)}
      </Grid>
    </div>
  );

  const additionalInfoLeft = () => (
    <>
      <Grid item xs={12}>
        {setData(t('HOMEADDRESS'), parentInfo?.homeAddress)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('APISUITE'), parentInfo?.aptSuite, true)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('SPEAK_TELGU'), parentInfo?.speakTelugu ? t('YES') : t('NO'), true)}
      </Grid>
    </>
  );
  const hearAboutUs = parentInfo?.selectedHearAboutOptions?.map((i) => i.name);
  function getVolunteer() {
    return parentInfo?.volunteer.join(', ');
  }
  const getHearAboutUs = () => hearAboutUs?.join(', ');
  const additionalInfoRight = () => (
    <>
      <div className={classes.additionalInfo}>
        <Grid item xs={12}>
          {setData(t('VOLUNTEER_FOR'), getVolunteer())}
        </Grid>
      </div>
      <div className={classes.additionalInfo}>
        <Grid item xs={12}>
          {setData(t('HEARABOUT'), getHearAboutUs())}
        </Grid>
      </div>
      <Grid item xs={12}>
        {setData(t('READ_TELGU'), parentInfo?.readTelugu ? t('YES') : t('NO'), true)}
      </Grid>
    </>
  );
  const getExtraActivities = (student) => {
    const actitvites = student?.selectedExtraCurricularActivities
      ?.map((i) => i?.name);
    return actitvites?.join(', ');
  };

  const studentCard = (student) => (
    <Grid item xs={6} className={classes.studentCard}>
      <Grid item xs={12} className={classes.image}>
        <img alt="profile-img" src={student?.profileImage} className={classes.profileImg} />
      </Grid>
      <Grid item xs={12}>
        {setData(t('FIRST_NAME'), student?.firstName)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('MIDDLE_NAME'), student?.middleName, true)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('LAST_NAME'), student?.lastName)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('DOB'), getNewFormattedDate(student?.dateOfBirth))}
      </Grid>
      <Grid item xs={12}>
        {setData(t('GENDER'), student?.gender)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('TSHIRT'), (student?.selectedTshirtOption?.name || student?.tShirt?.name))}
      </Grid>
      <Grid item xs={12}>
        {setData(t('ACADEMICYEAR'), student?.academicYear || '')}
      </Grid>
      <Grid item xs={12}>
        {setData(t('ACA_GRADE'), (student?.selectedGrade?.name || student?.grade?.name))}
      </Grid>
      <Grid item xs={12}>
        {setData(t('ACADEMIC_SCHOOL'), student?.searchSchool)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('CLASSLEVEL'), student?.selectedClassLevel?.name)}
      </Grid>
      <Grid item xs={12}>
        {setData(t('EXTRA_ACTIVITIES'), getExtraActivities(student))}
      </Grid>
      <Grid item xs={12}>
        {setData(t('MANABADI_LOCATION'), student?.selectedSortedNearestAddress)}
      </Grid>
    </Grid>
  );
  return (
    <Box className={classes.mainContainer}>
      <Grid container className={registerClasses.headerContainer} justifyContent="space-between">
        {setHeaderTitle(t('PARENT_INFORMATION'), 0)}
      </Grid>
      <Grid container justifyContent="flex-start" item xs={12} direction="row">
        <Grid item xs={12} sm={6} className={classes.parentContainer}>
          {parentCard(
            t('PARENT_ONE'),
            parentInfo?.parentOneTitle,
            parentInfo?.parentOneFirstName,
            parentInfo?.parentOneMiddleName,
            parentInfo?.parentOneLastName,
            parentInfo?.parentOneEmail,
            parentInfo?.parentOneContact,
            parentInfo?.parentOneProfession,
            parentInfo?.parentOneCompany,
          )}
        </Grid>
        <Grid item xs={12} sm={6} className={classes.innerContainer}>
          {parentCard(
            parentInfo?.parentTwoTitle ? t('PARENT_TWO') : '',
            parentInfo?.parentTwoTitle,
            parentInfo?.parentTwoFirstName,
            parentInfo?.parentTwoMiddleName,
            parentInfo?.parentTwoLastName,
            parentInfo?.parentTwoEmail,
            parentInfo?.parentTwoContact,
            parentInfo?.parentTwoProfession,
            parentInfo?.parentTwoCompany,
          )}
        </Grid>
        {/* Additional Info  */}
        {setTitle(t('ADDITIONAL_INFO'))}
        <Grid item xs={12} sm={6} className={classes.Container}>
          {additionalInfoLeft()}
        </Grid>

        <Grid item xs={12} sm={6} className={classes.innerContainer}>
          {additionalInfoRight()}
        </Grid>
      </Grid>
      {/* student Info  */}
      <Grid item className={registerClasses.headerContainer} xs={12} justifyContent="space-between">
        {setHeaderTitle(t('STUDENT_INFORMATION'), 1)}
      </Grid>
      <Grid item xs={12} sm={6} className={classes.carousel}>
        <Carousel
          deviceType="desktop"
          responsive={responsive}
          itemClass="image-item"
          showDots={false}
          ssr // means to render carousel on server-side.
          autoPlay={false}
          autoPlaySpeed={100000}
          keyBoardControl
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          arrows
          navButtonsAlwaysInvisible={false}
          NextIcon={<ArrowForwardIosIcon className={classes.arrowForwardIcon} />}
          PrevIcon={<ArrowBackIosIcon />}
          swipeable={false}
          draggable={false}
        >
          {studentInfo && Object.keys(studentInfo).map((key) => (
            <>
              <div className={classes.studentCardLabel}>
                {`${studentInfo[key]?.firstName} ${studentInfo[key]?.middleName} ${studentInfo[key]?.lastName}`}
              </div>
              <p>{studentCard(studentInfo[key])}</p>
            </>
          ))}
        </Carousel>
      </Grid>
    </Box>
  );
}
