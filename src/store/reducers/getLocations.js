import Constant from '../constant';

const initialState = {
  locations: [],
  examCenters: [],
  locationCoordinators: [],
};

const location = (state = initialState, action = {}) => {
  switch (action.type) {
    case Constant.GET_ALL_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case Constant.GET_ALL_EXAM_CENTERS:
      return {
        ...state,
        examCenters: action.payload,
      };
    case Constant.GET_ALL_LOCATION_COORDINATORS:
      return {
        ...state,
        locationCoordinators: action.payload,
      };
    default:
      return state;
  }
};

export default location;
