import { useSelector } from 'react-redux';

export default function useSideBarOpen() {
  const isSideBarOpen = useSelector((state) => state.isSideBarOpen);
  return isSideBarOpen;
}
