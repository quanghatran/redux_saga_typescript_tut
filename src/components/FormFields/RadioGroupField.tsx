import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOptions {
  label?: string;
  value: number | string;
}

export interface RadioGroupFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  options: RadioOptions[];
}

export function RadioGroupField({
  name,
  control,
  label,
  disabled,
  options,
  ...inputProps
}: RadioGroupFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });
  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          ></FormControlLabel>
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
