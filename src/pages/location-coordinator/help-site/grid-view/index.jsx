/* eslint-disable no-shadow */
import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import {
  Grid,
  Box,
  Typography,
  CardActionArea,
} from '@mui/material';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import FileViewer from 'react-file-viewer';
// import { tableData } from '../constant';
import useStyles from '../../../../custom-hooks/useStyles';
import styles from '../../../resources/style';

// react file viewer
export default function ResourcesData({ tableData }) {
  // const { t } = useTranslation();
  const classes = useStyles(styles)();
  // const [sampleData, setSampleData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://random-data-api.com/api/users/random_user?size=30');
  //     const dummyData = await response.json();
  //     setSampleData(dummyData.slice(0, 5));
  //     console.log('response => ', dummyData);
  //   };
  //   fetchData();
  // }, []);
  const file = 'http://techslides.com/demos/sample-videos/small.mp4';
  const type = 'mp4';

  return (
    // <Box sx={{ flexGrow: 1 }}>
    //   <Grid sx={{ width: '100%' }} spacing={4}>
    //     <Grid container flexDirection="row" display="flex" className={classes.divWrapper}>
    //       <Grid item className={classes.HeaderWrapper}>
    //         {sampleData.map((Data) => (
    //           <Grid item lg={3} xs={6} md={3} className={classes.alignGrid}>
    //             <Card sx={{ maxWidth: 400, maxHeight: 250 }}>
    //               <CardActionArea>
    //                 <Grid container>
    //                   <CardMedia
    //                     onClick={handleToggle}
    //                     component="img"
    //                     height="100"
    //                     image={Data.avatar}
    //                     alt={t('ICON')}
    //                   />
    //                 </Grid>
    //               </CardActionArea>
    //               <CardContent className={classes.resourceName}>
    //                 <Typography>
    //                   {Data.username}
    //                 </Typography>
    //               </CardContent>
    //             </Card>
    //           </Grid>
    //         ))}
    //       </Grid>
    //     </Grid>
    //     <Backdrop
    //       sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //       open={open}
    //       onClick={handleClose}
    //     >
    //       <div className={classes.fileViewer}>
    //         <FileViewer fileType="csv" filePath="https://www.stats.govt.nz/assets/Uploads/Annual-enterprise-survey/Annual-enterprise-survey-2020-financial-year-provisional/Download-data/annual-enterprise-survey-2020-financial-year-provisional-csv.csv" />
    //       </div>
    //     </Backdrop>
    //   </Grid>
    // </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} className={classes.resourceGrid}>
        {tableData.map((obj) => (
          <Grid item lg={2} xs={12} sm={6} md={3} className={classes.alignResourceGrid}>
            <Card className={classes.resourcesCard}>
              <CardActionArea className={classes.resourceGridCardImg} onClick={handleToggle}>
                <Grid lg={2} xs={12} sm={6} md={3} className={classes.resourceGridCard}>
                  <OndemandVideoOutlinedIcon />
                </Grid>
              </CardActionArea>
              <CardContent className={classes.resourceName}>
                <Typography className={classes.fileNameStyle}>
                  {obj.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <div className={classes.fileViewer}>
            <FileViewer fileType={type} filePath={file} />
          </div>
        </Backdrop>
      </Grid>
    </Box>
  );
}
