import Head from "next/head";
import Link from "next/link";
import React, { FC } from "react";
import api from "../api";

const Layout: FC = ({ children }) => {
  const onLogout = async () => {
    try {
      await api.post("/logout");
    } catch (e) {
      return;
    }
  };

  return (
    <div>
      <Head>
        <title>Laravel Fortify Sanctum SPA Demo</title>
        <meta name="description" content="Laravel Fortify Sanctum SPA Demo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/account">
            <a>Account</a>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <button onClick={onLogout}>Logout</button>
        </li>
      </ul>

      {children}
    </div>
  );
};

export default Layout;
