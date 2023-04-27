import moment from 'moment';

function GetWithDeactivatedFiles(resources) {
  return resources;
}

function GetWithoutDeactivatedFiles(resources) {
  const options = [];
  resources?.forEach((obj) => {
    if (obj.deactivateDate) {
      const deactivateDate = moment(obj.deactivateDate).format('YYYY-MM-DD');
      const currentDate = moment().format('YYYY-MM-DD');
      if (!moment(deactivateDate).isSameOrBefore(currentDate)) {
        options.push(obj);
      }
    } else {
      options.push(obj);
    }
  });
  // const data = resources?.filter((i) => (i.deactivateDate ? moment(i.deactivateDate).isSameOrBefore(moment()) : i));
  return options;
}
export { GetWithoutDeactivatedFiles, GetWithDeactivatedFiles };
