import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Select,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGetWalletGrowthQuery } from "../../services/api";
import CustomBarChart from "../baseCharts/barChart";
import LineChart from "../baseCharts/lineChart";
import LoadingStack from "../feedback/loadingStack";
import { dataFormater } from "../../lib/util";

const WalletGrowthChart = () => {
  const { data, isLoading } = useGetWalletGrowthQuery();
  const [type, setType] = useState("cumulative");
  const [walletType, setWalletType] = useState("total");
  const [tabIndex, setTabIndex] = useState(0);
  const [slicedData, setSlicedData] = useState(data && data[type][walletType]);
  useEffect(() => {
    setSlicedData(data && data[type][walletType]);
  }, [data, type, walletType]);
  const handleTabChange = (i: number) => {
    setTabIndex(i);
    setSlicedData(data[type][walletType].slice([0, -7, -14, -30][i]));
  };
  if (isLoading) return <LoadingStack />;
  const { ids } = data;
  const yAxisProps = {
    label: {
      value: "# of wallets",
      angle: -90,
      position: "left",
      style: {
        textAnchor: "middle",
        fill: "gray",
      },
    },
  };
  return (
    <Box
      borderWidth={"1px"}
      borderRadius={"lg"}
      boxShadow={"xl"}
      p={5}
      w={["90%"]}
      h={["90%", "90%", "60%"]}
    >
      <Tabs
        align="center"
        variant={"soft-rounded"}
        index={tabIndex}
        onChange={handleTabChange}
        size="sm"
        h={["80%", "90%", "90%"]}
      >
        <Flex justify={"space-between"}>
          <Heading as="h2" size={"sm"} textAlign={"center"} p={2}>
            Wallets
          </Heading>
          <Flex>
            <Select
              value={walletType}
              size={"sm"}
              width={"6em"}
              onChange={(e) => {
                e.target.value === "active" && type === "cumulative"
                  ? setWalletType("total")
                  : setWalletType(e.target.value);
                setTabIndex(0);
              }}
            >
              <option value={"total"}>Total</option>
              <option value={"active"}>Active</option>
            </Select>
            <Select
              value={type}
              size={"sm"}
              width={"9em"}
              onChange={(e) => {
                e.target.value === "cumulative" && walletType === "active"
                  ? setType("periodic")
                  : setType(e.target.value);
                setTabIndex(0);
              }}
            >
              <option value={"periodic"}>Periodic</option>
              <option value={"cumulative"}>Cumulative</option>
            </Select>
          </Flex>
        </Flex>
        <Flex p={2}>
          <Heading size={"md"}>
            {dataFormater(data[type][walletType].slice(-1)[0].value)} Wallets
          </Heading>
        </Flex>

        <Box w="100%" minH={"20em"} h="90%">
          {type === "cumulative" ? (
            <LineChart
              ids={ids}
              data={slicedData}
              yAxisProps={yAxisProps}
            ></LineChart>
          ) : (
            <CustomBarChart
              ids={ids}
              data={slicedData}
              yAxisProps={yAxisProps}
            ></CustomBarChart>
          )}
        </Box>

        <TabList>
          <Tab value={0}>From Genesis</Tab>
          <Tab value={-7}>7D</Tab>
          <Tab value={-14}>14D</Tab>
          <Tab value={-30}>30D</Tab>
        </TabList>
      </Tabs>
    </Box>
  );
};

export default WalletGrowthChart;
