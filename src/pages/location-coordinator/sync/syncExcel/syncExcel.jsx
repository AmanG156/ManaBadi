/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';
// import MaterialTable from 'material-table';
// import XLSX from 'xlsx';
import { Buttons } from '../../../../constant';
import ButtonAtom from '../../../../components/atoms/button/index';

function SyncExcel() {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',');
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n');

    const array1 = csvRows.map((i) => {
      const values = i.split(',');
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array1);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };

  const headerKeys = Object.keys(Object.assign({}, ...array));

  return (
    <Box style={{ textAlign: 'center' }} className={classes.fileName}>
      <Box>
        {/* <form> */}
        <input
          type="file"
          id="csvFileInput"
          accept=".csv"
          className={classes.inputFileCSV}
          onChange={handleOnChange}
        />

        <ButtonAtom
          btntype={Buttons.PRIMARY}
          name={t('UPLOAD')}
          // className={classes.buttonLeft}
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </ButtonAtom>
        {/* </form> */}
      </Box>

      <br />

      <Box className={classes.outputCsvFile}>
        <table className={classes.table1}>
          <thead>
            <tr key="header">
              {headerKeys.map((key) => (
                <th className={classes.th1}>{key}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {array.map((item) => (
              <tr key={item.id}>
                {Object.values(item).map((val) => (
                  <td className={classes.td1}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

    </Box>

  );
}

export default SyncExcel;
