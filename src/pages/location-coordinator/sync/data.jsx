import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  studentName: string,
  studentDob: string,
  parentName: string,
  course: string,
  section: string,
) {
  return {
    studentName, studentDob, parentName, course, section,
  };
}

const rows = [
  createData('Ramesh Kumar', '2015-12-18', 'Ram Kumar', 'Balabadi-1', 'A'),
  createData('Rama Kumar', '2015-12-18', 'Ram Kumar', 'Balabadi-1', 'B'),
  createData('Suresh Kumar', '2015-12-18', 'Ram Kumar', 'Balabadi-1', 'A'),
  createData('Sara Kumar', '2015-12-18', 'Ram Kumar', 'Balabadi-1', 'C'),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Student D.O.B.</TableCell>
            <TableCell>Parent Name</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.studentName}
              </TableCell>
              <TableCell>{row.studentDob}</TableCell>
              <TableCell>{row.parentName}</TableCell>
              <TableCell>{row.course}</TableCell>
              <TableCell>{row.section}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
