/* eslint-disable react/jsx-props-no-spreading */
import React, { InputHTMLAttributes } from 'react';
import { SpaceProps, GridAreaProps } from 'styled-system';
import Label from './Label';
import Input from './Input';

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement>,
  SpaceProps,
  GridAreaProps {
  label: string;
}

function InputField({ label, ...input }: InputFieldProps) {
  return (
    <Label>
      {label}
      <Input {...input} />
    </Label>
  );
}

export default InputField;
