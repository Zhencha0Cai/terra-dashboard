import { Box, Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import _ from "lodash";
const Dashboard = ({ data }: any) => {
  return (
    <Flex
      borderWidth="1px"
      borderRadius="lg"
      m={"1% 0"}
      p={"1%"}
      width={"100%"}
    >
      <StatGroup w={"100%"} justifyContent={"flex-start"}>
        {Object.keys(data).map((key) => {
          return (
            <Box key={key} w={["90%", "90%", "30%"]} textAlign={"center"}>
              <Stat>
                <StatLabel fontSize="xl" color="grey">
                  {key
                    .split("_")
                    .map((w) => _.capitalize(w))
                    .join(" ")}
                </StatLabel>
                <StatNumber>{data[key]}</StatNumber>
              </Stat>
            </Box>
          );
        })}
      </StatGroup>
    </Flex>
  );
};

export default Dashboard;
