import { ArrowDownIcon, ArrowUpIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import {
  AlertIcon,
  Box,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Alert,
  Table,
  Image,
  Flex,
  Text,
  StatArrow,
  StatHelpText,
  Stat,
  Heading,
  Tooltip,
  Center,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import CustomSpinner from "../components/feedback/customSpinner";
import { dataFormater } from "../lib/util";
import { useGetTerraTvlQuery } from "../services/api";
interface CustomTableProps {
  data: any;
  activePage: number;
  setActivePage: (page: number) => void;
}

const PercentageChange = ({ delta }: { delta: number | null }) => {
  if (delta === null) return null;
  return (
    <Stat>
      <StatHelpText>
        {delta > 0 ? (
          <StatArrow type="increase" />
        ) : (
          <StatArrow type="decrease" />
        )}
        {delta.toFixed(2)}%
      </StatHelpText>
    </Stat>
  );
};

const CustomTable = ({ data }: CustomTableProps) => {
  const tableHeaders = [
    { id: "name", header: "Name" },
    { id: "tvl", header: "TVl" },
    { id: "mcaptvl", header: " Mcap/TVL" },
    { id: "tvlPrevHour", header: "1h Change" },
    { id: "tvlPrevDay", header: "1d Change" },
    { id: "tvlPrevWeek", header: "7d Change" },
    { id: "fdv", header: "Fully Diluted Valuation (FDV)" },
  ];
  const [sortColumn, setSortColumn] = useState("");
  const [isAscending, setIsAscending] = useState(false);

  const sort = (id: string) => {
    return (a: { [key: string]: any }, b: { [key: string]: any }) => {
      if (a[id] === b[id]) return 1;
      if (a[id] === null) return 1;
      if (b[id] === null) return -1;
      const sortOrder = sortColumn === id ? !isAscending : false;
      setIsAscending(sortOrder);
      setSortColumn(id);
      if (typeof a[id] === "string") {
        return sortOrder
          ? a[id].localeCompare(b[id])
          : b[id].localeCompare(a[id]);
      }
      return sortOrder ? a[id] - b[id] : b[id] - a[id];
    };
  };
  const [tableData, setTableData] = useState(() => [...data].sort(sort("tvl")));

  const handleSort = (id: string) => {
    setTableData([...data].sort(sort(id)));
  };
  return data.length === 0 ? (
    <Alert justifyContent={"center"} status="warning">
      <AlertIcon />
      No Data Found
    </Alert>
  ) : (
    <Box h="100%" w={"100%"} p="5%">
      <Center>
        <Heading textAlign={"center"} mr={2}>
          Terra Protocol TVL Rankings
        </Heading>
        <Tooltip label="Data Source: Defi Llama">
          <InfoOutlineIcon />
        </Tooltip>
      </Center>
      <Box w="100%" pb="5%">
        <Table variant="simple">
          <Thead onClick={(e) => handleSort((e.target as Element).id)}>
            <Tr>
              {tableHeaders.map(
                ({ id, header }: { id: string; header: string }) => {
                  return (
                    <>
                      <Th key={id} id={id}>
                        {header}
                        {sortColumn === id ? (
                          isAscending ? (
                            <ArrowUpIcon />
                          ) : (
                            <ArrowDownIcon />
                          )
                        ) : null}
                      </Th>
                    </>
                  );
                }
              )}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map(
              (
                {
                  name,
                  tvl,
                  mcap,
                  logo,
                  tvlPrevHour,
                  tvlPrevDay,
                  tvlPrevWeek,
                  fdv,
                  mcaptvl,
                  url,
                }: {
                  name: string;
                  tvl: number;
                  mcap: number;
                  logo: string;
                  tvlPrevHour: number;
                  tvlPrevDay: number;
                  tvlPrevWeek: number;
                  fdv: number;
                  mcaptvl: number | number;
                  url: string | null;
                },
                i: number
              ) => {
                return (
                  <Tr key={i}>
                    <Td>
                      <Flex align={"center"}>
                        <Text size="sm" mr={2}>
                          {i + 1}
                        </Text>
                        <Image
                          src={`${logo}`}
                          borderRadius="full"
                          boxSize={"1.8em"}
                          alt="terra protocol logo"
                          mr={4}
                        />
                        {url ? <Link href={url}>{name}</Link> : name}
                      </Flex>
                    </Td>
                    <Td>${dataFormater(tvl)}</Td>

                    <Td>{mcaptvl?.toFixed(6)}</Td>
                    <Td>
                      <PercentageChange delta={tvlPrevHour} />
                    </Td>
                    <Td>
                      <PercentageChange delta={tvlPrevDay} />
                    </Td>
                    <Td>
                      <PercentageChange delta={tvlPrevWeek} />
                    </Td>
                    <Td> {fdv ? dataFormater(fdv) : null}</Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
const TerraTvl = () => {
  const { data, isLoading } = useGetTerraTvlQuery();
  const [activePage, setActivePage] = useState(1);

  if (isLoading) return <CustomSpinner />;

  return (
    <CustomTable
      data={data}
      activePage={activePage}
      setActivePage={setActivePage}
    ></CustomTable>
  );
};

export default TerraTvl;
