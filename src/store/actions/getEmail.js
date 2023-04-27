/* eslint-disable no-console */
import Constant from '../constant/index';
import {
  getEmailTemplateService,
  saveEmailTemplateService,
  getAnnouncementListService,
  getAnnouncementByIdService,
  sendAnnouncementService,
  getEmailFilterService,
  getRecipientsByFilterService,
  getSubstitutionTagsService,
} from '../services/auth';

export const getEmailTemplate = () => (dispatch) => {
  getEmailTemplateService()
    .then((response) => {
      dispatch({
        type: Constant.GET_EMAIL_TEMPLATES,
        payload: response.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const saveEmailTemplate = (payload) => () => {
  saveEmailTemplateService(payload)
    .then((res) => {
      console.log('res', res);
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAnnouncementList = (payload) => (dispatch) => {
  getAnnouncementListService(payload)
    .then((res) => {
      dispatch({
        type: Constant.GET_ANNOUNCEMENTS,
        payload: res,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getAnnouncementById = (id) => (dispatch) => {
  getAnnouncementByIdService(id)
    .then((res) => {
      dispatch({
        type: Constant.GET_ANNOUNCEMENT_BY_ID,
        payload: res,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const sendAnnouncement = (payload) => () => {
  sendAnnouncementService(payload)
    .then((res) => {
      console.log('res', res);
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getEmailFilters = () => (dispatch) => {
  getEmailFilterService()
    .then((res) => {
      dispatch({
        type: Constant.GET_EMAIL_FILTERS,
        payload: res.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export const getRecipientsByFilter = (payload) => (dispatch) => {
  getRecipientsByFilterService(payload)
    .then((res) => {
      dispatch({
        type: Constant.RECIPIENT_OPTIONS,
        payload: res.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};
export const getSubstitutionTagsList = (payload) => (dispatch) => {
  getSubstitutionTagsService(payload)
    .then((res) => {
      dispatch({
        type: Constant.GET_SUBSTITUTION_TAGS,
        payload: res.data,
      });
    }).catch((error) => {
      console.log('error :', error);
    });
};

export default {
  getEmailTemplate,
  saveEmailTemplate,
  getAnnouncementList,
  sendAnnouncement,
  getAnnouncementById,
  getRecipientsByFilter,
  getSubstitutionTagsList,
};
