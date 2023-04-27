import Constant from '../constant';

const initialState = {
  regions: [],
  countries: [],
  geoRegions: [],
  coordinators: [],
};

const region = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.SET_ALL_REGION:
      return {
        ...state,
        regions: action.payload,
      };
    case Constant.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case Constant.SET_REGION_COORDINATOR:
      return {
        ...state,
        coordinators: action.payload,
      };
    case Constant.SET_GEO_REGION:
      return {
        ...state,
        geoRegions: action.payload,
      };
    default:
      return state;
  }
};

export default region;
