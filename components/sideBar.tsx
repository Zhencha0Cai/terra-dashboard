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
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { DEFAULT_ROUTE, routes, routeToComponent } from "../constants/routes";
import { useRouter } from "next/router";
import KashIcon from "../icons/kash";

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubRoute = {
  href: string;
  title: string;
};

type NavItemProps = {
  href: string;
  icon: IconType;
  subRoutes: SubRoute[];
  children: React.ReactNode;
};
const initActiveState = Object.keys(routeToComponent).reduce(
  (acc: { [key: string]: boolean }, key) => {
    acc[key] = false;
    return acc;
  },
  {}
);

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const [index, setIndex] = useState<number[]>([]);
  const { query, isReady } = useRouter();

  const [active, setActive] = useState(initActiveState);
  useEffect(() => {
    if (!isReady) return;
    setActive({
      ...initActiveState,
      [`/${query.category}/${query.chart}`]: true,
    });
    let i: number[] = [];
    for (let j = 0; j < routes.length; j++) {
      if (routes[j].href === `/${query.category}`) {
        i = [j];
      }
    }
    setIndex((index) => [...index, ...i]);
  }, [isReady, query.category, query.chart]);

  const LinkWrapper = ({
    wrap,
    href,
    component,
  }: {
    wrap: boolean;
    href: string;
    component: React.ReactElement;
  }) => {
    return wrap ? (
      <Box
        onClick={() =>
          setActive({
            ...initActiveState,
            [DEFAULT_ROUTE]: false,
            [href]: true,
          })
        }
      >
        <NextLink href={href}>{component}</NextLink>
      </Box>
    ) : (
      component
    );
  };
  const NavItem = ({ icon, children, href, subRoutes }: NavItemProps) => {
    return (
      <AccordionItem mx={4} mb={2} border={"none"}>
        <h1>
          <LinkWrapper
            wrap={subRoutes.length == 0}
            href={href}
            component={
              <AccordionButton
                p={5}
                borderRadius={10}
                cursor="pointer"
                bgColor={useColorModeValue("blue.50", "gray.400")}
                color={useColorModeValue("inherit", "gray.400")}
              >
                <Flex flex={1} textAlign={"left"}>
                  {icon && <Icon mx="2" boxSize="1.5em" as={icon} />}
                  {children}
                </Flex>
                {subRoutes?.length > 0 ? <AccordionIcon /> : null}
              </AccordionButton>
            }
          />
          {subRoutes.length > 0 ? (
            <AccordionPanel>
              <UnorderedList
                listStylePosition={"inside"}
                color="gray.500"
                width={"100%"}
              >
                {subRoutes.map(({ href, title }) => {
                  return (
                    <NextLink key={href} href={href} passHref>
                      <Link
                        cursor="pointer"
                        color={active[href] ? "green.400" : "inherit"}
                        fontWeight={active[href] ? "bold" : "inherit"}
                        _hover={{
                          textDecoration: "none",
                        }}
                      >
                        <ListItem
                          key={href}
                          p={3}
                          w={"100%"}
                          borderRadius={10}
                          onClick={() =>
                            setActive({
                              ...initActiveState,
                              [DEFAULT_ROUTE]: false,
                              [href]: true,
                            })
                          }
                          _hover={{
                            bg: "gray.100",
                          }}
                        >
                          <Text display={"inline"} color={"black"}>
                            {title}
                          </Text>
                        </ListItem>
                      </Link>
                    </NextLink>
                  );
                })}
              </UnorderedList>
            </AccordionPanel>
          ) : null}
        </h1>
      </AccordionItem>
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
        <KashIcon height="5rem" width="5rem" />
        <Text fontSize="2xl" fontWeight="semibold">
          Terralytics Center
        </Text>
      </Flex>
      <Accordion
        reduceMotion
        index={index}
        allowToggle
        allowMultiple
        onChange={(i: number[]) => setIndex(i)}
      >
        {routes.map(({ title, href, icon, subRoutes }) => {
          return (
            <NavItem key={href} href={href} icon={icon} subRoutes={subRoutes}>
              {title}
            </NavItem>
          );
        })}
      </Accordion>
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
