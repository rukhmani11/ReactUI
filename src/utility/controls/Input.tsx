import React from "react";
import { TextField } from "@mui/material";

export default function Input(props: any) {
  const {
    name,
    label,
    value,
    length,
    error = null,
    onChange,
    readOnly = false,
    ...other
  } = props;
  return (
    <TextField
      variant="outlined"
      size="small"
      // autoComplete='off'
      label={label}
      name={name}
      value={value ? value : value === 0 ? 0 : ""}
      onChange={onChange}
      fullWidth
      inputProps={{
        maxLength: length,
        readOnly: readOnly,
      }}
      //defaultValue={""}
      {...other}
      {...(error && { error: true, helperText: error })}
    />
  );
}
