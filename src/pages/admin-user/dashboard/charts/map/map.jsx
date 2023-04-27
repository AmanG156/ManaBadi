/* eslint-disable prefer-destructuring */
import React from 'react';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import { colors } from '../../../../../theme';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const COLORS = [colors.torchRed, colors.yellow, colors.purple, colors.vibrantGreen, colors.reddishMagenta, colors.borderGrey, colors.pinkShade, colors.skyBlue, colors.persianBlue, colors.darkBrown, colors.seaGreen, colors.purpleShade, colors.dullGreen, colors.rosePink, colors.blackGreen];

function MapChart({ coordinatesData, setTooltipContent, uniqueCoutries }) {
  const getColor = (countryName) => {
    const findIndexValue = uniqueCoutries?.findIndex((i) => i === countryName);
    let color;
    if (findIndexValue === 1) {
      color = COLORS[0];
    }
    if (findIndexValue === 2) {
      color = COLORS[1];
    }
    if (findIndexValue === 3) {
      color = COLORS[2];
    }
    if (findIndexValue === 4) {
      color = COLORS[3];
    }
    if (findIndexValue === 5) {
      color = COLORS[4];
    }
    if (findIndexValue === 6) {
      color = COLORS[5];
    }
    if (findIndexValue === 7) {
      color = COLORS[6];
    }
    if (findIndexValue === 8) {
      color = COLORS[7];
    }
    if (findIndexValue === 9) {
      color = COLORS[8];
    }
    if (findIndexValue === 10) {
      color = COLORS[9];
    }
    if (findIndexValue === 11) {
      color = COLORS[10];
    }
    return color;
  };
  return (
    <ComposableMap data-tip="">
      <ZoomableGroup>
        <ComposableMap projection="geoAlbersUsa">
          <Geographies geography={geoUrl}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#FFF"
                    geography={geo}
                    fill="#DDD"
                    style={{ backgroundColor: '#DADADA' }}
                  />
                ))}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </ZoomableGroup>

      {coordinatesData?.map((i) => {
        return (
          <Marker
            coordinates={i?.coordinates}
            onMouseEnter={() => {
              setTooltipContent(`${i?.state}:${i?.count}`);
            }}
            onMouseLeave={() => {
              setTooltipContent('');
            }}
          >
            <circle
              cx={2}
              cy={2}
              r={8}
              fill={getColor(i?.name)}
              style={{
                stroke: '#FF5722',
                strokeWidth: 0,
              }}
            />
          </Marker>
        );
      })}
    </ComposableMap>
  );
}

export default MapChart;
