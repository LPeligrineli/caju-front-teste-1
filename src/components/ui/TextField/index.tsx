import { forwardRef, InputHTMLAttributes } from "react";
import { Input, InputContainer, Error } from "./styles";

export type TextFieldProps = {
  label?: string;
  error?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(({ name, label, onChange, error, ...props }, ref) => {
  return (
    <InputContainer>
      <label htmlFor={name}>{label}</label>
      <Input 
        id={name} 
        ref={ref} 
        {...props} 
        onChange={onChange} 
        readOnly={props.value && !onChange ? true : undefined}
        />
      <Error>{error}</Error>
    </InputContainer>
  );
});

export default TextField;