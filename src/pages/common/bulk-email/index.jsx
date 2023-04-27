/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Grid,
  Typography,
  Box,
  Button,
  Link,
  Autocomplete,
  TextField,
  FormControl,
  Tooltip,
  Stack,
  InputLabel,
  Select,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from 'draft-js';
import { FormikProvider, useFormik } from 'formik';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { useDispatch, useSelector } from 'react-redux';
import { of } from 'ramda';
import { element } from 'prop-types';
import { GridSearchIcon } from '@mui/x-data-grid';
import styles from './style';
import useStyles from '../../../custom-hooks/useStyles';
import TextFieldAtom from '../../../components/atoms/text-field-with-label';
import Dropdown from '../../../components/atoms/dropdown-with-label';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import DialogAtom from '../../../components/atoms/dialog';
import commonStyles from '../../../utils/commonClasses';
import ButtonAtom from '../../../components/atoms/button';
import { Buttons, NavigateRoutes } from '../../../constant';
import Constant from '../../../store/constant';
import Loader from '../../../components/atoms/loader';
import {
  saveEmailTemplate,
  getEmailTemplate,
  getEmailFilters,
  sendAnnouncement,
  getRecipientsByFilter,
  getSubstitutionTagsList,
} from '../../../store/actions/getEmail';
import { GroupedAutoComplete } from '../../../components/atoms';
import AutoCompleteMultiSelect from '../../../components/atoms/auto-complete-multi-select';
import Filters from './filters/filters';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorageMethod';
import userRoles from '../../../constant/userRoles';
import CheckboxesAtom from '../../../components/atoms/checkbox';
import { DataList } from './helper';
// let loading = useState(false);

const substitutionTagsAdmin = [{
  title: 'User Info',
  options: [
    {
      key: 'contact_number',
      text: 'User Contact Number',
    },
    {
      key: 'user_address',
      text: 'User Address',
    },
    {
      key: 'user_image',
      text: 'User Image',
    },
    {
      key: 'user_name',
      text: 'User Name',
    },
  ],
}];

function DialogContent({
  t, classes, formik,
}) {
  const navigate = useNavigate();
  return (
    <Grid container item xs={6} className={classes.dialogContent}>
      <TextFieldAtom
        minWidth="80%"
        id="dialog-text"
        name="dialog-text"
        label={`${t('PLEASE_GIVE_TEMPLATE_TITLE')}`}
        value={formik.values.templateTitleCopy}
        onChange={(e) => formik.setFieldValue('templateTitleCopy', e.target.value)}
      />
    </Grid>
  );
}
function DialogFooter({
  classes, handleDialogCancel, handleDialogSave, t,
}) {
  const commonClasses1 = useStyles(commonStyles)();

  return (
    <Grid container className={classes.content} justifyContent="flex-end">
      <ButtonAtom
        name={t('CANCEL')}
        onClick={handleDialogCancel}
        btntype={Buttons.SECONDARY}
        className={commonClasses1.activeButton}
      />
      <ButtonAtom
        name={t('CREATE')}
        onClick={handleDialogSave}
        btntype={Buttons.PRIMARY}
        className={commonClasses1.activeButton}
      />
    </Grid>
  );
}

