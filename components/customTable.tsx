import {
  Alert,
  AlertIcon,
  Badge,
  Box,
  Center,
  Heading,
  HStack,
  Link,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { Pagination } from "semantic-ui-react";
import React from "react";
import { readAmount, readDenom, truncate } from "@terra.kitchen/utils";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useGetBalanceHistoryQuery } from "../services/api";
import { useState } from "react";
import LineChart from "./baseCharts/lineChart";
import { format, getTime } from "date-fns";
import { TooltipProps } from "recharts";
import CustomSpinner from "./feedback/customSpinner";
import { knownAddressesMap } from "../constants/constants";

interface CustomTableProps {
  data: any;
  activePage: number;
  setActivePage: (page: number) => void;
  token: string;
}
interface ModalChartProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  token: string;
}

const CustomTooltip = (props: TooltipProps<string, string>) => {
  const { active, payload } = props;
  if (active) {
    const currData = payload && payload.length ? payload[0].payload : null;
    return (
      <Box bgColor={"white"} border="1px solid grey" padding={"10px"}>
        <p>
          {currData ? format(new Date(currData.date), "yyyy-MM-dd") : " -- "}
        </p>
        <Text color="green">
          {"Balance : "}
          <em>
            {currData ? readAmount(currData.balance, { prefix: true }) : " -- "}
          </em>
        </Text>
      </Box>
    );
  }

  return null;
};
const ModalChart = ({
  isOpen,
  onClose,
  address,
  setAddress,
  token,
}: ModalChartProps) => {
  const { data, isLoading } = useGetBalanceHistoryQuery(address);

  const processedData = data?.balance
    ?.map((b) => b.filter(({ denom }) => denom === token))
    .map((balance, i) => {
      return {
        balance: Number(balance[0]?.amount) || 0,
        date: getTime(new Date(data.date[i])),
      };
    });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setAddress("");
      }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent overflowY={"hidden"} maxW={["85%"]} maxH="90%">
        <ModalCloseButton />
        <Box
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="xl"
          p={5}
          w={["100%"]}
          h={"50em"}
        >
          <Heading as="h3" size="md" textAlign={"center"}>
            {`Historical ${readDenom(token)} balance of `}
            <AddressLabel address={address} />
            {` ${address}`}
          </Heading>
          {isLoading || !processedData ? (
            <CustomSpinner />
          ) : (
            <LineChart
              ids={["balance"]}
              data={processedData}
              xAxisProps={{
                type: "number",
                tickCount: 12,
                domain: [processedData[0].date, "dataMax"],
                tickFormatter: (value: number) =>
                  format(getTime(new Date(value)), "yyyy/MM/dd"),
              }}
              tooltipProps={{
                content: (props: TooltipProps<string, string>) => (
                  <CustomTooltip {...props} />
                ),
              }}
            />
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};
const AddressLabel = ({ address }: { address: string }) => {
  return knownAddressesMap.has(address) ? (
    <Badge fontSize={"1rem"} colorScheme={"purple"}>
      {knownAddressesMap.get(address)}
    </Badge>
  ) : null;
};
const CustomTable = ({
  data,
  activePage,
  setActivePage,
  token,
}: CustomTableProps) => {
  const PAGE_SIZE = 15;
  const shouldTruncate = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [address, setAddress] = useState("");

  return data.length === 0 ? (
    <Alert justifyContent={"center"} status="warning">
      <AlertIcon />
      No Data Found
    </Alert>
  ) : (
    <Box w={"100%"} p="5%" overflowX="auto">
      {address && (
        <ModalChart
          isOpen={isOpen}
          onClose={onClose}
          address={address}
          setAddress={setAddress}
          token={token}
        />
      )}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Rank </Th>
            <Th>Account </Th>
            <Th>Total Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data
            .slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE)
            .map(
              (
                { account, amount }: { account: string; amount: string },
                i: number
              ) => {
                return (
                  <Tr key={i}>
                    <Td>{i + Math.floor((activePage - 1) * PAGE_SIZE) + 1} </Td>
                    <Td>
                      <HStack wrap={"wrap"}>
                        <Link
                          href={`https://finder.extraterrestrial.money/mainnet/address/${account}`}
                          isExternal
                        >
                          {shouldTruncate ? truncate(account) : account}
                        </Link>
                        <Tooltip label="View Historical Balance">
                          <Link
                            onClick={() => {
                              onOpen();
                              setAddress(account);
                            }}
                          >
                            <InfoOutlineIcon />
                          </Link>
                        </Tooltip>
                        <AddressLabel address={account} />
                      </HStack>
                    </Td>
                    <Td>{readAmount(amount, { prefix: true })}</Td>
                  </Tr>
                );
              }
            )}
        </Tbody>
      </Table>
      <Center>
        <Pagination
          firstItem={false}
          lastItem={false}
          ellipsisItem={false}
          activePage={activePage}
          onPageChange={(e, { activePage }) =>
            setActivePage(activePage as number)
          }
          totalPages={Math.ceil(data.length / PAGE_SIZE)}
        />
      </Center>
    </Box>
  );
};

export default CustomTable;
