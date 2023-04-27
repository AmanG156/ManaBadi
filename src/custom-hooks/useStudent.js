import { useSelector } from 'react-redux';

export default function useStudent() {
  const studentData = useSelector((state) => state?.getStudent);
  return studentData;
}
