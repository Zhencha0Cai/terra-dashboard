import type { NextPage } from "next";
import Dashboard from "../components/dashboard";
import { Flex } from "@chakra-ui/react";
const Home: NextPage = () => {
  return (
    <Flex
      flexDir={"column"}
      width={["95%", "95%", "80%", "80%"]}
      mx={"auto"}
    ></Flex>
  );
};

export default Home;
