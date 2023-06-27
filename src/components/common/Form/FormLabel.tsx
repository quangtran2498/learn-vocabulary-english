import type { FormLabelProps } from "@mui/material/FormLabel";
import MuiFormLabel, { formLabelClasses } from "@mui/material/FormLabel";
import React from "react";

interface LabelProps extends FormLabelProps {
  title: string;
  name: string;
  required?: boolean;
  gutterBottom?: boolean;
}

const FormLabel = (props: LabelProps) => {
  const { title, name, required, gutterBottom, ...rest } = props;
  return (
    <MuiFormLabel
      sx={{
        fontFamily: "Inter, sans-serif",
        color: "black",
        ...styleLabel,
        display: "block",
        mb: gutterBottom ? "0.35em" : 0,
        [`& .${formLabelClasses.asterisk}`]: {
          color: "error.main",
        },
      }}
      htmlFor={name}
      required={required}
      {...rest}
    >
      {title}
    </MuiFormLabel>
  );
};

export default FormLabel;
const styleLabel: React.CSSProperties = {
  fontWeight: 600,
};
