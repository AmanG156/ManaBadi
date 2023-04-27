/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import React, { useState, useRef } from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CSVLink } from 'react-csv';

import ExamCenterManagerTable from './exam-center-manager-table/index';
import CheckboxAtom from '../../../components/atoms/checkbox';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons } from '../../../constant';
import { useStyles } from './style';

export default function ExamCenterManager() {
  const { t } = useTranslation();
  const classes = useStyles();
  const csvLink = useRef();

  const [dataForDownload, setDataForDownload] = useState([]);
  const [isDeactivateChecked, setIsDeactivateChecked] = useState(false);
  const [status, setStatus] = useState(false);
  const [selectedRow, setSelectedRow] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [bDownloadReady, setDownloadReady] = useState(false);
  const now = moment().format('DD-MM-yyyy');
  const currentTime = moment().format('hh:mm');
  const name = 'Exam-Center-Manager';

  const handleInactive = () => {
    setIsDeactivateChecked(!isDeactivateChecked);
  };

  return (
    <Grid className={classes.roleRoot}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('EXAM_CENTER_MANAGER')}
          </Typography>
        </Grid>
        <Grid className={classes.dFlex}>
          <div>
            <ButtonAtom
              className={classes.addbutton}
              name={t('EXPORT_TO_CSV')}
              btntype={Buttons.PRIMARY}
              type={Buttons.PRIMARY}
              onClick={() => exportRoleList()}
            />
            <CSVLink
              data={dataForDownload}
              filename={`${name} - ${now} - ${currentTime}`}
              className="hidden"
              ref={csvLink}
              target="_blank"
            />
          </div>
          <ButtonAtom
            className={classes.addbutton}
            name={t('ADD')}
            btntype={Buttons.PRIMARY}
            type={Buttons.PRIMARY}
            onClick={() => {
              setSelectedRow([]);
              setIsEdit(false);
            }}
            icon={<AddIcon />}
          />
        </Grid>
      </Grid>
      <div className={classes.deactiveCheckbox}>
        <CheckboxAtom
          label={t('VIEW_INACTIVE')}
          id="acceptCheckbox"
          checked={isDeactivateChecked}
          customClasses={classes.viewInactive}
          handleChange={() => handleInactive()}
        />
      </div>
      <Grid container className={classes.roleManagerContainer}>
        <Grid container className={classes.roleManagerList}>
          <Grid className={classes.tableView}>
            <ExamCenterManagerTable />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
