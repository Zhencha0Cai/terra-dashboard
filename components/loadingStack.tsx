import { Skeleton, Stack } from "@chakra-ui/react";

const LoadingStack = () => {
  return (
    <Stack w={"100%"} h="100%">
      <Skeleton w={"100%"} h="10em"></Skeleton>
      <Skeleton w={"100%"} h="10em"></Skeleton>
      <Skeleton w={"100%"} h="10em"></Skeleton>
    </Stack>
  );
};

export default LoadingStack;
