import { Center, Skeleton, Stack } from "@chakra-ui/react";

const LoadingStack = () => {
  return (
    <Center w={"90%"}>
      <Stack w={"100%"} h="100%">
        <Skeleton w={"100%"} h="10em"></Skeleton>
        <Skeleton w={"100%"} h="10em"></Skeleton>
        <Skeleton w={"100%"} h="10em"></Skeleton>
      </Stack>
    </Center>
  );
};

export default LoadingStack;
