import Input from "@/components/atoms/Input";
import { InputHTMLAttributes } from "react";

interface IProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  error: boolean;
}

export default function InputGroup({inputProps, error}: IProps) {
  return (
    <div
      className={`input-group mb-2 ${error && "border border-danger rounded"}`}
    >
      <Input {...inputProps} />
      <div className="input-group-text">
        <span className="bi bi-lock-fill"></span>
      </div>
    </div>
  );
}
