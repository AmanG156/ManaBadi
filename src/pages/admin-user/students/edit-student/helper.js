function getStudentValues(student, isStudentOrSibling, isEnrollStudent, selectedTshirt, selectedGrade, selectedEC) {
  const values = {
    firstName: student?.firstName,
    middleName: student?.middleName,
    lastName: student?.lastName,
    dateOfBirth: student?.dateOfBirth,
    gender: student?.gender,
    tShirt: selectedTshirt?.id,
    grade: selectedGrade?.name,
    academicSchool:
          student?.academicSchool?.address,
    extraCurricularActivities: selectedEC,
    profileImage: student?.profileImage,
    changeLogs: '',
    latitude: Number(student?.academicSchool?.latitude),
    longitude: Number(student?.academicSchool?.longitude),
    academicYear:
          (isStudentOrSibling || isEnrollStudent) && student?.academicYear,
    classLevel:
          (isStudentOrSibling && student?.selectedClassLevel) || (isEnrollStudent
            && student?.selectedClassLevel?.id),
    manabadiLocation:
          (isStudentOrSibling || isEnrollStudent) ? student?.sortedNearest : '',
    manabadiEmail: (isEnrollStudent) ? student?.manabadiEmail : '',
  };
  return values;
}

function getStudentValuesForEnroll(
  formikValues,
  studentInfo,
  isStudentOrSibling,
  extracurricularOptions,
  tShirtOptions,
  classLevelOption,
) {
  const {
    firstName,
    lastName,
    profileImage,
    dateOfBirth,
    gender,
    academicYear,
    tShirt,
    academicSchool,
    grade,
    manabadiLocation,
    manabadiEmail,
    classLevel,
    latitude,
    longitude,
    extraCurricularActivities,
  } = formikValues;

  const selectedClassLevelOption = classLevelOption?.find(
    (stuClassLevel) => (stuClassLevel.id === classLevel),
  );

  const ac = extracurricularOptions?.filter((op) => extraCurricularActivities?.some(
    (value) => op?.id === value,
  ));
  const selectedAc = ac?.map((c) => c.name);
  const tShirtSize = tShirtOptions?.find(
    (shirt) => shirt.id === tShirt,
  );

  const info = {
    studentId: studentInfo?.studentId,
    profileImage,
    dateOfBirth,
    gender,
    academicYear,
    firstName,
    lastName,
    studentName: `${firstName} ${lastName}`,
    tShirt: tShirtSize?.name,
    selectedGrade: grade,
    grade,
    academicSchool: {
      address: academicSchool,
      latitude: Number(latitude),
      longitude: Number(longitude),
    },
    latitude: Number(latitude),
    longitude: Number(longitude),
    classLevel: (isStudentOrSibling ? classLevel : selectedClassLevelOption),
    selectedClassLevel: selectedClassLevelOption,
    sortedNearest: manabadiLocation,
    extraCurricularActivities: selectedAc,
    manabadiEmail,
  };
  return info;
}
export { getStudentValues, getStudentValuesForEnroll };
