"use client";

import { AccountAPI } from "@/api/AccountAPI";
import FullButton from "@/components/molecules/FullButton";
import InputGroup from "@/components/molecules/InputGroup";
import { useAuthStore } from "@/store/auth";
import { ChangeEvent, useState } from "react";

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });
  const [errorMessage, setErrorMessage] = useState("");

  const login = useAuthStore((state) => state.login);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setInputs((currentValue) => ({
      ...currentValue,
      [name]: { value, error: false },
    }));
  }

  async function handleButtonClick() {
    const formInputs = Object.keys(inputs) as (keyof typeof inputs)[];

    setErrorMessage("");

    setInputs((currentValue) => ({
      email: { ...currentValue.email, error: false },
      password: { ...currentValue.password, error: false },
    }));

    formInputs.forEach((input: "email" | "password") => {
      if (inputs[input].value) return;

      setErrorMessage("Por favor, preencha todos os campos.");

      setInputs((currentValue) => ({
        ...currentValue,
        [input]: { ...currentValue[input], error: true },
      }));
    });

    const { email, password } = inputs;

    const account = await AccountAPI.auth(email.value, password.value);
    login(account);
  }

  return (
    <div className="card-body login-card-body">
      <p className="login-box-msg">Por favor, autentique-se:</p>
      <p className="login-box-msg text-danger">{errorMessage}</p>

      <InputGroup
        inputProps={{
          name: "email",
          type: "email",
          placeholder: "Email",
          onChange: handleInputChange,
          value: inputs.email.value,
        }}
        error={inputs.email.error}
      />
      <InputGroup
        inputProps={{
          name: "password",
          type: "password",
          placeholder: "Senha",
          onChange: handleInputChange,
          value: inputs.password.value,
        }}
        error={inputs.password.error}
      />
      <FullButton onClick={handleButtonClick}>Fazer login</FullButton>
    </div>
  );
}
