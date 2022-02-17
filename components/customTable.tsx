import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Container,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Pagination } from "semantic-ui-react";
import React from "react";
import { readAmount, truncate } from "@terra.kitchen/utils";

interface CustomTableProps {
  data: any;
  activePage: number;
  setActivePage: (page: number) => void;
}

const CustomTable = ({ data, activePage, setActivePage }: CustomTableProps) => {
  const PAGE_SIZE = 15;
  const shouldTruncate = useBreakpointValue({ base: true, md: false });
  return data.length === 0 ? (
    <Alert justifyContent={"center"} status="warning">
      <AlertIcon />
      No Data Found
    </Alert>
  ) : (
    <Box w={"100%"} p="5%" mx={"2%"}>
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
                      <Link
                        href={`https://finder.extraterrestrial.money/mainnet/address/${account}`}
                        isExternal
                      >
                        {shouldTruncate ? truncate(account) : account}
                      </Link>
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
