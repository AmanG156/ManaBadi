import React from 'react';
import { useDispatch } from 'react-redux';

export default function useDispatchHook(actions) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    actions?.forEach((action) => {
      dispatch(action());
    });
  }, []);
}
