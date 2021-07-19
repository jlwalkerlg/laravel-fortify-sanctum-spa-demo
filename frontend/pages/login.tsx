import Head from "next/head";
import Link from "next/link";
import React, { FC, useState } from "react";
import api from "../api";
import Layout, { LayoutHeader, LayoutMain } from "../components/Layout";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onLogin = async () => {
    setError("");
    setErrors({});

    try {
      await api.get("/sanctum/csrf-cookie");
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      return;
    }

    try {
      await api.post("/login", {
        email,
        password,
      });
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      setErrors(e.response?.data?.errors ?? {});
      return;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Login | WinFCU</title>
        <meta name="description" content="Login | WinFCU" />
      </Head>

      <LayoutHeader>Login</LayoutHeader>

      <LayoutMain>
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
            <label>Remember me</label>
            <input type="checkbox" />
          </div>
          <div>
            <button onClick={onLogin}>Login</button>
          </div>
        </div>

        <div>
          <Link href="/forgot-password">
            <a>Forgot password?</a>
          </Link>
        </div>
      </LayoutMain>
    </Layout>
  );
};

export default LoginPage;
