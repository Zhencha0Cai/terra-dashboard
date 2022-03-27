import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  BoxProps,
} from "@chakra-ui/react";
import { GrMoney } from "react-icons/gr";
import React from "react";
import { FcComboChart } from "react-icons/fc";
import TerraIcon from "../icons/terraIcon";
import Link from "next/link";
import { IconType } from "react-icons";

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type NavItemProps = {
  icon: IconType;
  children: React.ReactNode;
} & BoxProps;

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const routes = [
    {
      href: "/",
      title: "General",
      icon: FcComboChart,
    },
    {
      href: "/richlist",
      title: "Rich List",
      icon: GrMoney,
    },
  ];

  const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
      <Flex
        align="center"
        pl="4"
        py="3"
        mx={4}
        mb={2}
        borderRadius="10"
        cursor="pointer"
        bgColor={useColorModeValue("blue.50", "gray.400")}
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200"),
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && <Icon mx="2" boxSize="1.5em" as={icon} />}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: BoxProps) => (
    <Box
      as="nav"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      overflowX="hidden"
      overflowY="auto"
      borderColor={useColorModeValue("inherit", "gray.700")}
      w="100%"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <TerraIcon height="5rem" width="5rem" />
        <Text fontSize="2xl" fontWeight="semibold">
          Terra Dashboard
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="lg"
        color="gray.600"
        aria-label="Main Navigation"
        onClick={onClose}
      >
        {routes.map(({ title, href, icon }) => {
          return (
            <Link href={href} passHref key={href}>
              <NavItem icon={icon}>{title}</NavItem>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
  return (
    <Box w="100%" minH={"100vh"}>
      <SidebarContent display={["none", "none", "none", "unset"]} />
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
