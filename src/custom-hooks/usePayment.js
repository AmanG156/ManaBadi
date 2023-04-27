import { useSelector } from 'react-redux';

export default function usePayment() {
  const paymentData = useSelector((state) => state?.getPayment);
  return paymentData;
}
