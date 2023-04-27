import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import profilePic from '../../../assets/images/profileUpload.png';
import useStyles from '../../../custom-hooks/useStyles';
import styles from './style';
import MailIcon from '../../../assets/svg/mailIcon';
import UserIcon from '../../../assets/svg/userIcon';

export default function StudentcardAtom() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  return (
    <Card sx={{ maxWidth: 250 }} className={classes.studentCard}>
      <Grid container className={classes.studentDetails}>
        <Grid item xs={3}>
          <Checkbox />
        </Grid>
        <Grid item xs={6}>
          <CardMedia
            component="img"
            height="120"
            image={profilePic}
            alt="student profile"
            className={classes.studentCardImage}
          />
        </Grid>
        <Grid item xs={2} justifyContent="flex-end">
          <CardHeader
            className={classes.studentCardHeader}
            action={(
              <Grid className={classes.studentCardMenu}>
                <IconButton aria-label="menu" className={classes.studentCardMenuIcon}>
                  <MoreHorizIcon />

                </IconButton>
                <br />
                <IconButton aria-label="mail" className={classes.studentCardMenuIcon}>
                  <MailIcon />
                </IconButton>
                <br />
                <IconButton aria-label="impersonate" className={classes.studentCardMenuIcon}>
                  <UserIcon />
                </IconButton>
              </Grid>

        )}
          />
        </Grid>

      </Grid>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" className={classes.studentName}>
          {t('STUDENT_NAME')}
        </Typography>
        <Grid container className={classes.studentDetails}>
          <Grid item xs={6}>
            <Typography className={classes.studentKeys}>
              {t('PARENT_NAME')}
              {' '}
              {t('CENTER_INFO')}
              {' '}
              {t('CLASS_LEVEL')}
              {' '}
              {t('SECTION')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="text.secondary">
              data
            </Typography>
          </Grid>

        </Grid>

      </CardContent>
    </Card>
  );
}
