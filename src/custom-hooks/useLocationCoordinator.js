import { useSelector } from 'react-redux';

export default function useLocationCoordinator() {
  const coordinatorData = useSelector((state) => state?.getLocationCoordinator);
  return coordinatorData;
}
