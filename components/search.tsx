import {
  Button,
  Flex,
  Heading,
  HStack,
  Popover,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Stack,
  useDisclosure,
  VStack,
  Text,
  Image,
} from "@chakra-ui/react";
import _ from "lodash";
import React from "react";
import FocusLock from "react-focus-lock";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  Item,
} from "@choc-ui/chakra-autocomplete";
import { useGetTokenListQuery } from "../services/api";
import { CustomSearchProps, MapData } from "../types/common";
import { readDenom } from "@terra.kitchen/utils";

const CustomSearch = ({ token, handleOnOptionSelect }: CustomSearchProps) => {
  const { data, isLoading } = useGetTokenListQuery();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const ref = React.useRef(null);
  if (isLoading) return <></>;
  const denomToUrl = data.reduce(
    (acc: MapData, { denom, url }: { denom: string; url: string }) => {
      acc[readDenom(denom)] = url;
      return acc;
    },
    {}
  );
  const Form = () => {
    return (
      <Stack spacing={4}>
        <Flex boxSize="full" p={30} h="25em" justifyContent="center">
          <AutoComplete
            rollNavigation
            openOnFocus
            onSelectOption={handleOnOptionSelect}
            closeOnSelect
            closeOnBlur
          >
            <AutoCompleteInput variant="filled" placeholder="Search..." />
            <AutoCompleteList h="15em" border={0}>
              {data.map(({ denom, url }: { denom: string; url: string }) => (
                <AutoCompleteItem
                  onClick={onClose}
                  key={`option-${denom}`}
                  value={denom}
                  align="center"
                >
                  <Image
                    borderRadius="full"
                    boxSize="2em"
                    src={url}
                    alt={denom}
                  />
                  <Text ml="4">{readDenom(denom)}</Text>
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
        </Flex>
      </Stack>
    );
  };

  return (
    <VStack mt={"2%"} mb={"1%"}>
      <Flex align={"center"}>
        <Popover
          isOpen={isOpen}
          initialFocusRef={ref}
          onOpen={onOpen}
          onClose={onClose}
          placement="bottom"
        >
          <PopoverTrigger>
            <HStack>
              <Button
                leftIcon={<Image width="2em" src={denomToUrl[token]} alt="" />}
                colorScheme="blue"
                variant="outline"
                size={"lg"}
              >
                {token}
              </Button>
              <Heading>Rich List</Heading>
            </HStack>
          </PopoverTrigger>
          <PopoverContent>
            <FocusLock returnFocus persistentFocus={false}>
              <Form />
              <PopoverCloseButton />
              <PopoverArrow />
            </FocusLock>
          </PopoverContent>
        </Popover>
      </Flex>
    </VStack>
  );
};
export default CustomSearch;
