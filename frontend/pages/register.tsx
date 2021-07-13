import React, { FC, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";

const RegisterPage: FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onRegister = async () => {
    setError("");
    setErrors({});

    try {
      await api.get("/sanctum/csrf-cookie");
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      return;
    }

    try {
      await api.post("/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      setErrors(e.response?.data?.errors ?? {});
      return;
    }
  };

  return (
    <Layout>
      <div>
        {error && <div>{error}</div>}
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <small>{errors.name}</small>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <small>{errors.password}</small>}
        </div>
        <div>
          <label>Confirm password</label>
          <input
            type="text"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {errors.password_confirmation && (
            <small>{errors.password_confirmation}</small>
          )}
        </div>
        <div>
          <button onClick={onRegister}>Register</button>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
