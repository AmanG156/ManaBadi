function getStudent(
  studentInfo,
  selectedStudent,
  academicYear,
  tShirtSize,
  academicGrade,
  address,
  location,
  extraCurricularActivities,
) {
  const {
    firstName, gender, lastName, middleName, profilePhoto,
    manabadiEmail,
  } = studentInfo;
  const studentObj = {
    studentId: selectedStudent?.id,
    studentName: `${firstName}
        ${lastName}`,
    academicYear,
    profileImage: profilePhoto,
    firstName,
    middleName,
    lastName,
    selectedClassLevel: '',
    dateOfBirth: selectedStudent?.dateOfBirth,
    gender,
    tShirt: tShirtSize,
    grade: academicGrade,
    searchSchool: address,
    sortedNearest: location?.id,
    academicSchool: address,
    extraCurricularActivities,
    manabadiEmail,
  };
  return studentObj;
}
function gerParentPayload(parentInfo, studentAccountDetails) {
  const {
    parentOneFirstName,
    parentOneLastName,
    parentOneMiddleName,
    parentOneContact,
    parentOneEmail,
    parentOneTitle,
    parentOneProfession,
    parentOneCompany,
    readTelugu,
    speakTelugu,
    volunteer,
    hearAboutUs,
    parentTwoFirstName,
    parentTwoLastName,
    parentTwoMiddleName,
    parentTwoContact,
    parentTwoEmail,
    parentTwoTitle,
    parentTwoProfession,
    parentTwoCompany,
    homeAddress,
    aptSuite,
    homeAddressInfo,
  } = parentInfo;
  const parentInfoPayload = {
    parent1: {
      user: {
        firstName: parentOneFirstName,
        lastName: parentOneLastName,
        middleName: parentOneMiddleName,
        contactNumber: parentOneContact,
        personalEmail: parentOneEmail,
        id: studentAccountDetails?.parent1Data?.id,
      },
      userDetails: {
        title: parentOneTitle,
        profession: parentOneProfession,
        nameOfCompany: parentOneCompany,
        readTelugu,
        speakTelugu,
        volunteerChoice: volunteer,
        recommendedSource: hearAboutUs.filter((element) => element !== null),
      },
    },
    parent2: {
      user: {
        firstName: parentTwoFirstName,
        lastName: parentTwoLastName,
        middleName: parentTwoMiddleName,
        contactNumber: parentTwoContact,
        personalEmail: parentTwoEmail,
        id: studentAccountDetails?.parent2Data?.id,
      },
      userDetails: {
        title: parentTwoTitle,
        profession: parentTwoProfession,
        nameOfCompany: parentTwoCompany,
        readTelugu,
        speakTelugu,
        volunteerChoice: volunteer,
        recommendedSource: hearAboutUs.filter((element) => element !== null),
      },
    },
  };
  const addressPayload = {
    addresses: {
      address: homeAddress,
      aptSuite,
      latitude: Number(homeAddressInfo?.lat),
      longitude: Number(homeAddressInfo?.lng),
    },
  };
  const payload = {
    parent1: parentInfoPayload.parent1,
    addresses: addressPayload.addresses,
  };
  const parent2 = Object.values(parentInfoPayload?.parent2?.user);
  const result = parent2?.filter((i) => i !== undefined && i !== '');
  if (result?.length) {
    payload.parent2 = parentInfoPayload.parent2;
  }
  return payload;
}
function getPrimaryStudentPayload(primaryStudentData) {
  const student = {
    user: {
      firstName: primaryStudentData?.firstName,
      middleName: primaryStudentData?.middleName,
      lastName: primaryStudentData?.lastName,
      studentId: primaryStudentData?.studentId,
      manabadiEmail: primaryStudentData?.manabadiEmail,
      gender: primaryStudentData?.gender,
    },
    studentDetail: {
      image: primaryStudentData?.profileImage,
      dateOfBirth: primaryStudentData?.dateOfBirth,
    },
    academicSchool: {
      address: primaryStudentData?.academicSchool?.address,
      aptSuite: 'A5',
      latitude: primaryStudentData?.academicSchool?.latitude,
      longitude: primaryStudentData?.academicSchool?.longitude,
    },
    enrollmentCourse: {
      academicYear: primaryStudentData?.academicYear,
      academicGrade: primaryStudentData?.grade,
      locationId: primaryStudentData?.sortedNearest,
      tShirtSize: primaryStudentData?.tShirt,
      courseId: primaryStudentData?.selectedClassLevel?.id,
      courseName: primaryStudentData?.selectedClassLevel?.name,
      extraCurricularActivities: primaryStudentData?.extraCurricularActivities || [],
    },
  };
  return student;
}

export { getStudent, gerParentPayload, getPrimaryStudentPayload };
