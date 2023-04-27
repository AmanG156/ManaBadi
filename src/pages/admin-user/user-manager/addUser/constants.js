const genderOptions = [
  {
    name: 'Male', id: 'Male',
  },
  {
    name: 'Female', id: 'Female',
  },
];

const academicOptions = {
  name: '2022-2023', id: '2022-2023',
};

const studentInitialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: new Date(),
  gender: '',
  tShirt: '',
  academicYear: academicOptions.id,
  grade: '',
  searchSchool: '',
  sortedNearest: '',
  extraCurricularActivities: [],
  classLevel: '',
  profileImage: '',
  studentSchoolInfo: { lat: 0, lng: 0 }, // to store lat lng for student school address
};

const studentInitialErrors = {
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  tShirt: '',
  academicYear: false,
  grade: '',
  searchSchool: '',
  sortedNearest: '',
  extraCurricularActivities: '',
  classLevel: '',
  profileImage: '',
};

export {
  genderOptions,
  studentInitialValues,
  studentInitialErrors,
};
