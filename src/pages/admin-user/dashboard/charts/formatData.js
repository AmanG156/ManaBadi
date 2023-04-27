const calculateSameYears = (arr, prop) => {
  const sum = arr.reduce((acc1, itm1) => {
    const updatedSum = itm1[prop] + acc1;
    return updatedSum;
  }, 0);
  return sum;
};

function getValues(data, setKey) {
  const courseRegionSet = new Set();
  const output = [];
  const updatedArray = [];
  const years = new Set();

  data.forEach((itm) => {
    if (courseRegionSet.has(itm[setKey])) {
      return;
    }

    courseRegionSet.add(itm[setKey]);
    const filteredCourseRegions = data.filter((courseRegionItem) => courseRegionItem[setKey] === itm[setKey]);
    const yearSet = new Set();
    filteredCourseRegions.forEach((input) => {
      let sumOfYearValue = 0;
      if (yearSet.has(input.year)) {
        return;
      }

      yearSet.add(input.year);
      const sameYr = filteredCourseRegions.filter((yrItm) => yrItm.year === input.year);
      sumOfYearValue = calculateSameYears(sameYr, 'value');
      if (years.has(input.year)) {
        const toUpdateData = updatedArray.filter((dat) => {
          if (dat.name === input.year) {
            return true;
          }
          return false;
        });
        const oldData = toUpdateData[0].data;
        oldData.push(sumOfYearValue);
      } else {
        years.add(input.year);
        updatedArray.push({ name: input.year, data: [sumOfYearValue] });
      }
    });
  });

  output.push({ categories: [...courseRegionSet], data: updatedArray });
  return output;
}

export function formatData(data, setKey) {
  const allYears = new Set();
  data?.forEach((itm) => {
    if (allYears.has(itm.year)) {
      return;
    }
    allYears.add(itm.year);
  });

  const yearData = [...allYears];
  const resultData = [];

  const courseRegionSet = new Set();
  try {
    data?.forEach((itm) => {
      if (courseRegionSet?.length && courseRegionSet?.has(itm[setKey])) {
        return;
      }
      courseRegionSet?.add(itm[setKey]);
      const filteredData = data.filter((filteredItem) => filteredItem[setKey] === itm[setKey]);

      yearData?.forEach((yearName) => {
        let exist = false;
        for (let i = 0; i < filteredData.length;) {
          if (filteredData[i].year === yearName) {
            resultData.push(filteredData[i]);
            exist = true;
          }
          i += 1;
        }

        if (!exist) {
          resultData.push({ year: yearName, [setKey]: itm[setKey], value: 0 });
        }
      });
    });
  } catch (err) {
    // console.log(err);
  }

  return getValues(resultData, setKey);
}

export default { formatData };
