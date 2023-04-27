import Constant from '../constant';
import {
  getAllRegionService,
  getCountriesService,
  getGeoRegionService,
  getRegionCordinatorsService,
} from '../services/auth';

export const getRegions = (setLoading) => (dispatch) => {
  getAllRegionService()
    .then((response) => {
      dispatch({
        type: Constant.SET_ALL_REGION,
        payload: response?.data,
      });
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
      // console.log('error :', error);
    });
};

export const getCountries = () => (dispatch) => {
  getCountriesService()
    .then((response) => {
      dispatch({
        type: Constant.SET_COUNTRIES,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const getRegionCordinators = () => (dispatch) => {
  getRegionCordinatorsService()
    .then((response) => {
      dispatch({
        type: Constant.SET_REGION_COORDINATOR,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export const getGeoRegion = (payload) => (dispatch) => {
  getGeoRegionService(payload)
    .then((response) => {
      dispatch({
        type: Constant.SET_GEO_REGION,
        payload: response?.data,
      });
    })
    .catch(() => {
      // console.log('error :', error);
    });
};

export default {
  getRegions,
  getRegionCordinators,
  getGeoRegion,
};
