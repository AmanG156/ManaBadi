/* eslint-disable */
import {TextFieldProps, TextField} from "@mui/material";
import {useField} from "formik";
import React, {memo, useEffect, useState} from "react";
import {usePropagateRef} from "./usePropagateRef";
import style from './style';
import { removeSpecialChar } from '../../../utils/methods';

/**
 * This is kind of hacky solution, but it mostly works. Your mileage may vary
 */

const PerformantTextField = memo(
    (props) => { 
        const classes = style();
        const { min , max, type, size } =props;
        const [field, meta] = useField(props.name);
        const error = (!!meta.error && meta.touched) || props.error;
        /**
         * For performance reasons (possible due to CSS in JS issues), heavy views
         * affect re-renders (Formik changes state in every re-render), bringing keyboard
         * input to its knees. To control this, we create a setState that handles the field's inner
         * (otherwise you wouldn't be able to type) and then propagate the change to Formik onBlur and
         * onFocus.
         */
        const [fieldValue, setFieldValue] = useState(field.value);
        const {loading, customClass, ...otherProps} = props;
        usePropagateRef({
            setFieldValue,
            name: props.name,
            value: field.value,
        });
        /**
         * Using this useEffect guarantees us that pre-filled forms
         * such as passwords work.
         */
        useEffect(() => {
            if (meta.touched) {
                return;
            }
            if (type === "number"  && field?.value !== Number(fieldValue) && (max && field?.value <= max  || !max)) {
                const value =  field?.value;
                setFieldValue(value);
            }else if(type === "number"  && field?.value !== Number(fieldValue) && (max && field?.value > max)){
                setFieldValue(max);
            }
             else if( type === "text"  && field?.value!== fieldValue ){
                const value =  field?.value;
                setFieldValue(value); 
            }
            // eslint-disable-next-line
        }, [field.value]);
        const onChange = (evt) => {
            const value = evt.target.value || '';
            let eve = {...evt};
            if (!props.allowSpecialCharacter && value) {
                eve = {...eve, target: {...eve.target, value: removeSpecialChar(value) }}
            }
            if(type === "number" && ((max && value <= max) || !max )){
                setFieldValue(evt.target.value);
            }else  if(type === "number" && (max && value > max)){
                setFieldValue(max);
            }
            else{
                setFieldValue(value);
            }
            if (props.onChange) {
                props.onChange({...eve});
            }
        };
        const onBlur = (evt) => {
            const value = evt.target.value || '';
            window.setTimeout(() => {
                field.onChange({
                    target: {
                        name: props.name,
                        value: props.type === "number" ? parseFloat(value, 10) : value,
                    },
                });
                if (props.onBlur) {
                    props.onBlur(evt);
                }
            }, 0);
        };
        // Will set depending on the performance props
        const performanceProps = {
                ...field,
                value: fieldValue || '',
                onChange,
                onBlur,
                //onFocus: onBlur,
            };
        return (
            <>
                <TextField className={`${classes[customClass]} ${classes.performTextField}`}
                    {...otherProps}
                    InputProps={{
                        ...((props.type === "number" && {
                                inputProps: {min: props?.min, max: props?.max},
                            }) ||
                            undefined),
                    }}
                    error={error}
                    helperText={(meta.touched && meta.error) || props.error}
                    {...performanceProps}
                />
            </>
        );
    }
);

export default PerformantTextField;
