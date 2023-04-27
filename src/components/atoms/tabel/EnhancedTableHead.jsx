import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import style from './style';
import AdditionalHeaderRow from './AdditionalHeaderRow';

function EnhancedTableHead(props) {
  const {
    headCells,
    order,
    orderBy,
    onRequestSort,
    additionalHeaderColumns,
  } = props;
  const classes = style();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  const { t } = useTranslation();
  const translatedCells = headCells.map((headCell) => ({
    ...headCell,
    translatedLabel: t(headCell.label),
  }));

  return (
    <TableHead>
      {additionalHeaderColumns.length > 0
        && <AdditionalHeaderRow columns={additionalHeaderColumns} />}
      <TableRow className={`${classes.tabelRowHead} ${classes.separator}`}>
        {translatedCells.map((headCell) => (
          <TableCell
            key={headCell.field}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.field ? order : false}
          >
            <TableSortLabel
              title={headCell.translatedLabel === 'tDER' ? t('TDER_TOOLTIP') : ''}
              active={orderBy === headCell.field}
              direction={orderBy === headCell.field ? order : 'asc'}
              onClick={createSortHandler(headCell.field)}
              className={headCell.translatedLabel === 'tDER' ? `${classes.tderHead}` : ''}
            >
              {headCell.translatedLabel}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.arrayOf(Object).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  additionalHeaderColumns: PropTypes.arrayOf(Object),
};

EnhancedTableHead.defaultProps = {
  additionalHeaderColumns: [],
};

export default EnhancedTableHead;
