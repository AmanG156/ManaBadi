/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import { Grid } from '@mui/material';
import { useState } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import { useTranslation } from 'react-i18next';
import ReactCrop from 'react-image-crop';
import DialogAtom from '../dialog';
import ProfileLogo from '../../../assets/images/profileUpload.png';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';

function DialogContent({
  srcImg, setImage, crop, setCrop,
}) {
  const classes = useStyles(styles)();
  const { t } = useTranslation('translation');
  return (
    <div className={classes.container}>
      <div className={classes.Imageupload}>
        {srcImg && (
        <div className={classes.modalContainer}>
          <ReactCrop
            style={{ maxWidth: '20vw', maxHeight: '20vw', borderRadius: '50%' }}
            src={srcImg}
            onImageLoaded={setImage}
            crop={crop}
            onChange={setCrop}
            minWidth={100}
            keepSelection
          />

        </div>
        )}
      </div>
      <div className={classes.instructionTitle}>
        {t('INSTRUCTIONS')}
      </div>
      <ul className={classes.list}>
        <li>
          {t('PROFILE_GUIDELINES.FIRST')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.SECOND')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.THIRD')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.FOURTH')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.FIFTH')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.SIXTH')}
        </li>
        <li>
          {t('PROFILE_GUIDELINES.SEVENTH')}
        </li>
      </ul>
    </div>
  );
}
function Imageupload({ setImageUpload, imageUploaded, isEditForm = false }) {
  const classes = useStyles(styles)();
  const { t } = useTranslation('translation');
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    width: 200,
    aspect: 1 / 1,
    x: 50,
    y: 50,
  });
  const [result, setResult] = useState(imageUploaded === '' ? ProfileLogo : imageUploaded);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImage = (event) => {
    setSrcImg(URL.createObjectURL(event.target.files[0]));
    handleOpen();
  };
  const handleDialogCancel = async () => {
    setSrcImg(URL.revokeObjectURL(setSrcImg));
    handleClose();
  };

  const getCroppedImg = async (event) => {
    try {
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,

      );
      const base64Image = canvas.toDataURL('image/jpeg', 1);
      setResult(base64Image);

      if (isEditForm) {
        // eslint-disable-next-line no-param-reassign
        event.target.name = 'profileImage';
        // eslint-disable-next-line no-param-reassign
        event.target.value = base64Image;
        setImageUpload(event);
      } else {
        setImageUpload(base64Image);
      }
    } catch (e) {
      // console.log('crop the image');
    }
  };

  const handleDialogSubmit = (e) => {
    getCroppedImg(e);
    handleClose();
  };

  return (
    <Grid fluid="md">
      <div className={classes.modalContainer}>
        <DialogAtom
          isOpen={open}
          dialogHeading={t('UPLOAD_PROFILE')}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          primaryButton={t('UPDATE_PHOTO')}
          content={(
            <DialogContent
              srcImg={srcImg}
              setImage={setImage}
              crop={crop}
              setCrop={setCrop}
            />

)}
          primaryHandle={handleDialogSubmit}
          secHandle={handleDialogCancel}
        />
        <div id="hide">
          <label>
            <input
              name="profileImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleImage(e)}
              className={classes.input}
              onClick={(event) => {
                // eslint-disable-next-line no-param-reassign
                event.currentTarget.value = null;
              }}
            />
            <img alt="profile-img" src={result} className={classes.profileImg} />
          </label>
        </div>
      </div>

    </Grid>
  );
}

export default Imageupload;
