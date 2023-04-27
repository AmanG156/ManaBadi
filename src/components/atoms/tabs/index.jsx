/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function TabsAtom({
  options, onTabClick, value,
}) {
  const { t } = useTranslation();

  return (
    <AppBar position="static">
      <Tabs value={value} aria-label="simple tabs example">
        {options.map((opt, index) => (
          <Tab
            key={opt.key}
            style={{ textTransform: 'none' }}
            label={t(opt.label)}
            onClick={() => onTabClick({ ...opt, index })}
            disableRipple
          />
        ))}
      </Tabs>
    </AppBar>
  );
}

TabsAtom.propTypes = {
  options: PropTypes.arrayOf(Object),
  onTabClick: PropTypes.func.isRequired,
  value: PropTypes.number,
};

TabsAtom.defaultProps = {
  options: [],
  value: 0,
};

export default TabsAtom;
