import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FormikProvider } from 'formik';
import ButtonAtom from '../../../../components/atoms/button';
import { Buttons } from '../../../../constant';
// import { AntSwitch } from '../../user-manager/helperComponent';
import { AntSwitch, style } from './style';
// import style from './style';
import { PerformantTextField, PerfromantMultiValueDropdown } from '../../../../components/atoms';

function AddCreateCourse({
  formik, setShowAddCourseDialog, showAddCourseDialog, getErrorText, status, setStatus, baseCourse, setBaseCourse, coursesData,
}) {
  const { t } = useTranslation();
  const classes = style();

  return (
    <Box className={classes.gridContainer}>
      <FormikProvider value={formik}>
        <form
          name="createCourse"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3} justifyContent="flex-end">
            <Grid item xs={6}>
              <PerformantTextField
                label={t('COURSE_NAME')}
                id="courseName"
                required
                name="courseName"
                type="text"
                disabled={false}
                value={formik.values.courseName}
                onBlur={formik.handleBlur}
                error={getErrorText('courseName')}
                onChange={formik.handleChange}
                labelId={t('COURSE_NAME')}
              />
            </Grid>
            <Grid item xs={3} alignItems="center">
              <Typography className={classes.switchHeading}>{t('BASE_COURSE')}</Typography>
              <Stack className={classes.switchUi} spacing={1}>
                <Typography className={classes.switchText}>{t('YES')}</Typography>
                <AntSwitch checked={baseCourse} onChange={() => setBaseCourse(!baseCourse)} inputProps={{ 'aria-label': 'ant design' }} />
                <Typography className={baseCourse ? classes.setGreen : ''}>{t('NO')}</Typography>
              </Stack>
              {getErrorText('Status')}
            </Grid>
            <Grid item xs={3}>
              <Typography className={classes.switchHeading}>{t('STATUS')}</Typography>
              <Stack className={classes.switchUi} spacing={1}>
                <Typography className={classes.switchText}>{t('INACTIVE_STATUS')}</Typography>
                <AntSwitch checked={status} onChange={() => setStatus(!status)} inputProps={{ 'aria-label': 'ant design' }} />
                <Typography className={status ? classes.setGreen : ''}>{t('ACTIVE_STATUS')}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <PerformantTextField
                label={t('FEE')}
                id="fee"
                required
                name="fee"
                type="text"
                disabled={false}
                value={formik.values.fee}
                onBlur={formik.handleBlur}
                error={getErrorText('fee')}
                onChange={formik.handleChange}
                labelId={t('FEE')}
              />
            </Grid>
            <Grid item xs={6}>
              <PerformantTextField
                label={t('EXAM_FEE')}
                id="examFee"
                required
                name="examFee"
                type="text"
                disabled={false}
                value={formik.values.examFee}
                onBlur={formik.handleBlur}
                error={getErrorText('examFee')}
                onChange={formik.handleChange}
                labelId={t('EXAM_FEE')}
              />
            </Grid>
            <Grid item xs={6}>
              <PerformantTextField
                label={t('REGISTRATION_FEE')}
                id="registrationFee"
                required
                name="registrationFee"
                type="text"
                disabled={false}
                value={formik.values.registrationFee}
                onBlur={formik.handleBlur}
                error={getErrorText('registrationFee')}
                onChange={formik.handleChange}
                labelId={t('REGISTRATION_FEE')}
              />

            </Grid>
            <Grid item xs={6}>
              <PerformantTextField
                label={t('REPEATING_DISCOUNT')}
                id="repeatingDiscount"
                required
                name="repeatingDiscount"
                type="text"
                disabled={false}
                value={formik.values.repeatingDiscount}
                onBlur={formik.handleBlur}
                error={getErrorText('repeatingDiscount')}
                onChange={formik.handleChange}
                labelId={t('REPEATING_DISCOUNT')}
              />
            </Grid>
            <Grid item xs={6}>
              <PerformantTextField
                label={t('SIBLING_DISCOUNT')}
                id="siblingDiscount"
                required
                name="siblingDiscount"
                type="text"
                disabled={false}
                value={formik.values.siblingDiscount}
                onBlur={formik.handleBlur}
                error={getErrorText('siblingDiscount')}
                onChange={formik.handleChange}
                labelId={t('SIBLING_DISCOUNT')}
              />
            </Grid>
            <Grid item xs={6}>
              <PerfromantMultiValueDropdown
                minWidth="100%"
                label={t('NEXT_POSSIBLE_COURSE')}
                id="nextPossibleCourse"
                name="nextPossibleCourse"
                value={formik.values.nextPossibleCourse}
                onBlur={formik.handleBlur}
                error={getErrorText('nextPossibleCourse')}
                handleChange={formik.handleChange}
                options={coursesData.map((per) => ({
                  id: per.id,
                  name: per.name,
                }))}
                required
                labelId={t('NEXT_POSSIBLE_COURSE')}
              />
              {getErrorText('nextPossibleCourse')}
            </Grid>
            <Grid item flex-end xs={6}>
              <ButtonAtom
                name={t('CANCEL')}
                onClick={() => setShowAddCourseDialog(!showAddCourseDialog)}
                btntype={Buttons.SECONDARY}
                className={classes.inViewLogButton}
              />
              <ButtonAtom
                name={t('SAVE')}
                onClick={formik.handleSubmit}
                btntype={Buttons.PRIMARY}
                className={classes.inViewLogButton}
              />
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </Box>

  );
}
export default AddCreateCourse;
