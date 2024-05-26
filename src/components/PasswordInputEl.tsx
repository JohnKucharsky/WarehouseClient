import { ChangeEvent, FocusEvent, MouseEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";

function PasswordInputEl({
  touched,
  error,
  label,
  name,
  handleChange,
  handleBlur,
  value,
  required,
  disabled,
}: {
  touched: boolean | undefined;
  error: string | undefined;
  label: string;
  name: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleBlur: (
    e: FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLDivElement,
      Element
    >,
  ) => void;
  value: string;
  required?: boolean;
  disabled?: boolean;
}) {
  const [showPass, setShowPass] = useState(false);
  const handleClickShowPassword = () => setShowPass((show) => !show);
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Tooltip title={touched && error}>
      <FormControl
        disabled={disabled}
        error={Boolean(touched && error)}
        fullWidth
        variant="outlined"
      >
        <InputLabel
          shrink={value ? true : undefined}
          required={Boolean(required)}
          htmlFor="outlined-adornment-password"
        >
          {label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPass ? "text" : "password"}
          onChange={handleChange}
          name={name}
          onBlur={handleBlur}
          value={value}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPass ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={label}
        />
      </FormControl>
    </Tooltip>
  );
}

export default PasswordInputEl;
