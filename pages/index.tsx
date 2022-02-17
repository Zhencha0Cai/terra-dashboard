import type { NextPage } from "next";
import ChartDashboard from "../components/chartDashboard";
import Dashboard from "../components/dashboard";
import CustomDrawder from "../components/sideBar";
import { Box, Flex } from "@chakra-ui/react";
const Home: NextPage = () => {
  return (
    <Flex flexDir={"column"} width={["95%", "95%", "80%", "80%"]} mx={"auto"}>
      <Dashboard />
      <ChartDashboard></ChartDashboard>
    </Flex>
  );
};

export default Home;