export default function BulkEmail() {
  const { t } = useTranslation();
  const classes = useStyles(styles)();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDialogOpen, setDialogOpen] = useState(false);
  let store = {};
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const { getEmail } = useSelector((state) => state);
  const [templateOptions, setTemplateOptions] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(() => []);
  const [selectedRecipientOptions, setSelectedRecipientOptions] = useState([]);
  const [showNewTemplate, setNewTemplate] = useState(false);
  const [recipientOptions, setRecipentOptions] = useState([]);
  const [tag, setTag] = useState(() => []);
  const [substitutionTag, setSubstitutionTag] = useState([]);
  const [searched, setSearched] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const range = (start, end) => Array(end - start + 1)
    .fill()
    .map((_, idx) => [
      {
        id: start + idx,
        name: (start + idx).toString(),
        title: (start + idx)?.toString(),
        label: (start + idx)?.toString(),
        key: (start + idx)?.toString(),
      },
    ]);
  const marksRecipients = range(0, 100);

  useEffect(() => {
    const options = getEmail?.recipientOptions?.map((obj) => ({
      id: obj,
      name: obj,
      title: obj?.toString(),
      label: obj?.toString(),
      key: obj?.toString(),
    }));
    setRecipentOptions(options);
  }, [getEmail?.recipientOptions]);

  const emailFilters = getEmail?.emailFilters?.map((emailFilter) => ({
    id: emailFilter,
    name: emailFilter,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubstitutionTagsList());
    dispatch(getEmailTemplate());
    dispatch(getEmailFilters());
  }, []);
  const [recipientError, setRecipientError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [contentError, setContentError] = useState('');
  const [titleError, setTitleError] = useState('');
  const userRole = getLocalStorage('userRole');
  const showLocationFilterRecipients = JSON.parse(
    getLocalStorage('showLocationFilterRecipients'),
  );
  const showLocationAnnouncementsRecipients = JSON.parse(
    getLocalStorage('showLocationAnnouncementsRecipients'),
  );
  const showSelectAllinEmail = JSON.parse(
    getLocalStorage('showSelectAllinEmail') || 'false',
  );
  const selectedLocation = getLocalStorage('selectedLocation');
  const selectedYear = getLocalStorage('selectedYear');
  const userEmailId = getLocalStorage('userEmailId');
  const userId = getLocalStorage('userId');

  const resetErrors = () => {
    setRecipientError('');
    setSubjectError('');
    setContentError('');
    setTitleError('');
  };

  const formik = useFormik({
    initialValues: {
      mailRecipients: [],
      emailFilter:
        getEmail?.emailSetFilter === undefined ? [] : getEmail?.emailSetFilter,
      template: '',
      mailSubject: '',
      templateTitle: '',
      templateTitleCopy: '',
      mailContent: '',
      courseName: '',
      substitutionTags: [],
    },
    onSubmit: () => { },
  });

  const [isSelectAllChecked, setIsSelectAllChecked] = useState(false);
  const [selectedChanged, setSelectedChanged] = useState(false);

  const SelectAllRecipients = () => {
    setSelectedChanged(true);
    setIsSelectAllChecked(!isSelectAllChecked);
  };

  const fetchEmailRecipients = (filter, locationId, name, selectedFilters) => {
    const payload = {
      filter,
      name,
      locationId,
      selectedFilters,
    };
    dispatch(getRecipientsByFilter(payload));
  };

  const onInputChange = (e, newInputValue) => {
    if (
      formik.values.emailFilter !== []
      && (formik.values.emailFilter === 'Student'
        || formik.values.emailFilter === 'User')
    ) {
      if (newInputValue.length > 2) {
        fetchEmailRecipients(formik.values.emailFilter, formik.values.location, newInputValue, {
          locationName: localStorage.getItem('locationEmailTemplate') ? localStorage.getItem('locationEmailTemplate') : '',
          regionName: localStorage.getItem('regionEmailTemplate') ? localStorage.getItem('regionEmailTemplate') : '',
        });
      }
    }
  };

  useEffect(() => {
    setIsSelectAllChecked(false);
    if (
      formik.values.emailFilter !== []
      && formik.values.emailFilter !== 'Student'
      && formik.values.emailFilter !== 'User'
    ) {
      if (
        formik.values.emailFilter === 'Marks <='
        || formik.values.emailFilter === 'Marks >='
      ) {
        const marks = [];
        marksRecipients?.forEach((obj) => {
          marks.push(obj[0]);
        });
        setRecipentOptions(marks);
      } else {
        fetchEmailRecipients(formik.values.emailFilter, formik.values.location, '', {
          locationName: localStorage.getItem('locationEmailTemplate') ? localStorage.getItem('locationEmailTemplate') : '',
          regionName: localStorage.getItem('regionEmailTemplate') ? localStorage.getItem('regionEmailTemplate') : '',
        });
      }
    } else {
      fetchEmailRecipients('', '', '');
    }
  }, [formik.values.emailFilter, formik.values.location]);

  useEffect(() => {
    if (selectedTemplate && selectedTemplate.length !== 0) {
      resetErrors();
      formik.setFieldValue('template', selectedTemplate?.id);
      formik.setFieldValue('mailSubject', selectedTemplate?.subject);
      formik.setFieldValue(
        'templateTitle',
        selectedTemplate?.name
          ? selectedTemplate?.name
          : selectedTemplate?.title,
      );
      const contentBlock = htmlToDraft(selectedTemplate?.body);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const textEditorState = EditorState.createWithContent(contentState);

        setEditorState(textEditorState);
        formik.setFieldValue(
          'mailContent',
          draftToHtml(convertToRaw(editorState.getCurrentContent())),
        );
      }
    }
  }, [selectedTemplate]);

  useEffect(() => {
    if (tag && tag.length !== 0) {
      resetErrors();
      const contentBlock = htmlToDraft(tag.text);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const textEditorState = EditorState.createWithContent(contentState);
        store = draftToHtml(convertToRaw(editorState.getCurrentContent())) + draftToHtml(convertToRaw(textEditorState.getCurrentContent()));
        const storeContent = htmlToDraft(store);
        if (storeContent) {
          const storeContentState = ContentState.createFromBlockArray(storeContent.contentBlocks);
          const storeEditorState = EditorState.createWithContent(storeContentState);
          setEditorState(storeEditorState);
        }
        formik.setFieldValue('substitutionTags', substitutionTag);
        formik.setFieldValue(
          'mailContent',
          draftToHtml(convertToRaw(editorState.getCurrentContent())),
        );
      }
    }
  }, [tag]);

  useEffect(() => {
    const templateOpt = getEmail?.emailTemplates || [];
    if (templateOpt.length) {
      setTemplateOptions(
        templateOpt.map((opt) => ({
          id: opt.id,
          name: opt.title,
          subject: opt.subject,
          body: opt.body,
        })),
      );
    }
    if (showNewTemplate) {
      const length = templateOpt?.length > 0 ? parseInt(templateOpt?.length, 10) - 1 : 0;
      setSelectedTemplate(templateOpt[length]);
      formik.setFieldValue('template', templateOptions[length]?.id);
    }
  }, [getEmail?.emailTemplates]);

  const getFilterKey = (filterKey) => {
    let key = filterKey;
    if (filterKey === 'academic_year') {
      key = 'AcademicYear';
    } else if (filterKey === 'course_name') {
      key = 'Course';
    } else if (filterKey === 'section') {
      key = 'Section';
    } else if (filterKey === 'region_name') {
      key = 'Region';
    }
    return key;
  };

  useEffect(() => {
    if (getEmail.recipients?.length > 0) {
      const emailrecipients = [];
      getEmail.recipients?.forEach((obj) => {
        const val = {
          label: obj,
          groupBy: 'recipients',
          filterKey: 'recipients',
        };
        if (obj !== undefined && obj !== '') emailrecipients.push(val);
      });
      emailrecipients.push(...getEmail.studentFilters);
      formik.setFieldValue('mailRecipients', emailrecipients);
      setSelectedRecipientOptions(emailrecipients);
      dispatch({ type: Constant.RECIPIENTS, payload: [] });
      setLocalStorage('adminBulkRecipientList', []);
      setLocalStorage('adminBulkEmailStudents', []);
    }
  }, [getEmail.recipients]);

  useEffect(() => {
    const options = [];
    if (selectedRecipientOptions?.length > 0 && showLocationFilterRecipients) {
      selectedRecipientOptions?.forEach((stu) => {
        if (
          stu.filterKey !== 'locationFilter'
          && stu.filterKey !== 'yearFilter'
        ) {
          options.push(stu);
        }
      });
      if (selectedLocation !== '' && selectedLocation !== undefined) {
        const val = {
          label: getLocalStorage('selectedLocationName'),
          groupBy: 'recipients',
          filterKey: 'locationFilter',
        };
        options.push(val);
      }

      if (selectedYear !== '' && selectedYear !== undefined) {
        const val = {
          label: getLocalStorage('selectedYear'),
          groupBy: 'recipients',
          filterKey: 'yearFilter',
        };
        options.push(val);
      }
    }
    if (showLocationAnnouncementsRecipients) {
      if (selectedLocation !== '' && selectedLocation !== undefined) {
        const val = {
          label: getLocalStorage('selectedLocationName'),
          groupBy: 'recipients',
          filterKey: 'locationFilter',
        };
        options.push(val);
      }

      if (selectedYear !== '' && selectedYear !== undefined) {
        const val = {
          label: getLocalStorage('selectedYear'),
          groupBy: 'recipients',
          filterKey: 'yearFilter',
        };
        options.push(val);
      }
    }
    if (options.length > 0) {
      formik.setFieldValue('mailRecipients', options);
      setSelectedRecipientOptions(options);
    }
  }, [formik?.values?.location, formik?.values?.year]);

  const saveTemplate = useCallback(
    async (name, mailContent, mailSubject, id) => {
      dispatch(
        saveEmailTemplate({
          title: name || formik?.values?.templateTitle,
          subject: mailSubject,
          body: mailContent,
          templateId: id,
        }),
      );
    },
    [],
  );

  const validateFields = (isCopy) => {
    let isValid = true;
    resetErrors();
    if ((!isCopy && formik?.values?.mailRecipients.length) === 0) {
      setRecipientError(t('MAIL_RECIPIENTS_REQUIRED'));
      isValid = false;
    } else if (formik?.values?.mailSubject === '') {
      setSubjectError(t('MAIL_SUBJECT_REQUIRED'));
      isValid = false;
    } else if (isCopy && formik?.values?.templateTitle === '') {
      setTitleError(t('MAIL_TITLE_REQUIRED'));
      isValid = false;
    } else if (formik?.values?.mailContent === '<p></p>\n') {
      setContentError(t('MAIL_CONTENT_REQUIRED'));
      isValid = false;
    } else {
      resetErrors('');
      isValid = true;
    }
    return isValid;
  };

  const handleSave = async (name, isCopy) => {
    if (validateFields(true)) {
      const templateId = isCopy ? '' : formik?.values?.template;
      await saveTemplate(
        name || formik?.values?.templateTitle,
        formik?.values?.mailContent,
        formik?.values?.mailSubject,
        templateId,
      ).finally(() => {
        setTimeout(() => {
          setNewTemplate(true);
          dispatch(getEmailTemplate());
        }, 200);
      });
    }
  };

  const openMakeCopyDialog = (open) => {
    const title = selectedTemplate?.name
      ? selectedTemplate?.name
      : selectedTemplate?.title;
    formik.setFieldValue('templateTitleCopy', `${title}-copy`);
    setDialogOpen(open);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleMakeACopy = () => {
    formik.setFieldValue('templateTitle', formik.values.templateTitleCopy);
    handleSave(formik.values.templateTitleCopy, true);
    handleClose();
  };

  const handleCreate = () => {
    formik.setFieldValue('template', '');
    formik.setFieldValue('mailSubject', '');
    formik.setFieldValue('templateTitle', '');
    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const textEditorState = EditorState.createWithContent(contentState);
      setEditorState(textEditorState);
      formik.setFieldValue(
        'mailContent',
        draftToHtml(convertToRaw(editorState.getCurrentContent())),
      );
    }
  };

  const handleCancelEmail = () => {
    if (userRole === userRoles.LOCATION_COORDINATOR) {
      navigate(NavigateRoutes.LC_ANNOUNCEMENTS);
      // handleCreate();
    } else if (getEmail?.emailSetFilter !== '' && getEmail?.emailSetFilter === 'User') {
      navigate(NavigateRoutes.USER_MANAGER_VIEW);
      // handleCreate();
    } else {
      navigate(NavigateRoutes.STUDENTS_VIEW);
      // handleCreate();
    }
  };

  useEffect(() => {
    if (selectedChanged) {
      const options = [];
      if (isSelectAllChecked) {
        const val = {
          label: '2022-2023',
          groupBy: 'academic_year',
          filterKey: 'academic_year',
        };
        options.push(val);
        setSelectedChanged(true);
      }
      formik.setFieldValue('mailRecipients', options);
      setSelectedRecipientOptions(options);
    }
  }, [isSelectAllChecked]);
  const sendEmail = useCallback(async (payload) => {
    dispatch(sendAnnouncement(payload));
  }, []);
  const handleEmail = async () => {
    // loading = useState(true);
    if (validateFields(false)) {
      const list = new DataList(selectedRecipientOptions);
      const data = list.finalFilters;
      let emailToSend = [];
      const payload = {
        filter: data,
        substitutionTags: formik?.values?.substitutionTags,
        subject: formik?.values?.mailSubject,
        emailBody: formik?.values?.mailContent,
        locationId: formik?.values?.location,
        sender: userEmailId,
        userId,
      };
      if (list.studentCount > 0) {
        emailToSend = [...data[0].Student, ...getEmail.emailParents];
        payload.recipients = emailToSend.filter(
          (obj) => obj !== undefined && obj !== '',
        );
      }
      await dispatch(sendEmail(payload).finally(() => {
        setLoading(true);
        setTimeout(() => {
          handleCancelEmail();
        }, 18000);
      }));
    }
  };
  useEffect(() => {
    formik.setFieldValue(
      'mailContent',
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
  }, [editorState]);
  const initialRecipientOptions = [
    {
      label: '',
      groupBy: '',
      filterKey: '',
    },
  ];
  const getGroupOptions = () => {
    const studentFil = [...recipientOptions];
    const options = [];
    studentFil?.forEach((stu) => {
      options.push({
        label: stu.key,
        groupBy: formik.values.emailFilter,
        filterKey: formik.values.emailFilter,
      });
    });
    return options.length > 0 ? options : initialRecipientOptions;
  };

  const addSelectedOptions = (arrayField) => {
    const regionValue = arrayField.find((el) => el.groupBy === 'Region');
    const locationValue = arrayField.find((el) => el.groupBy === 'Location');

    if (regionValue) {
      localStorage.setItem('regionEmailTemplate', regionValue.label);
    } else {
      localStorage.setItem('regionEmailTemplate', '');
    }

    if (locationValue) {
      localStorage.setItem('locationEmailTemplate', locationValue.label);
    } else {
      localStorage.setItem('locationEmailTemplate', '');
    }
  };

  const onGroupAutoCompleteSelection = (e, val) => {
    // fetchEmailRecipients('', '', '');
    addSelectedOptions(val);
    setSelectedRecipientOptions(val);
    formik.setFieldValue('mailRecipients', val);
  };
  const substitutionTagButton = (el, item) => {
    setTag(item);
    const subTag = { title: el.title, options: [item] };
    if (substitutionTag.some((e) => e.title === el.title)) {
      const temp = substitutionTag;
      temp.find((e) => e.title).options.push(item);
      setSubstitutionTag(temp);
    } else {
      const temp2 = substitutionTag;
      temp2.push(subTag);
      setSubstitutionTag(temp2);
    }
  };

  if (loading) {
    return (
      <Grid>
        <Loader message={t('LOADING')} />
      </Grid>
    );
  }

  return (
    <Box className={classes.gridContainer}>
      <FormikProvider value={formik}>
        {userRole === userRoles.SUPER_ADMIN && showSelectAllinEmail ? (
          <Grid container className={classes.selectAllCheck}>
            <CheckboxesAtom
              label={t('SELECT_ALL')}
              id="acceptCheckbox"
              checked={isSelectAllChecked}
              handleChange={() => SelectAllRecipients()}
            />
          </Grid>
        ) : (
          <div />
        )}
        {userRole === userRoles.LOCATION_COORDINATOR ? (
          <>
            <Grid container>
              <Typography className={classes.headerTitle}>
                {t('NEW_ANNOUNEMENT')}
              </Typography>
            </Grid>
            <Grid container className={classes.locationYearDropdowns}>
              <Filters
                {...{
                  formik,
                  classes,
                  t,
                }}
              />
            </Grid>
          </>
        ) : (
          <div />
        )}
        <Grid
          container
          className={classes.title}
          style={{ paddingBottom: '1rem' }}
        >
          <Typography className={classes.headerTitle}>
            {t('RECIPIENTS')}
            :
          </Typography>
        </Grid>
        <Grid
          container
          align="center"
          spacing={1}
          justifyContent="space-between"
        >
          <Grid container xs={12} sm={6} className={classes.autoComplete}>
            <GroupedAutoComplete
              options={getGroupOptions()}
              onSelection={onGroupAutoCompleteSelection}
              value={selectedRecipientOptions}
              label={t('RECIPIENTS')}
              placeholder={formik.values.emailFilter}
              allowUserInput
              onInputChange={(e, newInputValue) => onInputChange(e, newInputValue)}
              disabled={isSelectAllChecked}
            />
            <span className={classes.errorText}>{recipientError}</span>
          </Grid>
          <Grid container xs={5} sm={2.5} className={classes.filterTemplate}>
            <Dropdown
              minWidth="100%"
              label={`${t('SET_FILTER')}`}
              id="emailFilter"
              name="emailFilter"
              required
              labelId="emailFilter"
              value={formik.values.emailFilter}
              options={emailFilters}
              handleChange={formik.handleChange}
            />
          </Grid>
          <Grid container xs={5} sm={2.5} className={classes.emailTemplate}>
            <Dropdown
              minWidth="100%"
              label={`${t('SELECT_TEMPLATE')}`}
              id="select-template"
              name="select-template"
              required
              labelId="select-template"
              options={templateOptions}
              value={formik.values.template}
              handleChange={(e) => {
                formik.setFieldValue('template', e.target.value);
                const template = templateOptions.find(
                  (opt) => opt.id === e.target.value,
                );
                setSelectedTemplate(template);
                formik.setFieldValue('template', e.target.value);
              }}
            />
          </Grid>
          <Grid
            container
            xs={1}
            className={classes.saveIcon}
            justifyContent="flex-end"
          >
            <Tooltip title={t('SAVE_UPDATE_TEMPLATE')} placement="right">
              <Button
                variant="contained"
                size="small"
                onClick={() => handleSave(formik?.values?.templateTitle)}
                className={classes.saveButton}
              >
                <SaveIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <Grid
          container
          align="center"
          spacing={1}
          justifyContent="space-between"
        >
          <Grid container className={classes.mailSub} xs={8.5}>
            <TextFieldAtom
              required
              minWidth="80%"
              id="subject"
              name="subject"
              label={`${t('EMAIL_SUBJECT')}`}
              value={formik.values.mailSubject}
              onChange={(e) => formik.setFieldValue('mailSubject', e.target.value)}
            />
            <span className={classes.errorText}>{subjectError}</span>
          </Grid>
          <Grid
            container
            xs={2.35}
            className={classes.mailSubright}
            justifyContent="flex-start"
          >
            <TextFieldAtom
              minWidth="98%"
              required
              id="title"
              name="title"
              label={`${t('TITLE')}`}
              value={formik.values.templateTitle}
              onChange={(e) => {
                formik.setFieldValue('templateTitle', e.target.value);
                formik.setFieldValue(
                  'templateTitleCopy',
                  `${e.target.value}-copy`,
                );
              }}
            />
            <span className={classes.errorText}>{titleError}</span>
          </Grid>
          <Grid container xs={1.15} />
        </Grid>
        <Grid container item className={classes.createNew}>
          <Grid container xs={12} md={2.45}>
            <Link
              component="button"
              disabled={!formik.values.templateTitle}
              className={classes.cursorPointer}
              onClick={() => openMakeCopyDialog(true)}
              underline="none"
            >
              {t('MAKE_A_COPY')}
            </Link>
            <Link
              component="button"
              className={`${classes.cursorPointer} ${classes.createNew}`}
              onClick={() => handleCreate()}
              underline="none"
            >
              {t('CREATE_NEW')}
            </Link>
          </Grid>
        </Grid>
        <Grid container align="center" spacing={0} mt={5} ml={0}>
          <Grid container xs={12} md={8} className={classes.emailEditor}>
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName={classes.editorClass}
              editorState={editorState}
              onEditorStateChange={setEditorState}
            />
            <span className={classes.errorText}>{contentError}</span>
          </Grid>
          <Grid container xs={12} md={4} alignContent="start">
            <Box
              className={classes.substitutionTagLabel}
            >
              <Typography color="blue">
                <b>{t('Substitution Tags:')}</b>
              </Typography>
              <Typography variant="body2">
                {t('Select user/student info and click on the editor.')}
              </Typography>
            </Box>
            <Grid
              container
              sx={{
                '@media (min-width: 1200px)': {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingTop: '30px',
                  paddingRight: '80px',
                },
              }}
            >
              {' '}
              <TextField
                id="search"
                variant="outlined"
                sx={{
                  '@media (min-width: 1200px)': {
                    maxWidth: '70%',
                  },
                }}
                label="Search"
                placeholder="Search"
                value={searched}
                onChange={(searchVal) => setSearched(searchVal.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton>
                      <GridSearchIcon />
                    </IconButton>
                  ),
                }}
              />
              <List
                className={classes.substitutionTagList}
                subheader={<li />}
              >
                { localStorage.getItem('userRole').includes('Super Admin') ? (
                  <div>
                    {
                    substitutionTagsAdmin.map((el) => {
                      const options = el.options.filter((item) => item.text.toLowerCase().includes(searched.toLowerCase()));
                      if (options.length === 0) return null;
                      return (
                        <li key={el.title} style={{ textAlign: 'start' }}>
                          <ul>
                            <ListSubheader className={classes.substitutionTagListHeader}>{el.title}</ListSubheader>
                            {options.map((item) => (
                              <ListItem onClick={() => { substitutionTagButton(el, item); }} Button key={item.key} style={{ backgroundColor: '#ebebeb', borderBottom: '2px solid #bbb3b3' }}>
                                <ListItemText style={{ borderBottom: '5px' }} primary={item.text} />
                              </ListItem>
                            ))}
                          </ul>
                        </li>
                      );
                    })
                  }
                  </div>
                ) : (
                  <div>
                    {
                    getEmail.substitutionTags.map((el) => {
                      const options = el.options.filter((item) => item.text.toLowerCase().includes(searched.toLowerCase()));
                      if (options.length === 0) return null;
                      return (
                        <li key={el.title} style={{ textAlign: 'start' }}>
                          <ul>
                            <ListSubheader className={classes.substitutionTagListHeader}>{el.title}</ListSubheader>
                            {options.map((item) => (
                              <ListItem onClick={() => { substitutionTagButton(el, item); }} Button key={item.key} style={{ backgroundColor: '#ebebeb', borderBottom: '2px solid #bbb3b3' }}>
                                <ListItemText style={{ borderBottom: '5px' }} primary={item.text} />
                              </ListItem>
                            ))}
                          </ul>
                        </li>
                      );
                    })
                  }
                  </div>
                )}
              </List>
            </Grid>
            <span className={classes.errorText}>{contentError}</span>
          </Grid>
        </Grid>
        <Grid
          container
          item
          justifyContent="center"
          className={classes.actionButtons}
        >
          <ButtonAtom
            name={t('CANCEL')}
            onClick={() => handleCancelEmail()}
            btntype={Buttons.SECONDARY}
          />
          <ButtonAtom
            name={t('SEND_ANNOUNCEMENTS')}
            onClick={() => handleEmail()}
            btntype={Buttons.PRIMARY}
          />
        </Grid>
      </FormikProvider>
      <DialogAtom
        customClass={classes.dialogAtom}
        isOpen={isDialogOpen}
        dialogHeading={t('MAKE_A_COPY')}
        primaryHandle={() => handleClose()}
        secHandle={() => handleClose()}
        content={(
          <DialogContent
            classes={classes}
            t={t}
            formik={formik}
            templateTitle={formik.values.templateTitleCopy}
          />
        )}
        footer={(
          <DialogFooter
            classes={classes}
            handleDialogCancel={() => handleClose()}
            handleDialogSave={() => handleMakeACopy()}
            t={t}
          />
        )}
      />
    </Box>
  );
}
