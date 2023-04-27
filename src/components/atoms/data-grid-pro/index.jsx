/* eslint-disable react/jsx-indent */
import React from 'react';
import {
  DataGridPro,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid-pro';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSort,
  faSortUp,
  faSortDown,
} from '@fortawesome/fontawesome-free-solid';
import { useTranslation } from 'react-i18next';
import Loader from '../loader';
import useStyles from '../../../custom-hooks/useStyles';
import style from './style';

function ColumnUnsortedIcon() {
  return <FontAwesomeIcon icon={faSort} />;
}

function ColumnSortedAscendingIcon() {
  return <FontAwesomeIcon icon={faSortUp} color="#C12900" />;
}

function ColumnSortedDescendingIcon() {
  return <FontAwesomeIcon icon={faSortDown} color="#C12900" />;
}

export default function DataGridProTable({
  data,
  columns,
  autoHeight,
  hideFooter,
  disableColumnFilter,
  disableColumnSelector,
  checkboxSelection,
  disableColumnMenu,
  disableSelectionOnClick,
  ColumnUnsorted,
  ColumnSortedAscending,
  ColumnSortedDescending,
  onSelectionModelChange,
  loading,
}) {
  const { t } = useTranslation('translation');
  const classes = useStyles(style)();

  const renderTable = () => (
        <Grid container className={classes.studentDetails}>
          <DataGridPro
            rows={data}
            disableColumnResize="false"
            disableColumnReorder="false"
            {...{
              columns,
              onSelectionModelChange,
              autoHeight,
              disableColumnFilter,
              hideFooter,
              disableColumnSelector,
              disableColumnMenu,
              disableSelectionOnClick,
              checkboxSelection,
            }}
            // rowHeight={80}
            className={classes.dataGrid}
            components={{
              ...(ColumnUnsorted && { ColumnUnsortedIcon }),
              ...(ColumnSortedAscending && { ColumnSortedAscendingIcon }),
              ...(ColumnSortedDescending && { ColumnSortedDescendingIcon }),
            }}
            initialState={{
              pinnedColumns: {
                left: [
                  GRID_CHECKBOX_SELECTION_COL_DEF.field,
                  'profilePhoto',
                  'studentName',
                ],
              },
            }}
          />
        </Grid>
  );
  return (
    <Grid container>
      {loading ? (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      ) : (
        data?.length > 0 && renderTable()
      )}
    </Grid>
  );
}
