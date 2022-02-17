import Head from "next/head";
import {
  Flex,
  Box,
  Divider,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import React from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBar from "./sideBar";
const Layout = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box>
        <Head>
          <title>Terra Dashboard</title>
          <meta name="description" content="Terra Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header>
          <IconButton
            icon={<HamburgerIcon />}
            size={"lg"}
            display={["flex", "flex", "flex", "none"]}
            aria-label="Open Side Bar"
            onClick={onOpen}
          />
        </header>
        <main className={styles.main}>
          <Flex justify={"flex-start"} h={"100vh"}>
            {
              <Box
                display={["none", "none", "none", "flex"]}
                w={["100%", "100%", "15%", "15%"]}
                ml={0}
              >
                <SideBar isOpen={isOpen} onClose={onClose} />
                <Divider orientation="vertical" />
              </Box>
            }

            <Box w={["100%", "100%", "100%", "85%"]}>{children}</Box>
          </Flex>
        </main>
      </Box>
    </>
  );
};

export default Layout;
