import React, { useState } from 'react';
import {
  TableCell,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';

export default function RegionTableCell(props) {
  const { rowData, upButtonClass, onEdit } = props;
  const [expandabel, setExpandable] = useState(false);

  return (
    <>
      <TableCell align="left" width="14%">
        {
          expandabel === true
            ? rowData?.region_courses?.map((res) => <p>{res?.course?.name}</p>)
            : rowData?.region_courses?.map((res, i) => (i === 0 ? <p>{res?.course?.name}</p> : ''))
        }
      </TableCell>
      <TableCell align="center" width="15%">
        <EditIcon onClick={() => onEdit(rowData)} />
        {
          expandabel === false
            ? <KeyboardArrowDownSharpIcon className={upButtonClass} onClick={() => setExpandable(!expandabel)} />
            : <KeyboardArrowUpSharpIcon className={upButtonClass} onClick={() => setExpandable(!expandabel)} />
        }
      </TableCell>
    </>
  );
}
