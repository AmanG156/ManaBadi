/* eslint-disable camelcase */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import moment from 'moment';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from './style';

export default function AnnouncementsTable({ tableData, onAnnouncementView }) {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const returnJSXFragment = (tag) => tag;

  return (
    <TableContainer>
      <Table sx={12} aria-label="simple table">
        <TableHead className={classes.announcementTable}>
          <TableRow>
            <TableCell>{t('EMAIL_SUBJECT')}</TableCell>
            <TableCell align="left">{t('BODY')}</TableCell>
            <TableCell aria-sort="descending" align="left">{t('CREATED_ON')}</TableCell>
            <TableCell align="left">{t('CREATED_BY')}</TableCell>
            <TableCell align="center">{t('Actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.announcementTable} aria-sort="descending">
          {tableData?.map((row) => (
            <TableRow
              key={row?.subject}
              sx={{
                '&:last-child td, &:last-child th': { borderBottom: 0 },
              }}
            >
              <TableCell component="th" scope="row">
                {row?.subject}
              </TableCell>
              <TableCell align="left">
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: returnJSXFragment(row.body) }}
                />
              </TableCell>
              <TableCell align="left" aria-sort="descending">
                {moment(row?.createdAt).format('MMM DD, YYYY HH:mm:ss a')}
              </TableCell>
              <TableCell align="left">
                {`${row?.user?.first_name} ${row?.user?.last_name}`}
              </TableCell>
              <TableCell align="center">
                <ChatBubbleOutlineIcon onClick={() => onAnnouncementView(row)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {' '}
      </Table>
    </TableContainer>
  );
}
