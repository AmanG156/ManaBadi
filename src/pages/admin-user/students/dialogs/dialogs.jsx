import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { DialogAtom } from '../../../../components/atoms';
import { PaymentDialogContent } from '../helper';
import EditExamDetails from '../edit_Exam_Details/index';
import { useStyles } from './style';

function DisplayDialog({
  isSwapCourseDialog, onSwapCourseOrLocation, swapCourseDialogFooter,
  swapCourseLocation, isPaymentDialogOpen, setIsPaymentDialogOpen,
  isEditExamDetailsOpen,
  setIsEditExamDetailsOpen,
  isRecoveryDialogOpen, isParentDialogOpen, setEditStudentProfile,
  parentInfoComponent, isEditStudentProfile, editStudentContent,
  recoverPasswordSuccess, renderSuccessContent, renderRecoveryContent,
  setIsRecoveryDialogOpen, setIsParentDialogOpen,
  isCancelEnroll, cancelEnrollFooter, cancelEnrollContent, setCancelEnroll,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div>
      <DialogAtom
        secHandle={() => onSwapCourseOrLocation(false)}
        isOpen={isSwapCourseDialog}
        dialogHeading={t('SWAP_COURSE_LOCATION')}
        customClass={classes.swapCourseDialog}
        footer={swapCourseDialogFooter}
        content={swapCourseLocation}
      />
      <DialogAtom
        isOpen={isPaymentDialogOpen}
        dialogHeading={t('SHOW_PAYMENT_INFORMATION')}
        customClass={classes.paymentDialogAtom}
        content={(
          <PaymentDialogContent
            classes={classes}
            stuPaymentInfo={useSelector((state) => state.getPayment.studentPaymentInfo)}
          />
        )}
        secHandle={() => setIsPaymentDialogOpen(false)}
      />
      <DialogAtom
        isOpen={isRecoveryDialogOpen}
        dialogHeading={t('PASSWORD_RECOVERY')}
        customClass={classes.passwordDialogAtom}
        content={recoverPasswordSuccess ? renderSuccessContent() : renderRecoveryContent()}
        secHandle={() => setIsRecoveryDialogOpen(false)}
      />

      <DialogAtom
        secHandle={() => setCancelEnroll(false)}
        isOpen={isCancelEnroll}
        dialogHeading={t('CANCEL_STUDENT_COURSE')}
        customClass={classes.swapCourseDialog}
        footer={cancelEnrollFooter}
        content={cancelEnrollContent}
      />
      <DialogAtom
        isOpen={isParentDialogOpen}
        dialogHeading={t('EDIT_PARENT_PROFILE')}
        secHandle={() => setIsParentDialogOpen(false)}
        customClass={classes.parentDialogAtom}
        content={parentInfoComponent}
      />
      <DialogAtom
        customClass={classes.studentDialogAtom}
        isOpen={isEditStudentProfile}
        dialogHeading={t('EDIT_STUDENT_PROFILE')}
        content={editStudentContent}
        secHandle={() => setEditStudentProfile(false)}
      />
      <DialogAtom
        customClass={classes.studentDialogAtom}
        isOpen={isEditExamDetailsOpen}
        dialogHeading={t('EDIT_EXAM_DETAILS')}
        content={(
          <EditExamDetails />
        )}
        secHandle={() => setIsEditExamDetailsOpen(false)}
      />
    </div>
  );
}
export default DisplayDialog;
