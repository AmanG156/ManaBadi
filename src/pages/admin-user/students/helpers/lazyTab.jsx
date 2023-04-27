import React, { useState } from 'react';

function LazyTab({ children }) {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 50);
  return (
  // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {
        !loading ? children : <div />
      }
    </>
  );
}

export default LazyTab;
