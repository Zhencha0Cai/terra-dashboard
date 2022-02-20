import { Center, Spinner } from "@chakra-ui/react";
import { readDenom } from "@terra.kitchen/utils";
import React, { useState } from "react";
import CustomTable from "../components/customTable";
import LoadingStack from "../components/loadingStack";
import Search from "../components/search";
import { useGetRichListQuery } from "../services/api";
import { SearchOptionParams } from "../types/common";

const RichList = () => {
  const [token, setToken] = useState("uluna");
  const { isLoading, data } = useGetRichListQuery(token);
  const [activePage, setActivePage] = useState(1);

  if (isLoading)
    return (
      <Center h={"100vh"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
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

export default RichList;
