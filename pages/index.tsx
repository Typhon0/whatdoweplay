import React from "react";
import RootLayout from "../app/components/layouts/RootLayout";
import axios from "axios";
import useSWR from "swr";
import { NextPage } from "next";
import "rsuite/lib/styles/themes/dark/index.less";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index: NextPage = () => {
  const { data } = useSWR("/api/user", fetcher);
  return (
    <React.Fragment>
      <RootLayout user={data}></RootLayout>
    </React.Fragment>
  );
};

export default Index;
