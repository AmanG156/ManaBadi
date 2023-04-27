import React, { useState } from 'react';
import CardMedia from '@mui/material/CardMedia';
import {
  Divider, Grid, Typography, Box, Link,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from 'moment';

import useStyles from '../../../custom-hooks/useStyles';
import style from './style';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import DialogAtom from '../../../components/atoms/dialog';
import MapPinIcon from '../../../assets/svg/mapPin';
import GmailIcon from '../../../assets/images/gmailIcon.png';
import { newDOB, getDistanceBetweenTwoPoint } from '../../../utils/methods';
import { getLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';

function displayValue(key, value, classes) {
  return (
    <Grid container spacing="2" className={classes.container}>
      <Grid item xs={5} className={classes.label}>
        {key}
      </Grid>
      <Grid item xs={6} className={classes.value}>
        :
        &nbsp;
        &nbsp;
        {value}
      </Grid>
    </Grid>
  );
}
function displayButton(name, onClick, classes) {
  return (
    <ButtonAtom
      btntype={Buttons.PRIMARY}
      className={classes.actionBtn}
      name={name}
      onClick={onClick}
    />
  );
}
function LocationDialogContent({
  classes, studentDetials, addressData,
}) {
  const { t } = useTranslation('translation');
  const getLocationDistance = () => {
    const distance = getDistanceBetweenTwoPoint(
      { lat: addressData?.latitude, lng: addressData?.longitude },
      {
        lat: studentDetials?.enrolled_courses?.location?.locationAddress?.latitude,
        lng: studentDetials?.enrolled_courses?.location?.locationAddress?.longitude,
      },
    );
    const miles = distance ? distance / 1609.34 : 0;
    return miles.toFixed(2);
  };
  const getFormatTime = (time) => moment(time, 'hh:mm a').format('hh:mm a');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={11.5}>
          <Grid container className={classes.locationInfo} direction="row" spacing={2}>
            <Grid item xs={9} className={classes.locationInfoKeys}>
              <MapPinIcon />
              <b>{studentDetials?.enrolled_courses?.location?.name}</b>
            </Grid>
            <Grid item xs={3} style={{ color: '#979797' }} textAlign="right">
              <b>
                {getLocationDistance()}
                {' '}
                miles
              </b>
            </Grid>
          </Grid>

          <Grid item xs={12} className={classes.locationInfoDetail}>
            <div>{studentDetials?.enrolled_courses?.location?.locationAddress?.address}</div>
            <Grid item className={classes.locationInfoKeys}>
              <AccessTimeIcon />
              <b>Class Timing:  </b>
              &nbsp;
              {studentDetials?.enrolled_courses?.location?.classTiming}
              {' '}
              {getFormatTime(studentDetials?.enrolled_courses?.location?.startTime)}
              {' '}
              -
              {' '}
              {getFormatTime(studentDetials?.enrolled_courses?.location?.endTime)}
            </Grid>
          </Grid>
        </Grid>

        <div className={classes.footerBottom} />
        <Grid item xs={12} lg={6}>
          <b>
            {t('TEACHER')}
            :
          </b>
          <br />
          <div>
            Anupama Dadani
            <br />
            +1 234 889 8888
            <br />
            anupama.dadani@test.mb.siliconandhra.org
          </div>
        </Grid>
        <Grid item xs={12} lg={6}>
          <b>
            {t('COORDINATOR')}
            :
          </b>
          <br />
          <div>
            {studentDetials?.enrolled_courses?.location?.location_coordinators[0].user?.firstName}
            {' '}
            {studentDetials?.enrolled_courses?.location?.location_coordinators[0].user?.middleName}
            {' '}
            {studentDetials?.enrolled_courses?.location?.location_coordinators[0].user?.lastName}
            <br />
            {studentDetials?.enrolled_courses?.location?.location_coordinators[0].user?.contactNum}
            <br />
            {studentDetials?.enrolled_courses?.location?.location_coordinators[0].user?.manabadiEm}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
function DriveDialogContent({
  classes,
}) {
  // const { t } = useTranslation('translation');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.driveInfo} direction="row">
          Drive Data
        </Grid>
      </Grid>
    </Box>
  );
}
// const getPrimaryStudent = (studentAccountDetails) => studentAccountDetails?.studentInfo?.find((stu) => stu.primaryStudent);

const getGmailLink = (email, isPassive) => `https://accounts.google.com/ServiceLogin?service=mail&passive=${isPassive}&Email=${email}&continue=https://mail.google.com/mail/u/${email}`;
const getGoogleClassroom = (email, isPassive) => `https://accounts.google.com/ServiceLogin?service=mail&passive=${isPassive}&Email=${email}&continue=https://classroom.google.com/mail/u/${email}`;
function GmailDialogContent({
  classes, setIsGmailDialogOpen, studentDetials,
}) {
  const { t } = useTranslation('translation');
  const myGmail = getGmailLink(studentDetials?.studentInfo?.manabadiEmail, studentDetials?.primaryStudent);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.gmailInfo} direction="row">
          <img src={GmailIcon} alt="" style={{ cursor: 'pointer', textAlign: 'center' }} />
          <h3>{t('LOGIN_TO_GMAIL')}</h3>
          <Grid container>
            <Grid item xs={6}>
              <ButtonAtom
                btntype={Buttons.SECONDARY}
                className={classes.gmailBtn}
                name={t('CANCEL')}
                onClick={() => setIsGmailDialogOpen(false)}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href={myGmail} target="_blank">
                <ButtonAtom
                  btntype={Buttons.PRIMARY}
                  className={classes.gmailBtn}
                  name={t('CONTINUE')}
                  onClick={() => setIsGmailDialogOpen(false)}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
function GoogleClassroomDialogContent({
  classes, isGoogleClassroomDialogOpen, studentDetials,
}) {
  const { t } = useTranslation('translation');
  const googleClassRoom = getGoogleClassroom(studentDetials?.studentInfo?.manabadiEmail, studentDetials?.primaryStudent);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} className={classes.googleClassroomInfo} direction="row">
          <h3>{t('GOOGLE_CLASSROOM')}</h3>
          <Grid container>
            <Grid item xs={6}>
              <ButtonAtom
                btntype={Buttons.SECONDARY}
                className={classes.gmailBtn}
                name={t('CANCEL')}
                onClick={() => isGoogleClassroomDialogOpen(false)}
              />
            </Grid>
            <Grid item xs={6}>
              <Link href={googleClassRoom} target="_blank">
                <ButtonAtom
                  btntype={Buttons.PRIMARY}
                  className={classes.gmailBtn}
                  name={t('CONTINUE')}
                  onClick={() => isGoogleClassroomDialogOpen(false)}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

const openGoogleClassroom = (studentDetials) => {
  const myClassRoomLink = getGoogleClassroom(studentDetials?.studentInfo?.manabadiEmail, studentDetials?.primaryStudent);
  window.open(myClassRoomLink, '_blank');
};

export default function StudentCard({ studentDetials, addressData }) {
  const { t } = useTranslation();
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [isGmailDialogOpen, setIsGmailDialogOpen] = useState(false);
  const [isDriveDialogOpen, setIsDriveDialogOpen] = useState(false);
  const [isGoogleClassroomDialogOpen, setIsGoogleClassroomDialogOpen] = useState(false);
  const classes = useStyles(style)();
  const userRole = getLocalStorage('userRole');
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.imgContainer} spacing={2}>
          <Grid item xs={12} sm={4}>
            <CardMedia
              className={classes.profileImg}
              component="img"
              image={`${studentDetials?.studentInfo?.profilePhoto}?${Date.now()}`}
              alt="profile-img"
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography gutterBottom variant="h5" component="div" className={classes.studentName}>
              {`${studentDetials?.studentInfo?.firstName} ${studentDetials?.studentInfo?.middleName} ${studentDetials?.studentInfo?.lastName}`}
            </Typography>
            {displayValue(t('DOB'), `${newDOB(studentDetials?.dateOfBirth)}`, classes)}
            {displayValue(t('GENDER'), `${studentDetials?.studentInfo?.gender}`, classes)}
            {displayValue(t('TSHIRT'), `${studentDetials?.enrolled_courses?.tShirtSize}`, classes)}
            {displayValue(t('COURSE_SECTION'), `${studentDetials?.enrolled_courses?.courseName} (${studentDetials?.enrolled_courses?.google_class?.section})`, classes)}
          </Grid>
        </Grid>
        <Grid item className={classes.manabadiInfo}>
          <div>
            <b>{t('MANABADI_ID')}</b>
            <br />
            <span className={classes.label}>
              {studentDetials?.studentInfo?.manabadiEmail}
            </span>
          </div>
          <br />
          <div>
            <b>{t('EXTRACURRICULARS')}</b>
            {': '}
            <span className={classes.label}>
              {studentDetials?.enrolled_courses?.extraCurricularActivities?.join(', ')}
            </span>
          </div>
        </Grid>

        <Divider />
        <Grid container spacing={1} className={classes.btn}>
          {userRole === userRoles.STUDENT && (
            <Grid item xs={3} sm={2} md={4} sx={{ textAlignLast: 'center' }}>
              {displayButton(t('GMAIL'), setIsGmailDialogOpen, classes)}
            </Grid>
          )}
          <Grid item xs={6} sm={3} md={4} sx={{ textAlignLast: 'center' }}>
            {displayButton(t('LOCATION_INFO'), setIsLocationDialogOpen, classes)}
          </Grid>
          <Grid item xs={3} sm={3} md={4} sx={{ textAlignLast: 'center' }}>
            {displayButton(t('RESOURCES'), setIsDriveDialogOpen, classes)}
          </Grid>
          {userRole === userRoles.STUDENT && (
            <Grid
              item
              xs={11.85}
              sm={4}
              md={11.85}
              sx={{ textAlign: 'center' }}
            >
              <ButtonAtom
                btntype={Buttons.PRIMARY}
                className={classes.googleClassroomBtn}
                onClick={() => openGoogleClassroom(studentDetials)}
                name={t('GOOGLE_CLASSROOM')}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <DialogAtom
        isOpen={isLocationDialogOpen}
        dialogHeading={t('LOCATION_INFO')}
        customClass={classes.locationDialogAtom}
        content={(
          <LocationDialogContent
            classes={classes}
            studentDetials={studentDetials}
            addressData={addressData}
          />
        )}
        secHandle={() => setIsLocationDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isDriveDialogOpen}
        dialogHeading={t('RESOURCES')}
        customClass={classes.driveDialogAtom}
        content={(
          <DriveDialogContent
            classes={classes}
          />
        )}
        secHandle={() => setIsDriveDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isGmailDialogOpen}
        dialogHeading={t('GMAIL')}
        customClass={classes.gmailDialogAtom}
        content={(
          <GmailDialogContent
            classes={classes}
            setIsGmailDialogOpen={setIsGmailDialogOpen}
            studentDetials={studentDetials}
          />
        )}
        secHandle={() => setIsGmailDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isGoogleClassroomDialogOpen}
        dialogHeading={t('GOOGLE_CLASSROOM')}
        customClass={classes.googleClassroomDialogAtom}
        content={(
          <GoogleClassroomDialogContent
            classes={classes}
            isGoogleClassroomDialogOpen={setIsGoogleClassroomDialogOpen}
            studentDetials={studentDetials}
          />
        )}
        secHandle={() => setIsGoogleClassroomDialogOpen(false)}
      />
    </Grid>

  );
}
