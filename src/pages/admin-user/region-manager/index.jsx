import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSVLink } from 'react-csv';
import CheckboxAtom from '../../../components/atoms/checkbox';
import RegionManagerTable from './region-manager-table';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons, NavigateRoutes } from '../../../constant';
import { useStyles } from './style';
import { getRegions } from '../../../store/actions/getRegion';
import AddRegionDialog from './add';
import RegionExportDialog from './export';
import { Loader } from '../../../components/atoms';

export default function RegionManager() {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const regionStore = useSelector((state) => state.getRegion);
  const [showExportDialog, setExportDialog] = useState(false);
  const csvLink = useRef();
  const [viewInactive, setViewInactive] = useState(false);
  const [dataForDownload] = useState([]);
  const [bDownloadReady, setDownloadReady] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (csvLink && csvLink.current && bDownloadReady) {
      csvLink.current.link.click();
      setDownloadReady(false);
    }
  }, [bDownloadReady]);

  useEffect(() => {
    dispatch(getRegions(setLoading));
  }, []);
  const [showAddRegionDialog, setShowAddRegionDialog] = useState('');
  const [selectedRegion, setSelectedRegion] = useState({});
  const navigate = useNavigate();

  const viewLogs = (onClose) => {
    onClose(false);
    navigate(NavigateRoutes.STUDENTS_LOGS, {
      state: {
        id: selectedRegion?.id,
        lastRoute: NavigateRoutes.REGION_MANAGER_VIEW,
      },
    });
  };

  const getRegionTableData = () => {
    let tableData = regionStore?.regions || [];
    if (viewInactive) {
      tableData = tableData?.filter((rowData) => rowData.isActive === false);
    } else {
      tableData = tableData?.filter((rowData) => rowData.isActive === true);
    }
    return tableData;
  };

  const onAddRegion = () => {
    setShowAddRegionDialog('');
    dispatch(getRegions(setLoading));
  };

  return (
    <Grid className={classes.regionRoot}>
      <Grid container item className={classes.titleRow}>
        <Grid item>
          <Typography className={classes.headerTitle}>
            {t('REGION_MANAGER')}
          </Typography>
        </Grid>
        <Grid className={classes.dFlex}>
          <div>
            <ButtonAtom
              className={classes.addbutton}
              name={t('EXPORT_TO_CSV')}
              btntype={Buttons.PRIMARY}
              type={Buttons.PRIMARY}
              onClick={() => setExportDialog(true)}
            />
            <CSVLink
              data={dataForDownload}
              filename="region-list.csv"
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
              setSelectedRegion(false);
              setShowAddRegionDialog('add');
            }}
            icon={<AddIcon className={classes.addIconSize} />}
          />
        </Grid>
      </Grid>
      <Grid className={classes.dFlexIcon}>
        <CheckboxAtom
          label={t('VIEW_INACTIVE')}
          id="acceptCheckbox"
          checked={viewInactive}
          handleChange={(e) => {
            setViewInactive(e.target.checked);
          }}
        />
      </Grid>
      <Grid container className={classes.regionManagerContainer}>
        <Grid container className={classes.regionManagerList}>
          <Grid className={classes.tableView}>
            <RegionManagerTable
              tableData={getRegionTableData()}
              onEdit={(row) => {
                setSelectedRegion(row);
                setShowAddRegionDialog('edit');
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {showAddRegionDialog && (
        <AddRegionDialog
          open={showAddRegionDialog}
          selectedRegion={showAddRegionDialog !== 'add' ? selectedRegion : {}}
          handleClose={() => setShowAddRegionDialog('')}
          addRegion={onAddRegion}
          {...{ loading, setLoading, viewLogs }}
        />
      )}
      <RegionExportDialog
        show={showExportDialog}
        setShow={() => setExportDialog(false)}
        data={getRegionTableData()}
      />
      {loading ? (
        <Grid>
          <Loader message={t('LOADING')} />
        </Grid>
      ) : null}
    </Grid>
  );
}
