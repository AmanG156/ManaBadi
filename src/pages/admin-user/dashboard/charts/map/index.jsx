/* eslint-disable array-callback-return */
import { Grid, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import Map from './map';
import useStyles from '../../../../../custom-hooks/useStyles';
import style from '../style';

function MapChart({ data, label }) {
  const newData = data?.map((i) => {
    return {
      name: i?.country,
      state: i?.state,
      count: i?.value,
      coordinates: [i?.lat || 0, i?.lng || 0],
    };
  });
  const [coordinatesData, setCoordinatesData] = useState(newData);
  const uniqueCoutries = ['All', ...new Set(data?.map((i) => i?.country))];
  const [tooltipContent, setTooltipContent] = useState('');
  const [filterIndex, setFilterIndex] = useState(0);
  const [filterCountry, setFilterCountry] = useState('All');
  const classes = useStyles(style)();

  useEffect(() => {
    const updatedData = [...newData];
    setCoordinatesData(
      filterCountry === 'All'
        ? updatedData
        : updatedData?.filter((i) => i?.name === filterCountry),
    );
  }, [filterCountry, data]);

  return (
    <Grid className={`${classes.mapView}`}>
      <div className={classes.heading}>{label}</div>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <Map {...{ setTooltipContent, uniqueCoutries, coordinatesData }} />
      <Box className={classes.mapFilter}>
        <Box className={classes.title}>Select the countries</Box>
        <Box className={classes.filterContainer}>
          {uniqueCoutries?.map((items, i) => (
            <p
              onClick={() => {
                setFilterIndex(i);
                setFilterCountry(items);
              }}
              className={`${classes.filterLabel} ${
                filterIndex === i ? classes.activeFilter : null
              }`}
              key={i}
            >
              {items}
            </p>
          ))}
        </Box>
      </Box>
    </Grid>
  );
}

export default MapChart;
