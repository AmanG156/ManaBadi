import moment from 'moment';
import { getCourseByAgeLocationService } from './auth';

const getCourseByAge = async (dob, location) => {
  const payload = {
    locationId: location,
    dateOfBirth: moment(dob).format('YYYY-MM-DD HH:mm:ss'),
  };
  const response = await getCourseByAgeLocationService(payload);
  return response.data.map((option) => option.course);
};
export default getCourseByAge;
