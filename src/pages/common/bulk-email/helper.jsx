/* eslint-disable import/prefer-default-export */

const getFilterKey = (filterKey) => {
  let key = filterKey;
  if (filterKey === 'academic_year') {
    key = 'AcademicYear';
  } else if (filterKey === 'course_name') {
    key = 'Course';
  } else if (filterKey === 'section') {
    key = 'Section';
  } else if (filterKey === 'region_name') {
    key = 'Region';
  }
  return key;
};

// const setFiltersData = (obj) => {
//   const key = getFilterKey(obj.filterKey);
//   if (key === 'AcademicYear') {
//     academicFilter.
//   } else if (filterKey === 'course_name') {
//     key = 'Course';
//   } else if (filterKey === 'section') {
//     key = 'Section';
//   } else if (filterKey === 'region_name') {
//     key = 'Region';
//   }
// };

function DataList(data) {
  const academicFilter = { AcademicYear: [] };
  const locationFilter = { Location: [] };
  const courseFilter = { Course: [] };
  const completionStatusFilter = { CompletionStatus: [] };
  const studentFilter = { Student: [] };
  const regionFilter = { Region: [] };
  const statusFilter = { Status: [] };
  const countryFilter = { Country: [] };
  const returningFilter = { Returning: [] };
  const examCenterFilter = { ExamCenter: [] };
  const centerFilter = { Center: [] };
  const hasPicFilter = { HasPic: [] };
  const userFilter = { User: [] };
  const createdDateFilter = { CreatedDate: [] };
  const registeredWeekFilter = { RegisteredWeek: [] };
  const lessMarksFilter = { 'Marks <=': [] };
  const greaterMarksFilter = { 'Marks >=': [] };
  const sectionFilter = { Section: [] };

  let studentCount = 0;
  let filtersCount = 0;

  data?.forEach((obj) => {
    if (obj.filterKey === 'recipients') {
      studentCount += 1;
      studentFilter.Student.push(obj.label);
    } else if (obj.filterKey === 'locationFilter') {
      filtersCount += 1;
      locationFilter.Location.push(obj.label);
    } else if (obj.filterKey === 'yearFilter') {
      filtersCount += 1;
      academicFilter.AcademicYear.push(obj.label);
    } else {
      const key = getFilterKey(obj.filterKey);
      if (key === 'Student') {
        studentCount += 1;
        studentFilter[key].push(obj.label);
      } else if (key === 'AcademicYear') {
        filtersCount += 1;
        academicFilter[key].push(obj.label);
      } else if (key === 'Course') {
        filtersCount += 1;
        courseFilter[key].push(obj.label);
      } else if (key === 'Region') {
        filtersCount += 1;
        regionFilter[key].push(obj.label);
      } else if (key === 'CompletionStatus') {
        filtersCount += 1;
        completionStatusFilter[key].push(obj.label);
      } else if (key === 'Status') {
        filtersCount += 1;
        statusFilter[key].push(obj.label);
      } else if (key === 'Country') {
        filtersCount += 1;
        countryFilter[key].push(obj.label);
      } else if (key === 'Returning') {
        filtersCount += 1;
        returningFilter[key].push(obj.label);
      } else if (key === 'Center') {
        filtersCount += 1;
        centerFilter[key].push(obj.label);
      } else if (key === 'HasPic') {
        filtersCount += 1;
        hasPicFilter[key].push(obj.label);
      } else if (key === 'ExamCenter') {
        filtersCount += 1;
        examCenterFilter[key].push(obj.label);
      } else if (key === 'User') {
        filtersCount += 1;
        userFilter[key].push(obj.label);
      } else if (key === 'CreatedDate') {
        filtersCount += 1;
        createdDateFilter[key].push(obj.label);
      } else if (key === 'RegisteredWeek') {
        filtersCount += 1;
        registeredWeekFilter[key].push(obj.label);
      } else if (key === 'Marks <=') {
        filtersCount += 1;
        lessMarksFilter[key].push(obj.label);
      } else if (key === 'Marks >=') {
        filtersCount += 1;
        greaterMarksFilter[key].push(obj.label);
      } else if (key === 'Section') {
        filtersCount += 1;
        sectionFilter[key].push(obj.label);
      }
    }
  });
  const finalFilters = [];
  if (studentFilter.Student.length > 0) {
    finalFilters.push(studentFilter);
  }
  if (academicFilter.AcademicYear.length > 0) {
    finalFilters.push(academicFilter);
  }
  if (courseFilter.Course.length > 0) {
    finalFilters.push(courseFilter);
  }
  if (regionFilter.Region.length > 0) {
    finalFilters.push(regionFilter);
  }
  if (completionStatusFilter.CompletionStatus.length > 0) {
    finalFilters.push(completionStatusFilter);
  }
  if (statusFilter.Status.length > 0) {
    finalFilters.push(statusFilter);
  }
  if (countryFilter.Country.length > 0) {
    finalFilters.push(countryFilter);
  }
  if (returningFilter.Returning.length > 0) {
    finalFilters.push(returningFilter);
  }
  if (centerFilter.Center.length > 0) {
    finalFilters.push(centerFilter);
  }
  if (locationFilter.Location.length > 0) {
    finalFilters.push(locationFilter);
  }
  if (examCenterFilter.ExamCenter.length > 0) {
    finalFilters.push(examCenterFilter);
  }
  if (userFilter.User.length > 0) {
    finalFilters.push(userFilter);
  }
  if (createdDateFilter.CreatedDate.length > 0) {
    finalFilters.push(createdDateFilter);
  }
  if (registeredWeekFilter.RegisteredWeek.length > 0) {
    finalFilters.push(registeredWeekFilter);
  }
  if (lessMarksFilter['Marks <='].length > 0) {
    finalFilters.push(lessMarksFilter);
  }
  if (greaterMarksFilter['Marks >='].length > 0) {
    finalFilters.push(greaterMarksFilter);
  }
  if (sectionFilter.Section.length > 0) {
    finalFilters.push(sectionFilter);
  }
  return { finalFilters, studentCount, filtersCount };
}

export { DataList };
