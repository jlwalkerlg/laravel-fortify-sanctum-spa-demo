import Head from "next/head";
import React, { FC } from "react";
import Layout, { LayoutHeader, LayoutMain } from "../components/Layout";

const HomePage: FC = () => {
  return (
    <Layout>
      <Head>
        <title>Home | WinFCU</title>
        <meta name="description" content="Home | WinFCU" />
      </Head>

      <LayoutHeader>Home</LayoutHeader>

      <LayoutMain>
        <div>You&apos;ve got everything now!</div>
      </LayoutMain>
    </Layout>
  );
};

export default HomePage;
