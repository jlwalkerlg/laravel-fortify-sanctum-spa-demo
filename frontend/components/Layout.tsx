import Head from "next/head";
import React, { FC } from "react";
import Nav from "./Nav";

export const LayoutHeader: FC = ({ children }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{children}</h1>
      </div>
    </header>
  );
};

export const LayoutMain: FC = ({ children }) => {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
    </main>
  );
};

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>WinFCU</title>
        <meta name="description" content="WinFCU" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      {children}
    </div>
  );
};

export default Layout;
