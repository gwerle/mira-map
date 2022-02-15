import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import { ModalRight } from './styled';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MapFilter = ({ isOpen, onClose }: Props): JSX.Element => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="scale">
      <ModalOverlay />
      <ModalRight>
        <ModalContent h="100vh" m={0} justifyContent="end">
          <ModalCloseButton />
          <ModalBody>abcabcv</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </ModalRight>
    </Modal>
  );
};

export default MapFilter;
