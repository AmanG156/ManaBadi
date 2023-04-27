import { useEffect, useState } from 'react';

export default function useDataTableParams() {
  const [graphOption, setGraphOption] = useState('acrossyear');

  const handleGraphOption = (event) => {
    setGraphOption(event.target.value);
  };
  useEffect(() => {
  }, [graphOption]);

  return {
    graphOption,
    handleGraphOption,
  };
}
