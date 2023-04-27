import React from 'react';
import { ReactComponent as Svg } from '../images/menuBarLines.svg';

function MenuBarIconSVG() {
  return (
    <div className="App">
      <Svg
        style={{ width: '15px !important', height: '15px', color: '#015EEA' }}
      />
    </div>
  );
}
export default MenuBarIconSVG;
