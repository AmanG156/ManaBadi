/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import Geocode from 'react-geocode';
import Config from '../constant/config';

Geocode.setApiKey(Config.REACT_APP_AUTO_COMPLETE_API);

const getPlaceInformation = async (address) => {
  const response = await Geocode.fromAddress(address);
  return response.results[0].geometry.location;
};

export {
  getPlaceInformation,
};
