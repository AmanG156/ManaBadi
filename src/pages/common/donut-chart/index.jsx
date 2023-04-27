import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useTranslation } from 'react-i18next';
import useStyles from '../../../custom-hooks/useStyles';
import colorPalete from '../courses-color-palette';
import styles from './style';

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
function CustomTooltip(props, isPercentageEnabled = false) {
  const customTooltip = {
    color: isPercentageEnabled ? '#242424' : 'white',
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
  const { active, payload, coordinate } = props;
  const { t } = useTranslation();
  if (active && payload?.length) {
    let totalValue; let
      percentage;
    if (isPercentageEnabled) {
      totalValue = payload[0]?.payload?.totalValue;
      percentage = ((payload[0].value / totalValue) * 100).toFixed(1);
      payload[0].payload.fill = '#fff';
      customTooltip.border = '1px solid #242424';
      arrowLeft.borderTop = 'none';
      arrowLeft.borderBottom = 'none';
      arrowRight.borderTop = 'none';
      arrowRight.borderBottom = 'none';
    }

    return (
      <div style={{
        background: payload[0]?.payload?.fill,
        ...customTooltip,
      }}
      >
        {getName(payload[0].name, t)}
        :
        {isPercentageEnabled ? `${payload[0]?.value} (${percentage}%)` : payload[0]?.value}
        <div style={coordinate?.x <= 100 && coordinate?.y <= 100
          ? { borderLeft: `6px solid ${payload[0]?.payload?.fill}`, ...arrowRight }
          : { borderRight: `6px solid ${payload[0]?.payload?.fill}`, ...arrowLeft }}
        />
      </div>
    );
  }
  return <div />;
}
const defaultColors = ['#ffffbe', '#b3b385', '#e5ffbe', '#fff2be', '#b3a985', '#b3a985', '#aa8e74', '#b7f3a5', '#80aa74', '#c5a5f3'];

export default function DonutChart({ renderCusomizedLegend, chartsData, renderCustomizedLabel }) {
  const totalValue = chartsData.reduce((sum, item) => {
    // eslint-disable-next-line no-param-reassign
    sum += parseInt(item.value, 10);
    return sum;
  }, 0);
  // eslint-disable-next-line no-param-reassign
  chartsData = chartsData.map((item) => {
    // eslint-disable-next-line no-param-reassign
    item.totalValue = totalValue;
    return item;
  });
  const classes = useStyles(styles)();
  return (
    <ResponsiveContainer>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="top"
          wrapperStyle={{
            padding: '10px',
          }}
          iconType="circle"
          content={(value) => renderCusomizedLegend(value, classes)}
        />
        <Pie
          data={chartsData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={false}
          outerRadius="80%"
          innerRadius="50%"
          fill="#8884d8"
          dataKey="value"
        >
          {chartsData.map((entry, index) => {
            const color = colorPalete(entry.name) || defaultColors[index];
            return <Cell key={`cell-${index}`} fill={color} />;
          })}
        </Pie>
        <Tooltip
          content={(value) => CustomTooltip(value, true)}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
