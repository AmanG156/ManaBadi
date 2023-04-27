/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import {
  Table,
  Checkbox,
  Box,
  TableRow, TableBody, Tooltip, TableCell, Typography, TableContainer, Paper, TablePagination, Grid,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import IconButton from '@mui/material/IconButton';
import _ from 'lodash';
import Loader from '../loader';
import TextInput from '../textfield';
import DropDown from '../dropdown';
import style from './style';
// import { centerAlignedFields } from './constants';
import EnhancedTableHead from './EnhancedTableHead';
import { stableSort, getComparator } from './utils';
import { setLocalStorage, getRowsPerPage } from '../../../utils/localStorageMethod';
// import { formatValueToLocale } from '../../../utils/helperMethod';
// import { NUMERIC_FIELDS, CURRENCY_FIELDS, NUMERIC_FIELDS_EXCEPTION } from '../../../utils/constant';

function DataTabel({
  totalFee,
  columns, data, onCloumnAction, pagination, tableError, additionalHeaderColumns, onBlurColumn, loading,
}) {
  const classes = style();
  const ref = useRef('');
  const { t } = useTranslation();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState(_.get(columns[0], 'label', ''));
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(getRowsPerPage());
  const sortedData = stableSort(data, getComparator(order, orderBy));

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const rowsLength = event.target.value;
    setRowsPerPage(parseInt(rowsLength, 10));
    setPage(0);
    setLocalStorage('rowsPerPage', rowsLength);
  };

  const borderWidth = ref.current.offsetWidth;

  const getFieldError = (rowKey, colKey) => {
    const err = _.find(tableError, { key: rowKey });
    return _.get(err, colKey, '');
  };

  const getValue = (item, paths, separator = '-') => {
    let value = '';
    _.each(paths, (path, index) => {
      if (index === 0) value += _.get(item, path);
      else value += `${separator}${_.get(item, path)}`;
    });
    return value;
  };

  const getTableCell = (index, row, col) => {
    let cell;
    if (col.type === 'link') {
      cell = (
        <Typography
          className={classes.link}
          onClick={() => onCloumnAction(col.key, index, { row })}
        >
          {_.get(row, col.field)}
        </Typography>
      );
    } else if (col.type === 'success') {
      cell = (
        <Typography
          className={classes.sucessField}
        >
          {_.get(row, col.field)}
        </Typography>
      );
    } else if (col.type === 'warning') {
      cell = (
        <Typography
          className={classes.warningField}
        >
          {_.get(row, col.field)}
        </Typography>
      );
    } else if (col.type === 'icons') {
      cell = (
        <Box style={{ display: 'flex' }}>
          {col.icons.map((icon) => {
            let show = true;
            if (icon.visible) {
              const status = _.get(row, icon.visible.key);
              show = icon.visible.condition.includes(status);
            }
            return (
              show
                ? (
                  <Typography
                    className={classes.icons}
                    title={t(_.get(icon, 'title', ''))}
                    onClick={() => onCloumnAction(icon.key, index, { row })}
                  >
                    {icon.icon}
                  </Typography>
                )
                : <Typography style={{ minWidth: '60px' }} />
            );
          })}
        </Box>
      );
    } else if (col.type === 'chip') {
      cell = (
        <Tooltip title="Certificate">
          <IconButton onClick={() => onCloumnAction(col.key, index, { row })}>
            <PictureAsPdfIcon label={_.get(row, col.field)} />
          </IconButton>
        </Tooltip>
      );
    } else if (['text', 'number', 'email', 'password'].includes(col.type)) {
      cell = (
        <div className={classes.tableInputs}>
          <TextInput
            label=""
            type={col.type}
            name={col.key}
            placeholder=""
            disable={col.disabled || false}
            value={_.get(row, col.field)}
            onBlur={(e) => {
              onBlurColumn(col.key, index, { row, value: e.target.value });
            }}
            onChange={(e) => onCloumnAction(col.key, index, { row, value: e.target.value })}
          />
          <Tooltip title={getFieldError(row.key, col.key)} enterTouchDelay={0}>
            <Typography className={classes.inputErrors}>
              {getFieldError(row.key, col.key)}
            </Typography>
          </Tooltip>
        </div>
      );
    } else if (['checkbox'].includes(col.type)) {
      cell = (
        <Checkbox
          onChange={(e) => onCloumnAction(
            col.key,
            index,
            { row, value: e.target.checked },
          )}
          checked={_.get(row, col.field)}
        />
      );
    } else if (['dropdown'].includes(col.type)) {
      let items = _.get(row, col.optionInfo.path);
      items = items.map((item) => ({
        ...item,
        label: getValue(item, col.optionInfo.optLabel, _.get(col, 'optionInfo.labelSeparator', '-')),
        value: getValue(item, col.optionInfo.optLabel, _.get(col, 'optionInfo.keySeparator', '-')),
      }));
      cell = (
        <div className={classes.tableInputs}>
          <DropDown
            placeholder=""
            options={items}
            handleChange={(e) => onCloumnAction(col.key, index, { row, value: e.target.value })}
            value={_.get(row, col.field)}
          />
          <Tooltip title={getFieldError(row.key, col.key)} enterTouchDelay={0}>
            <Typography className={classes.inputErrors}>
              {getFieldError(row.key, col.key)}
            </Typography>
          </Tooltip>
        </div>
      );
    } else {
      const cellValue = _.get(row, col.field);
      // if (centerAlignedFields.includes(col.field)) {
      //   customClass = classes.numberField;
      // }
      // if (NUMERIC_FIELDS.includes(col.field)) {
      //   cellValue = formatValueToLocale(cellValue);
      // }
      // if (CURRENCY_FIELDS.includes(col.field)) {
      //   cellValue = formatValueToLocale(cellValue, true);
      // }
      // if (NUMERIC_FIELDS_EXCEPTION.includes(col.field)) {
      //   cellValue = formatValueToLocale(cellValue, false, 4);
      // }
      cell = (
        <Typography>
          {/* {col.textType === 'status' ? t(cellValue) : cellValue} */}
          {cellValue}
        </Typography>
      );
    }
    return (
      <TableCell key={col.field}>
        {cell}
      </TableCell>
    );
  };

  return (
    <Grid className={classes.tabel}>
      <TableContainer component={Paper} className={classes.mainTable}>
        <Table ref={ref} stickyHeader aria-label="sticky table">
          <EnhancedTableHead
            headCells={columns}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            additionalHeaderColumns={additionalHeaderColumns}
          />
          <TableBody>
            {
              (rowsPerPage > 0 && pagination
                ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : sortedData
              ).map((row, index) => (
                <TableRow
                  className={`${classes.tabelRowBody} ${classes.separator}`}
                  key={row.key ? row.key : Math.random(1, 10000000000)}
                >
                  {columns.map((col) => getTableCell(index, row, col))}
                </TableRow>
              ))
            }
            {loading && (
              <Grid>
                <Loader message={t('LOADING')} />
              </Grid>
            )}
            <TableRow>
              <TableCell colSpan={6} className={classes.totalFee}>
                {t('TOTAL_FEE')}
              </TableCell>
              <TableCell className={classes.totalFeeAmout}>
                {`$ ${totalFee()}`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* {totalFee
        ? (
          <span className={`${classes.footer} ${classes.separator}`}>
            <div>
              <span className={classes.totalFee}>
                {t('TOTAL_FEE')}
              </span>
              <span className={classes.totalFeeAmout}>
                {`$ ${totalFee()}`}
              </span>
            </div>
          </span>
        ) : null} */}
      {pagination && (
        <>
          <span className={classes.borderBtm} style={{ width: borderWidth }} />
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, { label: 'All', value: -1 }]}
            component="div"
            labelRowsPerPage={t('ROWS_PER_PAGE')}
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e)}
          />
        </>
      )}
    </Grid>
  );
}

DataTabel.propTypes = {
  columns: PropTypes.arrayOf(Object),
  data: PropTypes.arrayOf(Object),
  onCloumnAction: PropTypes.func,
  pagination: PropTypes.bool,
  tableError: PropTypes.arrayOf(Object),
  additionalHeaderColumns: PropTypes.arrayOf(Object),
  onBlurColumn: PropTypes.func,
};

DataTabel.defaultProps = {
  columns: [],
  data: [],
  onCloumnAction: () => { },
  pagination: true,
  tableError: [],
  additionalHeaderColumns: [],
  onBlurColumn: () => { },
};

export default DataTabel;
