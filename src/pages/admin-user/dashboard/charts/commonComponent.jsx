import React from 'react';
import { useTranslation } from 'react-i18next';

const renderCustomizedLabel = ({
  fill,
  name,
  percent,
  x,
  y,
}) => (
  <g>
    <rect x={x} y={y} fill={fill} width={120} height={30} rx={3} />
    <text
      fill="#fff"
      x={x}
      y={y}
      className="recharts-text recharts-pie-label-text"
      dy={20}
      dx={10}
      textLength={100}
      fontSize="12px"
    >
      {name}
      :
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  </g>
);

function getName(payloadName, t) {
  let name = '';
  if (payloadName === 'false') {
    name = t('NEW_STUDENTS');
  } else if (payloadName === 'true') {
    name = t('RETURN_STUDENTS');
  } else {
    name = payloadName;
  }
  return name;
}
function CustomTooltip(props) {
  const customTooltip = {
    color: 'white',
    padding: '6px 10px',
    borderRadius: '4px',
    position: 'relative',
  };
  const arrowRight = {
    position: 'absolute',
    right: -5,
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    marginTop: -5,
    top: '50%',
  };
  const arrowLeft = {
    position: 'absolute',
    left: -5,
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    marginTop: -5,
    top: '50%',
  };
  const {
    active, payload, coordinate,
  } = props;
  const { t } = useTranslation();

  if (active && payload?.length) {
    const totalValue = payload[0]?.payload?.totalValue;
    const percentage = ((payload[0].value / totalValue) * 100).toFixed(1);

    return (
      <div style={{
        background: payload[0]?.payload?.fill,
        ...customTooltip,
      }}
      >
        {getName(payload[0].name, t)}
        :
        {`${payload[0]?.value} (${percentage}%)`}
        <div style={coordinate?.x <= 100 && coordinate?.y <= 100
          ? { borderLeft: `6px solid ${payload[0]?.payload?.fill}`, ...arrowRight }
          : { borderRight: `6px solid ${payload[0]?.payload?.fill}`, ...arrowLeft }}
        />
      </div>
    );
  }
  return <div />;
}

export { renderCustomizedLabel, CustomTooltip };
