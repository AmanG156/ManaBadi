import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow, TableCell,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isEmpty } from 'lodash';
// import useCommonStyles from '../../../theme/useCommonStyles';
import style from './style';

function AdditionalHeaderRow({ columns }) {
  // const commonClasses = useCommonStyles();
  // eslint-disable-next-line no-unused-vars
  const classes = style();
  const { t } = useTranslation();
  return (
    <TableRow>
      {columns.map((col) => {
        if (!isEmpty(col)) {
          return (
            <TableCell align="center" colSpan={col.colspan} className={classes.separator}>
              {t(col.label)}
            </TableCell>
          );
        }
        return <TableCell />;
      })}
    </TableRow>
  );
}

AdditionalHeaderRow.propTypes = {
  columns: PropTypes.arrayOf(Object),
};

AdditionalHeaderRow.defaultProps = {
  columns: [],
};

export default AdditionalHeaderRow;
