import { useSelector } from 'react-redux';

export default function useUser() {
  const userData = useSelector((state) => state?.getUser);
  return userData;
}
