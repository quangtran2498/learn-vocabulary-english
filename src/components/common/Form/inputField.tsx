import React, { CSSProperties } from "react";

import { Box, TextField as TextFieldMui } from "@mui/material";
import { makeStyles, withStyles } from "@mui/styles";
import { FastFieldProps } from "formik";
//
import { InputAdornment } from "@mui/material";
import { colors } from "../../../colors";
import FormLabel from "./FormLabel";

interface Props extends FastFieldProps {
  label?: string;
  type?: string;
  onKeyDown?: (e?: any) => void;
  fullWidth?: boolean;
  className?: string;
  size?: "small" | "medium" | undefined;
  autoFocus: any;
  styleAdd?: CSSProperties;
  placeholder?: string;
  Icons?: any;
  styleInput?: CSSProperties;
  required?: boolean;
  disabled?: boolean;
  styleLabel?: CSSProperties;
  border?:string
  onFocus?: () => void;
}

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-multiline": {
      padding: 0,
    },
    "& .MuiInputBase-multiline.Mui-disabled": {
      background: "#EBEBF0",
    },
    "& .MuiOutlinedInput-root textarea": {
      minHeight: "30px !important",
      paddingLeft: "14px",
      paddingRight: "14px",
      paddingTop: "13px",
      paddingBottom: "13px",
      overflow: "hidden",
      "&::placeholder": {
        color: "#BABABA",
      },
    },
    "& .MuiInputBase-adornedEnd": {
      border: `1px solid ${colors.input.border.main}`,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "4px",
      marginTop: "4px",
      paddingRight:"0px",
      "& input": {
        background: colors.background.main,
        borderRadius: "4px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: 'nowarp',
        lineHeight: "48px",
        width: '100%',
        border: `1px solid ${colors.input.border.main}`,
        // minHeight:"56px",
        "&::placeholder": {
          color: "#BABABA",
        },
      },
      "& select": {
        background: colors.background.main,
        borderRadius: "4px",
        padding: "0 32px 0 14px",
        border: `1px solid ${colors.input.border.main}`,
      },
      "& textarea": {
        background: colors.background.main,
        borderRadius: "4px",
        border: `1px solid ${colors.input.border.main}`,
        minHeight:"56px",
      },
      "& .Mui-disabled": {
        background: colors.input.background.disable,
      },
      "& .MuiInputBase-inputAdornedEnd": {
        border: "none",
        background: "none",
      },

      "& fieldset": {
        border: "none",
        borderRadius: "4px",
      },
    },
  },
})(TextFieldMui);

export const TextField = (props: Props) => {
  const {
    label,
    type = "text",
    onKeyDown,
    fullWidth = true,
    field,
    form,
    className,
    size = "medium",
    styleAdd,
    placeholder,
    Icons,
    styleInput,
    onFocus,
    required,
    styleLabel,
    border,
    ...rest
  } = props;
  const { name, value } = field;
  const { errors, touched, handleChange, handleBlur, setFieldTouched } = form;
  
  return (
    <Box py={0.5}>
      {label && (
        <FormLabel required={required} name={name} title={label} style={styleLabel}></FormLabel>
      )}
      <CssTextField
        autoComplete="off"
        variant="outlined"
        name={name}
        type={type}
        onKeyDown={onKeyDown}
        //   value={value}
        //   size={size}
        fullWidth={fullWidth}
        className={`${props.className}`}
        onChange={handleChange}
        style={{ ...styleAdd }}
        onFocus={() => {
          onFocus && onFocus();
          setFieldTouched(name);
        }}
        onBlur={handleBlur}
        placeholder={placeholder}
        // onTouchStart={() => setFieldTouched(name)}

        {...rest}
        error={touched[name] && Boolean(errors[name])}
        helperText={touched[name] && errors[name] && (<>{errors[name]}</>)}
        InputProps={
          Icons && {
            endAdornment: (
              <InputAdornment position="end">{Icons}</InputAdornment>
            ),
          }
        }
      />
    </Box>
  );
};
