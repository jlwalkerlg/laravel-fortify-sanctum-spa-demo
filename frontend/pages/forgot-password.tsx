import React, { FC, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState("");

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
      await api.post("/forgot-password", {
        email,
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
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <small>{errors.email}</small>}
        </div>
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
