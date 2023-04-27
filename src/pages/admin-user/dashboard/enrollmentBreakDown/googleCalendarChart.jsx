import React from 'react';
import Chart from 'react-google-charts';
import useScreenWidth from '../../../../custom-hooks/useScreenWidth';

function GoogleCalendarChart({ data }) {
  const newData = data?.map((i) => [new Date(i?.date), i?.count]);
  const formattedData = [[{ type: 'date', id: 'Date' },
    { type: 'number', id: 'count' }]].concat(newData);

  return (
    <Chart
      width={useScreenWidth()}
      height={630}
      chartType="Calendar"
      loader={<div>Loading Chart</div>}
      data={formattedData}
      options={{
        calendar: {
          cellSize: 20,
        },
      }}
    />
  );
}

export default GoogleCalendarChart;
