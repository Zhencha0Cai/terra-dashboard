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
import { readDenom } from "@terra.kitchen/utils";
import { useState } from "react";
import { useGetTxVolumeQuery } from "../../services/api";
import CustomBarChart from "../baseCharts/barChart";
import LineChart from "../baseCharts/lineChart";
import LoadingStack from "../feedback/loadingStack";
import { dataFormater } from "../../lib/util";

const TxVolumeChart = () => {
  const { data, isLoading } = useGetTxVolumeQuery();
  const [type, setType] = useState("cumulative");
  const [denom, setDenom] = useState("uusd");
  const [tabIndex, setTabIndex] = useState(0);
  const [slicedData, setSlicedData] = useState(data && data[type][denom]);
  useEffect(() => {
    setSlicedData(data && data[type][denom]);
  }, [data, type, denom]);
  const handleTabChange = (i: number) => {
    setTabIndex(i);
    setSlicedData(data[type][denom].slice([0, -7, -14, -30][i]));
  };
  if (isLoading) return <LoadingStack />;
  const { ids } = data;
  return (
    <Box
      borderWidth={"1px"}
      borderRadius={"lg"}
      boxShadow={"xl"}
      p={5}
      w={["90%"]}
      h={"60%"}
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
          <Heading as="h5" size={"sm"} textAlign={"center"} p={2}>
            Transaction Volume
          </Heading>
          <Flex justify={"end"}>
            <Select
              value={denom}
              size={"sm"}
              width={"6em"}
              onChange={(e) => {
                setDenom(e.target.value);
                setTabIndex(0);
              }}
            >
              {Object.keys(data.cumulative).map((d) => (
                <option key={d} value={d}>
                  {readDenom(d)}
                </option>
              ))}
            </Select>
            <Select
              value={type}
              size={"sm"}
              width={"9em"}
              onChange={(e) => {
                setType(e.target.value);
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
            {dataFormater(data[type][denom].slice(-1)[0].txVolume)} Transactions
          </Heading>
        </Flex>
        <Box w="100%" h="90%">
          {type === "cumulative" ? (
            <LineChart
              ids={ids}
              data={slicedData}
              yAxisProps={{
                label: {
                  value: "# of transactions",
                  angle: -90,
                  position: "left",
                  style: {
                    textAnchor: "middle",
                    fill: "gray",
                  },
                },
              }}
            ></LineChart>
          ) : (
            <CustomBarChart ids={ids} data={slicedData}></CustomBarChart>
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

export default TxVolumeChart;
