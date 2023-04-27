import { getAllLocationsByCourseService } from './auth';

const getLocationByCourse = async (courseId) => {
  const response = await getAllLocationsByCourseService(courseId);
  return response.data;
};
export default getLocationByCourse;
