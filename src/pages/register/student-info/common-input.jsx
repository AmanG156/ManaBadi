import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TextField } from '../../../components/atoms';
import { colors } from '../../../theme';
import {
  containsSpecialChars, hasNumericOrSpecialChar,
} from '../../../utils/methods';
import useStyles from '../../../custom-hooks/useStyles';

const styles = (() => ({
  errorText: {
    color: colors.errorText,
    '@media (min-width: 1200px)': {
      fontSize: '0.7vw',
    },
    display: 'block',
  },
}));

/**
 * Performant input component
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function CommonInput(props) {
  const classes = useStyles(styles)();
  const {
    required, name, value, onChange, onBlur, error, shouldValidate = true, ...otherProps
  } = props;
  const { t } = useTranslation();
  const [localValue, setLocalValue] = React.useState(value);
  const [localErrorText, setLocalErrorText] = React.useState(error);
  const localBlur = async (event) => {
    if (event.target.value && event.target.value.length > 1) {
      onChange(event);
      return;
    }
    if (onBlur) {
      onBlur(event);
    }
  };
  useEffect(() => {
    if (!localErrorText) {
      setLocalErrorText(error);
    }
  }, [error]);
  const validate = (info) => {
    if (shouldValidate) {
      if (!info && required) {
        setLocalErrorText(t(`${name.toUpperCase()}_REQUIRED`));
      } else if (!info) {
        setLocalErrorText('');
      } else if (info.length < 2) {
        setLocalErrorText(t(`${name.toUpperCase()}_MIN`));
      } else if (containsSpecialChars(info)) {
        setLocalErrorText(t('NOT_SPECIAL_CHAR'));
      } else {
        setLocalErrorText('');
      }
    } else {
      setLocalErrorText('');
    }
  };
  const setOnChangeValue = (event) => {
    const info = event.target.value || '';
    if (!hasNumericOrSpecialChar(info)) {
      setLocalValue(info);
      validate(info);
    } else {
      setLocalValue(info ? localValue : '');
      validate(info ? localValue : '');
    }
  };
  return (
    <>
      <TextField
        name={name}
        value={localValue}
        onChange={setOnChangeValue}
        onBlur={localBlur}
        error={localErrorText && localErrorText.length}
        required={required}
        {...otherProps}
      />
      {localErrorText && localErrorText.length && (
      <span data-testid={`${name}`} className={classes.errorText}>
        {localErrorText}
      </span>
      )}
    </>
  );
}
export default CommonInput;
