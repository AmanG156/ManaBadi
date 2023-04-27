/* eslint-disable import/prefer-default-export */
function StudentList(studentData) {
  const rows = studentData?.map((student, index) => ({
    ...student,
    key: index,
    id: index,
    profilePhoto: `${student?.studentInfo?.profilePhoto}  ` || '',
    studentName: `${student?.studentInfo?.firstName} ${student?.studentInfo?.lastName}  ` || '',
    studentId: student?.id,
    parentName: `${student?.parent1Info?.firstName} ${student?.parent1Info?.lastName}  ` || '',
    phoneNumber: student?.parent1Info?.contactNumber || '',
    // student: student?.enrolled_students?.map((i) => `${i?.studentName}`).join(','),
    // section: student?.enrolled_students[0]?.google_class?.section || '',
    homeworkQ1: student?.homeworkMarks?.Q1?.obtainedMarks || 0,
    homeworkQ2: student?.homeworkMarks?.Q2?.obtainedMarks || 0,
    homeworkQ3: student?.homeworkMarks?.Q3?.obtainedMarks || 0,
    marksQ1: student?.marks?.Q1?.obtainedMarks || 0,
    marksQ2: student?.marks?.Q2?.obtainedMarks || 0,
    marksQ3: student?.marks?.Q3?.obtainedMarks || 0,
    bonus: student?.bonus || '',
    grade: student?.grade,
    gpa: student?.gpa || '',
    annualScore: student?.annualScore || '',
    newReturning: student?.newReturning,
    // teachersName: (student?.class_teachers || [])
    //   .map((i) => `${i?.user?.first_name} ${i?.user?.last_name}`)
    //   .join(','),
  }));
  return rows;
}

export { StudentList };
