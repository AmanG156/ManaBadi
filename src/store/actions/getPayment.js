/* eslint-disable no-console */
import { setLocalStorage } from '../../utils/localStorageMethod';
import Constant from '../constant';
import {
  getDonationService, postFeeStructureService, postRegisterService,
  captureOrderService, getStudentPaymentInfoService, captureDonationService,
  getFeeStructureForEnrollService,
} from '../services/auth';

export const getDonations = () => (dispatch) => {
  getDonationService()
    .then((response) => {
      dispatch({
        type: Constant.GET_DONATIONS,
        payload: response?.data,
      });
    })
    .catch((error) => {
      console.log('error :', error);
    });
};

export const postRegister = (id, data) => (dispatch) => {
  postRegisterService(id, data)
    .then((user) => {
      dispatch({
        type: Constant.POST_REGISTER,
        payload: user,
      });
    })
    .catch((error) => {
      console.log('error', error);
      // handle error
      dispatch({
        type: Constant.POST_REGISTER,
        payload: [],
      });
    });
};

export const postFeeStructure = (reqpayload, setLoading) => (dispatch) => {
  postFeeStructureService(reqpayload, setLoading)
    .then((feeStructure) => {
      setLoading(false);
      dispatch({
        type: Constant.POST_FEE_STRUCTURE,
        payload: feeStructure?.data,
      });
    })
    .catch((error) => {
      console.log('error', error);
      setLoading(false);
      // handle error
      dispatch({
        type: Constant.POST_FEE_STRUCTURE,
        payload: [],
      });
    });
};

export const captureOrder = (payload, onCaptureOrderSuccess) => (dispatch) => {
  captureOrderService(payload)
    .then((order) => {
      dispatch({
        type: Constant.CAPTURE_ORDER,
        payload: order,
      });
      onCaptureOrderSuccess();
      setLocalStorage('registrationId', '');
      setLocalStorage('orderId', '');
      setLocalStorage('paymentFor', '');
      setLocalStorage('isDonation', '');
    })
    .catch((error) => {
      console.log('error', error);
      // handle error
      dispatch({
        type: Constant.CAPTURE_ORDER,
        payload: [],
      });
    });
};

export const captureDonation = (payload) => (dispatch) => {
  captureDonationService(payload)
    .then((order) => {
      dispatch({
        type: Constant.CAPTURE_DONATION,
        payload: order,
      });
      setLocalStorage('registrationId', '');
      setLocalStorage('orderId', '');
      setLocalStorage('paymentFor', '');
      setLocalStorage('isDonation', '');
    })
    .catch((error) => {
      console.log('error', error);
      // handle error
      dispatch({
        type: Constant.CAPTURE_ORDER,
        payload: [],
      });
    });
};

export const getStudentPaymentInfo = (id, setIsPaymentDialogOpen) => (dispatch) => {
  getStudentPaymentInfoService(id)
    .then((studentPaymentInfo) => {
      dispatch({
        type: Constant.SET_STUDENT_PAYMENT_INFO,
        payload: studentPaymentInfo.data,
      });
      setIsPaymentDialogOpen(true);
    })
    .catch((error) => {
      console.log('error', error);
      // handle error
      dispatch({
        type: Constant.SET_STUDENT_PAYMENT_INFO,
        payload: {},
      });
    });
};

export const getFeeStructureForEnroll = (payload) => (dispatch) => {
  getFeeStructureForEnrollService(payload)
    .then((response) => {
      dispatch({
        type: Constant.SET_FEE_STRUCTURE_FOR_ENROLL,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log('error', error);
    });
};
export default {
  getDonations,
  postRegister,
  postFeeStructure,
  captureOrder,
};
