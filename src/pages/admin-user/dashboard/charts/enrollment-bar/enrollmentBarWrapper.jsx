import React from 'react';
import { CubeProvider } from '@cubejs-client/react';
import EnrollBar from './enrollmentBar';
import { getCubejsApi } from '../../../../../utils/cube';

function EnrollbarWrapper({ setEnrollGraphOption, enrollGraphOption }) {
  return (
    <CubeProvider cubejsApi={getCubejsApi()}>
      <EnrollBar {...{ setEnrollGraphOption, enrollGraphOption }} />
    </CubeProvider>
  );
}

export default EnrollbarWrapper;
