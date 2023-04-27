import Constant from '../constant';
import {
  CreateLocationService,
  getAllExamCentersService,
  getAllLocationCoordinatorsService,
  getAllLocationsService, updateLocationService,
} from '../services/auth';

export const getAllLocations = () => (dispatch) => {
  getAllLocationsService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_LOCATIONS,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const updateLocation = (payload, refreshList) => () => {
  updateLocationService(payload)
    .then(() => {
      refreshList();
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const createLocation = (payload, refreshList) => () => {
  CreateLocationService(payload)
    .then(() => {
      refreshList();
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const getAllExamCenters = () => (dispatch) => {
  getAllExamCentersService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_EXAM_CENTERS,
        payload: response?.body,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const getAllLocationCoordinators = () => (dispatch) => {
  getAllLocationCoordinatorsService()
    .then((response) => {
      dispatch({
        type: Constant.GET_ALL_LOCATION_COORDINATORS,
        payload: response?.body,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export default {
  getAllLocations,
  getAllExamCenters,
  getAllLocationCoordinators,
  updateLocation,
  createLocation,
};
