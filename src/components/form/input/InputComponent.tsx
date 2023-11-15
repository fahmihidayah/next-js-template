import { FormControl, FormHelperText, FormLabel, Input, ResponsiveValue } from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
  }

export default function InputComponent({label,
    error,
    ...inputProps }: Props) {
    return (
        <FormControl mb={5}>
            <FormLabel>{label}</FormLabel>
            <Input {...inputProps} size={"md"}/>
            {error && <FormHelperText color="red.500">{error}</FormHelperText>}
            {/* <input type={type} className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} /> */}
            {/* {error && <div className="text-danger">{error}</div>} */}
        </FormControl>
    );
}