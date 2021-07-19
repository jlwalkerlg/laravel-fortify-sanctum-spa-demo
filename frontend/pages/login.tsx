import Head from "next/head";
import Link from "next/link";
import React, { FC, useState } from "react";
import api from "../api";

const LoginPage: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setErrors({});

    try {
      await api.get("/sanctum/csrf-cookie");
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
    <div>
      <Head>
        <title>Login | WinFCU</title>
        <meta name="description" content="Login | WinFCU" />
      </Head>

      <h1 className="sr-only">Login</h1>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-8 w-auto"
              src="https://a2l.marstair.com/img/logo.svg"
              alt="Marstair"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/register">
                <a className="font-medium text-red-600 hover:text-red-500">
                  sign up for a new account
                </a>
              </Link>
            </p>
          </div>
          <form
            className="mt-8 p-8 shadow bg-white rounded-lg"
            action="#"
            method="POST"
            onSubmit={onLogin}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div>
              <div>
                <label
                  htmlFor="emailAddress"
                  className="font-medium text-gray-600 text-sm"
                >
                  Email address
                </label>
                <input
                  id="emailAddress"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mt-1"
                  placeholder="Email address"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="font-medium text-gray-600 text-sm"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-red-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm mt-1"
                  placeholder="Password"
                />
                <span className="text-xs text-red-500">
                  Must be at least 8 characters long.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-200 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password">
                  <a className="font-medium text-red-600 hover:text-red-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
