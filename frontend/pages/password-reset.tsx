import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";

const PasswordResetPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [token, setToken] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onSubmit = async () => {
    setError("");
    setErrors({});

    try {
      await api.get("/sanctum/csrf-cookie");
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      return;
    }

    try {
      await api.post("/reset-password", {
        email,
        password,
        password_confirmation: passwordConfirmation,
        token,
      });
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      setErrors(e.response?.data?.errors ?? {});
      return;
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    setEmail(router.query.email?.toString() ?? "");
    setToken(router.query.token?.toString() ?? "");
  }, [router.isReady, router.query.token, router.query.email]);

  return (
    <Layout>
      <div>
        {error && <div>{error}</div>}
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
        <input type="hidden" value={token} />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </Layout>
  );
};

export default PasswordResetPage;
