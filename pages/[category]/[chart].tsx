import { Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { routeToComponent } from "../../constants/routes";

const Chart = () => {
  const router = useRouter();
  const { category, chart } = router.query;
  if (category && chart) {
    const CustomChart = routeToComponent[`/${category}/${chart}`];
    return (
      <Center h={"100%"}>
        <CustomChart />;
      </Center>
    );
  }
  return <></>;
};
export default Chart;
