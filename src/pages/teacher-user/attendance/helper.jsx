import moment from 'moment';

/* eslint-disable import/prefer-default-export */
function getClassDetails(data) {
  const classTimings = data.map((i) => {
    const startDay = moment(i?.homework_panel_marks?.startDate).format('Do');
    const startMonth = moment(i?.homework_panel_marks?.startDate).format('MMM');
    const endDay = moment(i?.homework_panel_marks?.endDate).format('Do');
    const endMonth = moment(i?.homework_panel_marks?.endDate).format('MMM');
    let name = '';
    if (startMonth === endMonth) {
      name = `${i?.homework_panel_marks?.week} | ${startDay} - ${endDay} ${startMonth} | ${i?.quarter}`;
    } else {
      name = `${i?.homework_panel_marks?.week} | ${startDay} ${startMonth} - ${endDay} ${endMonth} | ${i?.quarter}`;
    }
    return {
      id: i?.homework_panel_marks?.id,
      name,
      homeworkPanelId: i?.id,
    };
  });
  return classTimings;
}

export { getClassDetails };
