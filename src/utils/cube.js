import cubejs from '@cubejs-client/core';
import constant from '../constant/config';
import { getLocalStorage } from './localStorageMethod';

const cubejsApiConstant = { apiUrl: `${constant?.API_BASE_QA?.slice(0, -7)}cubejs-api/v1` };
// const AUTH_TOKEN = getLocalStorage('token');
// const cubejsApi = cubejs(
//   AUTH_TOKEN,
//   { apiUrl: `${constant?.API_BASE_QA?.slice(0, -7)}cubejs-api/v1` },
// );

const getCubejsApi = () => {
  const token = getLocalStorage('token');
  return cubejs(
    token,
    { apiUrl: `${constant?.API_BASE_QA?.slice(0, -7)}cubejs-api/v1` },
  );
};

export {
  cubejsApiConstant, getCubejsApi,
};
