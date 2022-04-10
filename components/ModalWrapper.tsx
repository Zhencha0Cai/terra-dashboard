import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

const ModalWrapper = ({ isOpen, onClose, children }: any) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
          {children}
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ModalWrapper;
