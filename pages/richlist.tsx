import { readDenom } from "@terra.kitchen/utils";
import React, { useState } from "react";
import CustomTable from "../components/customTable";
import CustomSpinner from "../components/feedback/customSpinner";
import Search from "../components/search";
import { useGetRichListQuery } from "../services/api";
import { SearchOptionParams } from "../types/common";

const RichList = () => {
  const [token, setToken] = useState("uluna");
  const { isLoading, data } = useGetRichListQuery(token);
  const [activePage, setActivePage] = useState(1);

  if (isLoading) return <CustomSpinner />;
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
        token={token}
      ></CustomTable>
    </>
  );
};

export default RichList;
