import { useSelector } from 'react-redux';

export default function useAdmin() {
  const adminData = useSelector((state) => state?.getAdmin);
  return adminData;
}
