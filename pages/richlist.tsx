import { Center, Spinner } from "@chakra-ui/react";
import { readDenom } from "@terra.kitchen/utils";
import React, { useState } from "react";
import CustomTable from "../components/customTable";
import Search from "../components/search";
import { useGetRichListQuery } from "../services/api";
import { SearchOptionParams } from "../types/common";
import axios from "axios";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { FCD } from "../constants/constants";
// import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const RichList = () => {
  const [token, setToken] = useState("uluna");
  const { isLoading, data } = useGetRichListQuery(token);
  const [activePage, setActivePage] = useState(1);
  // const { data, error } = useSWR(`/api/richlist/${token}`, fetcher);
  if (isLoading)
    // if (!data)
    return (
      <Center h={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="2xl"
        />
      </Center>
    );
  const handleOnOptionSelect = ({ item: { value } }: SearchOptionParams) => {
    setToken(value);
    setActivePage(1);
  };
  return (
    <>
      <Search
        token={readDenom(token)}
        handleOnOptionSelect={handleOnOptionSelect}
      ></Search>
      <CustomTable
        data={data}
        activePage={activePage}
        setActivePage={setActivePage}
      ></CustomTable>
    </>
  );
};

// const getRichList = async (req: NextApiRequest, res: NextApiResponse) => {
//   // const { data } = await axios.get(`${FCD}/v1/richlist/${req.query.denom}`);
//   // res.json(data);
// };
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
//   res,
//   params,
// }) => {
//   console.log(params, "param");
//   return {
//     props: {},
//   };
// };

export default RichList;
