import React from "react";
import RootLayout from "../app/components/layouts/RootLayout";
import axios from "axios";
import useSWR from "swr";
import { NextPage } from "next";
import { CustomProvider } from "rsuite";
//import 'rsuite/styles/index.less';
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Index: NextPage = () => {
  const { data } = useSWR("/api/user", fetcher);
  return (
    <CustomProvider theme="dark">
      <RootLayout user={data}></RootLayout>
    </CustomProvider>
  );
};

export default Index;
