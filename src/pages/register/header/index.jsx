import React, { memo } from 'react';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import GroupUser from '../../../assets/images/Parent_icon.png';
import ReadUser from '../../../assets/images/student_icon.png';
import Dollar from '../../../assets/images/payment_icon.png';
import Completed from '../../../assets/images/completed.png';
import styles, { ColorlibStepIconRoot, ColorlibConnector } from './style';
import useStyles from '../../../custom-hooks/useStyles';

const ColorLibStepIcon = memo((props) => {
  const {
    active, completed, className, icon,
  } = props;

  const classes = useStyles(styles)();
  const icons = {
    1: <img className={completed ? classes.completed : classes.icon} src={completed ? Completed : GroupUser} alt="" />,
    2: <img className={completed ? classes.completed : classes.icon} src={completed ? Completed : ReadUser} alt="" />,
    3: <img className={classes.icon} src={Dollar} alt="" />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
});

function CustomizedSteppers(props) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const {
    activeStep, steps,
  } = props;
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Grid container item xs={12} lg={12} md={12} flexDirection="row" display="flex" className={classes.wrapper}>
        <Grid item lg={6} xl={8} md={6} xs={12} className={classes.mainHeaderTitle}>
          {t('REGISTRATION')}
          <div className={classes.mainHeaderDesc}>
            {t('REGISTRATION_INFO')}
          </div>
        </Grid>
        <Grid item lg={6} xl={4} md={6} xs={12}>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorLibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Stack>
  );
}

export default memo(CustomizedSteppers);
