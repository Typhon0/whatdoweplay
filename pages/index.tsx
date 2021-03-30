import React from "react";
import RootLayout from "../app/components/layouts/RootLayout";
import "rsuite/lib/styles/themes/dark/index.less";
import axios from "axios";
import useSWR from 'swr'
const fetcher = url => axios.get(url).then(res => res.data)
const Index = (props) => {

  const { data, error } = useSWR('/api/user', fetcher);
  console.log(data)
  return (
    <React.Fragment>
      <RootLayout user={data}></RootLayout>
    </React.Fragment>
  );

};

export default Index;
