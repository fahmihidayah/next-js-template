import { As, FormControl, FormHelperText, FormLabel, Input, InputProps, ResponsiveValue } from "@chakra-ui/react";
import { InputHTMLAttributes } from "react";

export interface Option {
    value : any;
    label : string;
}

interface Props extends InputProps {
    label: string;
    error?: string;
    as?: As;
    options? : Option[];
    selectedOption? : Option;
}

export default function InputComponent({label,
    error,
    options,
    selectedOption,
    as,
    ...inputProps }: Props) {
        let modifiedOptions : Option[] = options || []
        if(options) {
            modifiedOptions = [
                {
                    value : "",
                    label : "Select"
                },
                ...options
            ]
        }
    return (
        <FormControl mb={5}>
            <FormLabel>{label}</FormLabel>
            {!!options && <Input {...inputProps} size={"md"} as="select" >
                
                {modifiedOptions.map((option) => {
                    return <option value={option.value} selected={option.value === selectedOption?.value } >{option.label}</option>
                })} 
            </Input>}
            {
                !options && <Input {...inputProps} size={"md"} as={as}/>
            }
            {error && <FormHelperText color="red.500">{error}</FormHelperText>}
            {/* <input type={type} className="form-control" id={id} placeholder={placeholder} value={value} onChange={onChange} /> */}
            {/* {error && <div className="text-danger">{error}</div>} */}
        </FormControl>
    );
}