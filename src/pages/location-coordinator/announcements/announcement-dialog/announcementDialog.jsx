/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import DoneAll from '@mui/icons-material/DoneAll';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTranslation } from 'react-i18next';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { DialogAtom } from '../../../../components/atoms';
import useStyles from '../../../../custom-hooks/useStyles';
import {
  getAnnouncementById,
} from '../../../../store/actions/getEmail';
import styles from './style';

function AnnouncementDialog({ isOpen, onDialogClose, selectedAnnouncement }) {
  const classes = useStyles(styles)();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const returnJSXFragment = (tag) => tag;

  useEffect(() => {
    if (selectedAnnouncement && selectedAnnouncement.id) {
      dispatch(getAnnouncementById(selectedAnnouncement?.id));
    }
  }, [selectedAnnouncement?.id]);

  const locationCoordinatorData = useSelector((state) => state?.getLocationCoordinator);
  const announcementDetails = locationCoordinatorData?.announcementDetails;
  const [read, setRead] = useState(0);
  const [unRead, setUnRead] = useState(0);

  useEffect(() => {
    let r = 0;
    let u = 0;
    announcementDetails?.email_analytics?.forEach((obj) => {
      if (obj.isRead) {
        r += 1;
      } else {
        u += 1;
      }
    });
    setRead(r);
    setUnRead(u);
  }, [announcementDetails]);

  return (
    <DialogAtom
      isOpen={isOpen}
      secHandle={onDialogClose}
      customClass={classes.announcementDialogAtom}
      content={(
        <Box className={classes.announcementDetails}>
          <Box className={classes.threeBoxes}>
            <Box className={classes.firstBox}>
              <Typography className={classes.textGreen}>
                <b>{announcementDetails?.email_analytics?.length}</b>
              </Typography>
              <Box className={classes.insideBox}>
                <Typography>
                  <AddTaskIcon className={classes.iconGreen} />
                </Typography>
                <Typography variant="caption" className={classes.boxDetails}>Message Sent</Typography>
              </Box>
            </Box>

            <Box
              className={classes.firstBox}
            >
              <Typography className={classes.textPrimary}>
                <b>{read}</b>
              </Typography>
              <Box className={classes.insideBox}>
                <Typography>
                  <VisibilityIcon className={classes.iconPrimary} />
                </Typography>
                <Typography className={classes.boxDetails}>Read</Typography>
              </Box>
            </Box>

            <Box
              className={classes.firstBox}
            >
              <Typography className={classes.textGrey}>
                {unRead}
              </Typography>
              <Box className={classes.insideBox}>
                <Typography>
                  <VisibilityOffIcon className={classes.iconGrey} />
                </Typography>
                <Typography className={classes.boxDetails}>Unread</Typography>
              </Box>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography style={{ marginBottom: '10px' }}>
              <b className={classes.menssageHeader}>{`${t('SENDER')}:`}</b>
              {' '}
              {`${announcementDetails?.user?.manabadiEmail}`}
            </Typography>
            <Typography style={{ marginBottom: '10px' }}>
              <b className={classes.menssageHeader}>{`${t('MAIL_SUBJECT')}:`}</b>
              {' '}
              {announcementDetails?.subject}
            </Typography>
            <Typography>
              <p><b className={classes.menssageHeader}>{`${t('SENT_ON_DATE')}:`}</b></p>
              {' '}
              {
                announcementDetails && announcementDetails.createdAt && moment(announcementDetails.createdAt).format('MMM DD,YYYY h:mm:ss a')
              }
            </Typography>
          </Box>

          <Box className={classes.mailID}>
            <Typography>
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: returnJSXFragment(announcementDetails?.body) }}
              />
            </Typography>
          </Box>

          <TableContainer>
            <Table sx={12} aria-label="simple table" className={classes.analytics}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">{t('SENT_TO')}</TableCell>
                  <TableCell align="center">{t('SENT_ON')}</TableCell>
                  <TableCell align="center">{t('DELIVERY')}</TableCell>
                  <TableCell align="center">{t('READ')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.announcementTable}>
                {announcementDetails?.email_analytics?.map((row) => (
                  <TableRow>

                    <>
                      <TableCell component="th" scope="row" align="center">
                        {row?.sentTo}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.updatedAt ? moment(row.updatedAt).format('MMM DD/YYYY h:mm a') : '-'}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.isDelivery && row.updatedAt ? (
                          <Typography>
                            <AddTaskIcon className={classes.iconGreen} />
                          </Typography>
                        ) : row.isDelivery ? (
                          <Typography>
                            <DoneAll className={classes.iconPrimary} />
                          </Typography>
                        ) : (
                          <Typography>
                            <AddTaskIcon className={classes.iconRed} />
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row" align="center">
                        {row.isRead ? (
                          <Typography>
                            <div>
                              <DoneAll className={classes.iconGreen} />
                            </div>
                          </Typography>
                        ) : (
                          <Typography>
                            <div>
                              <DoneAll className={classes.iconRed} />
                            </div>
                          </Typography>
                        )}
                      </TableCell>

                    </>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      dialogHeading={t('VIEW_ANNOUNCEMENT')}
    />

  );
}

export default AnnouncementDialog;
