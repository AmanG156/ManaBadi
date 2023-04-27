import React from 'react';
import { ReactComponent as Svg } from '../images/mail.svg';

function MailIconSVG(color) {
  return (
    <div className="App">
      <Svg style={{ width: '15px !important', height: '15px', color: color || '#015EEA' }} />
    </div>
  );
}
export default MailIconSVG;
