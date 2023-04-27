const commonFields = [
  'profileImage',
  'firstName',
  'lastName',
  'dateOfBirth',
  'gender',
  'tShirt',
  'grade',
  'extraCurricularActivities',
  'academicSchool',
  'changeLog',
];
const reqFieldsForAdmin = [
  'academicYear',
  'grade',
  'extraCurricularActivities',
  'academicSchool',
  'classLevel',
  'manabadiLocation',
];
const reqFieldsForStudent = [
  'grade',
  'classLevel',
  'extraCurricularActivities',
  'academicShool',
  'changeLog',
];
export { commonFields, reqFieldsForAdmin, reqFieldsForStudent };
