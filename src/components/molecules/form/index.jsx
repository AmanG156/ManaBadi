/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box, Typography, Checkbox,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DropDown from '../../atoms/dropdown';
import style from './style';
import TextInput from '../../atoms/textfield';
import ButtonAtom from '../../atoms/button';
import UploadButton from '../../atoms/uploadbutton';

function FormBuilder({
  formFields, onButtonAction, onFieldChange, flag, getFileContent,
  // eslint-disable-next-line max-len
  adressErrorCheckBox, onAddressCheckBoxChange, buttonUI, onDoctorCheckBoxChange, doctorCheckBox, addMargin,
}) {
  const classes = style();
  const { t, i18n } = useTranslation();

  const getPlaceHolder = (placeholder, isRequired) => {
    if (['PHARMACY_CONTACT_NO', 'PHONE_NUMBER'].includes(placeholder)) {
      return '+49 152 12345678';
    }
    return (i18n.t(placeholder) + (isRequired ? '*' : ''));
  };

  const fileToDataUri = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });
  const onFileUpload = (index, key, file, acceptType = '') => {
    if (acceptType === 'image/*' && !_.startsWith(_.get(file, 'type', ''), 'image/')) {
      return;
    }
    onFieldChange(index, key, file.name);
    fileToDataUri(file)
      .then((dataUri) => {
        getFileContent(index, key, dataUri);
      });
  };
  const profileButtonUi = () => {
    if (buttonUI) {
      return classes.profileViewBtn;
    }
    return null;
  };
  const profileBtn = () => {
    if (buttonUI) {
      return classes.profileBtn;
    }
    return classes.profileContainer;
  };
  const saveBtn = () => {
    if (buttonUI) {
      return t('SAVE_ARROW');
    }
    return t('SAVE');
  };
  const cancelBtn = () => {
    if (buttonUI) {
      return t('CANCEL_ARROW');
    }
    return t('CANCEL');
  };
  return (
    <Box className={classes.leftLoginDetails}>
      {formFields.map((field, index) => (
        <Box display="flex" key={field.key} className={`${classes.textField} ${buttonUI ? classes.profileFields : ''}`}>
          { buttonUI && field.type !== 'textarea'
            ? (
              <Box className={classes.label} key={field.placeholder}>
                {t(field.placeholder)}
                {field.required && <Typography className={classes.asterik}>*</Typography>}
                {field.key === 'certificateFileName' && field.userType === 'therapist' ? (
                  <Checkbox
                    onChange={(e) => onDoctorCheckBoxChange(e.target.checked)}
                    checked={_.get(doctorCheckBox, 'checked')}
                    style={{ marginTop: '-12px' }}
                  />
                ) : ''}
              </Box>
            ) : ''}
          {['text', 'number', 'email', 'password', 'tel'].includes(field.type) && (
            <TextInput
              label=""
              type={field.type}
              name={field.key}
              key={field.key}
              placeholder={getPlaceHolder(field.placeholder, field.required)}
              disable={field.disabled}
              value={field.value || ''}
              error={field.error}
              errorText={field.errorText}
              onKeyUp={(e) => {
                if (e.code === 'Enter') {
                  onButtonAction('save');
                }
              }}
              onChange={(e) => onFieldChange(index, field.key, e.target.value)}
              customFormControlCss={{ width: '100%' }}
            />
          )}
          {field.type === 'dropdown' && (
            <DropDown
              label=""
              name={field.key}
              key={field.key}
              changeCss
              value={field.value}
              options={field.options}
              placeholder={t(field.placeholder)}
              handleChange={(e) => onFieldChange(index, field.key, e.target.value)}
              customFormControlCss={{ width: '100%' }}
            />
          )}
          {field.type === 'upload' && (
            <UploadButton
              label=""
              name={field.key}
              key={field.key}
              placeholder={t(field.placeholder)}
              fileName={field.value ? field.value : ''}
              onChange={(e) => {
                onFileUpload(index, field.key, e.target.files[0], _.get(field, 'fileType', ''));
              }}
              customFormControlCss={{ width: '100%' }}
              accept={_.get(field, 'fileType', '')}
            />
          )}
          { field.type === 'textarea' && (
          <div className="multilined-input">
            <CKEditor
              editor={ClassicEditor}
              data={field.value || ''}
              config={{
                toolbar: {
                  removeItems: ['uploadImage'],
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                onFieldChange(index, field.key, data);
              }}
            />
          </div>
          )}
        </Box>
      ))}
      {adressErrorCheckBox.show ? (
        <Box style={{ display: 'flex' }}>
          <Typography style={{ marginTop: '10px', color: 'red' }}>
            {t('INVALID_ADDRESS')}
            {' '}
            <br />
            {' '}
            {t('INVALID_ADDRESS_MSG')}
          </Typography>
          <Checkbox
            onChange={(e) => onAddressCheckBoxChange(e.target.checked)}
            checked={adressErrorCheckBox.checked}
            style={{ marginTop: '-12px' }}
          />
        </Box>
      ) : ''}
      <Box className={profileBtn()} display="flex" style={{ marginTop: addMargin ? 40 : 0 }}>
        <Box className={classes.buttonBox} />
        { flag ? null
          : (
            <>
              <Box mr={1} className={profileButtonUi()}>
                <ButtonAtom label={saveBtn()} onClick={() => onButtonAction('save')} customButtonCss={{ width: '100%', background: '#7cc4a3' }} />
              </Box>
              <Box className={profileButtonUi()}>
                <ButtonAtom label={cancelBtn()} onClick={() => onButtonAction('cancel')} customButtonCss={{ width: '100%', background: '#1a2732' }} />
              </Box>
            </>
          )}
      </Box>
    </Box>
  );
}

FormBuilder.propTypes = {
  formFields: PropTypes.arrayOf(Object),
  onButtonAction: PropTypes.func,
  onFieldChange: PropTypes.func,
  flag: PropTypes.bool,
  getFileContent: PropTypes.func,
  adressErrorCheckBox: PropTypes.arrayOf,
  onAddressCheckBoxChange: '',
  onDoctorCheckBoxChange: '',
  doctorCheckBox: '',
};

FormBuilder.defaultProps = {
  formFields: [],
  onButtonAction: '',
  onFieldChange: '',
  flag: false,
  getFileContent: '',
  adressErrorCheckBox: {},
  onAddressCheckBoxChange: '',
  doctorCheckBox: {},
  onDoctorCheckBoxChange: '',
};

export default FormBuilder;
