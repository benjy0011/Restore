import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};

const RadioButtonGroup = ({ options, onChange, selectedValue }: Props) => {
  return (
    <FormControl>
      <RadioGroup
        onChange={onChange}
        value={selectedValue}
        sx={{
          my: 0,
          wordBreak: "break-word"
        }}
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={label}
            control={<Radio color="primary" sx={{ py: 0.7 }} />}
            label={label}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
export default RadioButtonGroup;
