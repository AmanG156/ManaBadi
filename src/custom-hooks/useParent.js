import { useSelector } from 'react-redux';

export default function useParent() {
  const parentData = useSelector((state) => state?.getParent);
  return parentData;
}
