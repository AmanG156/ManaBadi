import React, { useState, useEffect } from 'react';
import {
  Box, Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { DialogAtom, Button, Loader } from '../../../components/atoms';
import {
  checkDateValid,
} from '../../../utils/methods';
import { Buttons } from '../../../constant';
import useStyles from '../../../custom-hooks/useStyles';
// eslint-disable-next-line import/no-named-as-default
import styles from './style';
import style from '../style';
import commonStyle from '../../../utils/commonClasses';
import {
  studentInitialValues, studentInitialErrors,
} from './constants';
import PreviewRegister from '../preview/index';
import { postFeeStructure } from '../../../store/actions/getPayment';
import AddStudent from './addStudent';

export default function StudentInfo({
  handleStepper, loading, setLoading,
  setStudentInfo, studentInfo, parentInfo, registerPayload, source, multiple = false, onStudentSubmit, editStudentClasses, setStudentFormError, studentFormError,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const commonClasses = useStyles(commonStyle)();
  const [isPreviewDialog, setPreviewDialog] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(source === 'editStudent' && multiple ? 1 : 0);
  const classes = useStyles(styles)();
  const registerClasses = editStudentClasses || useStyles(style)();
  const initialValues = { ...studentInitialValues };
  const initialErrors = { ...studentInitialErrors };
  const [studentError, setStudentError] = useState(studentFormError || {
    s1: initialErrors,
  });
  const [studentForm, setStudentForm] = useState(studentInfo || {
    s1: initialValues,
  });

  useEffect(() => {
    setStudentInfo(studentForm);
  }, [studentForm]);
  useEffect(() => {
    setStudentFormError(studentError);
  }, [studentError]);
  const updateError = (sForm) => {
    const lStudentError = { ...studentError };
    Object.keys(sForm).forEach((sKey) => {
      Object.keys(sForm[sKey]).forEach((fieldKey) => {
        if (fieldKey === 'studentSchoolInfo') return;
        if (!['middleName', 'extraCurricularActivities'].includes(fieldKey) && !_.get(sForm, `${sKey}.${fieldKey}`, '')) {
          lStudentError[sKey] = {
            ...lStudentError[sKey],
            [fieldKey]: t(`${fieldKey.toUpperCase()}_REQUIRED`),
          };
        } else if (fieldKey === 'extraCurricularActivities' && !_.get(sForm, `${sKey}.${fieldKey}`, []).length) {
          lStudentError[sKey] = {
            ...lStudentError[sKey],
            [fieldKey]: t(`${fieldKey.toUpperCase()}_REQUIRED`),
          };
        } else if (fieldKey === 'dateOfBirth' && !checkDateValid(sForm[sKey][fieldKey])) {
          lStudentError[sKey] = {
            ...lStudentError[sKey],
            [fieldKey]: t('INVALID_DATE'),
          };
        } else if (fieldKey === 'firstName'
          && (studentForm[sKey][fieldKey])?.length <= 1
        ) {
          const lcStudentError = { ...studentError };
          lcStudentError[sKey] = {
            ...lcStudentError[sKey],
            [fieldKey]: t('FIRSTNAME_MIN'),
          };
          setStudentError(lcStudentError);
        } else if (fieldKey === 'lastName'
          && (studentForm[sKey][fieldKey])?.length <= 1
        ) {
          const lcStudentError = { ...studentError };
          lcStudentError[sKey] = {
            ...lcStudentError[sKey],
            [fieldKey]: t('LASTNAME_MIN'),
          };
          setStudentError(lcStudentError);
        } else {
          lStudentError[sKey] = {
            ...lStudentError[sKey],
            [fieldKey]: '',
          };
        }
      });
    });
    setStudentError({ ...lStudentError });
    return lStudentError;
  };

  const isFormValid = (studentErr) => {
    const formValid = [];
    Object.keys(studentErr).forEach((sKey) => {
      const isEmpty = Object.values(studentErr[sKey]).every((x) => x === '');
      formValid.push(isEmpty);
    });
    return !formValid.includes(false);
  };

  const onSubmit = () => {
    setLoading(true);
    if (isFormValid(updateError(studentForm))) {
      dispatch(postFeeStructure({ ...registerPayload, isNewRegistration: true }, setLoading));
      handleStepper(2);
    }
  };

  const addSibling = (tStudent) => {
    if (isFormValid(updateError(studentForm))) {
      const updatedForm = { ...studentForm, [`s${tStudent + 1}`]: initialValues };
      setStudentForm(updatedForm);
      setStudentError({ ...studentError, [`s${tStudent + 1}`]: initialErrors });
      setExpandedPanel((Object.keys(updatedForm).length) - 1);
    }
  };

  const addStudentForm = (
    formRef,
  ) => (
    <AddStudent
      parentInfo={parentInfo}
      stuInfo={studentForm[formRef]}
      mainFormError={studentError[formRef]}
      setMainForm={(st) => {
        setStudentForm({ ...studentForm, [formRef]: st });
      }}
      setMainFormError={(str) => {
        setStudentError({ ...studentError, [formRef]: str });
      }}
    />
  );

  const onChangeAccord = (acc) => {
    setExpandedPanel(expandedPanel !== acc ? acc : '');
  };

  const onRemove = (removedIndex) => {
    let lStudentForm = {};
    let lStudentError = {};
    let count = 1;
    _.range(Object.keys(studentForm).length).forEach((sKey) => {
      if (sKey !== removedIndex) {
        const stuKey = `s${sKey + 1}`;
        const countKey = `s${count}`;
        lStudentForm = { ...lStudentForm, [countKey]: studentForm[stuKey] };
        lStudentError = { ...lStudentError, [countKey]: studentError[stuKey] };
        count += 1;
      }
    });
    setStudentError(lStudentError);
    setStudentForm(lStudentForm);
    setExpandedPanel((Object.keys(lStudentForm).length) - 1);
  };
  const handlePreview = () => {
    if (source === 'editStudent') {
      if (isFormValid(updateError(studentForm))) {
        onStudentSubmit(studentForm);
      }
      return;
    }
    if (isFormValid(updateError(studentForm))) {
      setPreviewDialog(true);
    }
  };

  const setHeaderTitle = () => (
    <Grid container item xs={12} justifyContent="space-between">
      <Grid item xs={8} md={6} lg={8}>
        <div className={`${registerClasses.headerTitle} ${classes.headerTitle}`}>
          {t('STUDENT_INFORMATION')}
        </div>
      </Grid>
      <Grid container item justifyContent="flex-end" xs={4} md={6} lg={4}>
        <Button
          btntype={Buttons.SECONDARY}
          icon={<ArrowBackIosIcon />}
          // customCss={customCss}
          onClick={() => handleStepper(0)}
          // className={commonclasses.secButton}
          className={classes.commonButtonNew}
        />
        <Button
          btntype={Buttons.SECONDARY}
          icon={<ArrowForwardIosIcon />}
          // customCss={customCss}
          // className={commonclasses.secButton}
          className={classes.commonButtonNew}
          onClick={() => handlePreview()}
        />
      </Grid>
      <div className={classes.heading}>
        {t('STUDENT_DETAILS')}
      </div>
      <div className={classes.borderBottom} />
    </Grid>
  );
  function navigateToPannel(step) {
    setPreviewDialog(false);
    handleStepper(step);
  }
  return (
    <Box className={registerClasses.gridContainer}>

      {source !== 'editStudent' && (
        <Grid container className={classes.headerContainer}>
          {setHeaderTitle()}
        </Grid>
      )}

      <Grid className={classes.accTitle}>
        {Object.keys(studentForm).length > 1
          ? _.range(Object.keys(studentForm).length).map((index, val) => (
            <Accordion
              expanded={expandedPanel === val}
              onChange={() => onChangeAccord(val)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className={classes.accTitle}>
                  <div className={classes.studentTitle}>
                    {Object.values(studentForm)[index]?.firstName
                      ? `${(Object.values(studentForm)[index]?.firstName)}
                     ${(Object.values(studentForm)[index]?.lastName)}`
                      : `Student ${val + 1}`}
                  </div>
                  <div className={classes.removeTitle} onClick={() => onRemove(val)}>
                    {t('REMOVE')}
                  </div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                {addStudentForm(`s${val + 1}`, val, Object.keys(studentForm).length)}
              </AccordionDetails>
            </Accordion>
          ))
          : <div className={classes.accTitle}>{addStudentForm('s1', 0, 1)}</div>}
      </Grid>

      <Grid container className={classes.btnGroup} justifyContent="flex-end" xs={12} md={12} lg={12}>
        <Button
          item
          xs={6}
          className={commonClasses.secButton}
          onClick={() => addSibling(Object.keys(studentForm).length)}
          name={t('ADD_SIBLING')}
          icon={<AddIcon />}
        />
        <Button
          xs={6}
          className={commonClasses.activeButton}
          onClick={handlePreview}
          name={t(source === 'editStudent' ? 'CONTINUE_TO_PAYMENT' : 'PREVIEW')}
        />
      </Grid>
      <DialogAtom
        customClass={classes.dialogAtom}
        secHandle={() => setPreviewDialog(false)}
        primaryHandle={onSubmit}
        isOpen={isPreviewDialog}
        secButton={t('CANCEL')}
        primaryButton={t('SAVE_CONTINUE')}
        dialogHeading={t('PREVIEW')}
        content={(
          <PreviewRegister
            // eslint-disable-next-line react/jsx-no-bind
            navigateToPannel={navigateToPannel}
            parentInfo={parentInfo}
            studentInfo={studentInfo}
            classes={classes}
          />
        )}
      />
      {loading && (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      )}
    </Box>
  );
}
