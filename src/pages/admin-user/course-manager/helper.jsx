function GetAllCourses(courses) {
  return courses;
}

function GetOnlyActiveCourses(courses) {
  const options = courses.filter((obj) => obj.isActive);
  return options;
}
export { GetOnlyActiveCourses, GetAllCourses };
