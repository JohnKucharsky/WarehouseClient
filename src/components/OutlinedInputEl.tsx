import { ChangeEvent, FocusEvent } from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput
} from '@mui/material'

export default function OutlinedInputEl({
  touched,
  error,
  label,
  name,
  handleChange,
  handleBlur,
  value,
  required,
  disabled,
  size = 'medium'
}: {
  touched: boolean | undefined
  error: string | undefined
  label: string
  name: string
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >
  ) => void
  value: string
  required?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
}) {
  return (
    <FormControl
      disabled={disabled}
      error={Boolean(touched && error)}
      fullWidth
      variant="outlined"
      size={size}
    >
      <InputLabel required={Boolean(required)} htmlFor="outlined-input">
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-input"
        type={'text'}
        onChange={handleChange}
        name={name}
        onBlur={handleBlur}
        value={value}
        label={label}
      />
      {touched && <FormHelperText error>{error}</FormHelperText>}
    </FormControl>
  )
}
