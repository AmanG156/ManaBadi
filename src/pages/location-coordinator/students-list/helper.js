function Student(courseData) {
  const rows = courseData?.map((course, index) => ({
    ...course,
    key: index,
    id: course?.id,
    profilePhoto: `${course?.studentInfo?.profilePhoto}  ` || '',
    studentName: `${course?.studentInfo?.firstName} ${course?.studentInfo?.lastName}  ` || '',
    parentName: `${course?.parent1Info?.firstName} ${course?.parent1Info?.lastName}  ` || '',
    phoneNumber: course?.parent1Info.contactNumber || '',
    course: course?.enrolled_courses?.map((i) => `${i?.courseName}`).join(','),
    section: course?.enrolled_courses[0]?.google_class?.section || '',
    homeworkQ1: course?.homeworkMarks?.Q1?.obtainedMarks || 0,
    homeworkQ2: course?.homeworkMarks?.Q2?.obtainedMarks || 0,
    homeworkQ3: course?.homeworkMarks?.Q3?.obtainedMarks || 0,
    marksQ1: course?.marks?.Q1?.obtainedMarks || 0,
    marksQ2: course?.marks?.Q2?.obtainedMarks || 0,
    marksQ3: course?.marks?.Q3?.obtainedMarks || 0,
    bonus: course?.bonus || '',
    grade: course?.grade,
    gpa: course?.gpa || '',
    annualScore: course?.annualScore || '',
    newReturning: course?.newReturning,
    teachersName: (course?.class_teachers || [])
      .map((i) => `${i?.user?.first_name} ${i?.user?.last_name}`)
      .join(','),
  }));
  return rows;
}
function SwapCourse(row) {
  const data = {
    studentId: row?.row?.id,
    studentName: `${row?.row?.studentInfo?.firstName} ${row?.row?.studentInfo?.lastName}`,
    acedemicYear: row?.row?.enrolled_courses[0]?.academicYear,
    courseFrom: row?.row?.enrolled_courses[0]?.courseName,
    courseTo: row?.row?.enrolled_courses[0]?.courseId,
    sectionFrom: row?.row?.enrolled_courses[0]?.google_class?.section,
    sectionTo: row?.row?.enrolled_courses[0]?.google_class?.id,
    locationTo: row?.row?.enrolled_courses[0]?.location?.id,
    locationFrom: row?.row?.enrolled_courses[0]?.location?.name,
  };
  return data;
}
export { Student, SwapCourse };
