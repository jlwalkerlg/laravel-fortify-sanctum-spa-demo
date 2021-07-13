import React, { FC, useState } from "react";
import api from "../api";
import Layout from "../components/Layout";

const AccountPage: FC = () => {
  const [error, setError] = useState("");

  const onGetUser = async () => {
    setError("");

    try {
      await api.get("/api/user");
    } catch (e) {
      setError(e.response?.data?.message ?? e.message);
      return;
    }
  };
  return (
    <Layout>
      <div>
        {error && <div>{error}</div>}

        <button onClick={onGetUser}>Get User</button>
      </div>
    </Layout>
  );
};

export default AccountPage;
