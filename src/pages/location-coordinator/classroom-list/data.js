function getClassroomsData(courseData) {
  const rows = courseData.map((course, index) => {
    const item = course?.class_teachers.find((el) => el?.is_primary === true); // -> foundIdx = 3
    const itemIndex = course?.class_teachers.findIndex((el) => el?.is_primary === true); // -> foundIdx = 3
    course?.class_teachers?.splice(itemIndex, 1);
    course?.class_teachers?.unshift(item);
    return ({
      ...course,
      id: index,
      classroomLink: `${course?.class_room_link || ''}`,
      teachers: `${course?.class_teachers || ''}`,
      courseName: `${course?.course?.name || ''}`,
      numberOfStudents: course?.enrolled_courses?.length || 0,
      section: course?.section || '',
      actions: 'popup',
      googleClassId: course?.id,
      classRoomId: course?.class_room_id,
      teachersName: course?.class_teachers?.length && course?.class_teachers
        .map((i) => `${i?.user?.first_name} ${i?.user?.last_name}`).filter((i) => i !== null && i !== undefined)
        .join(','),
    });
  });
  return rows;
}

export default getClassroomsData;
