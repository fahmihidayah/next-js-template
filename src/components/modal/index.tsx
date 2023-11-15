import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";

export interface ConfirmationModelProps {
    title : string;
    message : string;
    isOpen : boolean;
    onClose : () => void;
    action : () => void;
}

export default function ConfirmationModal({title, message, isOpen, onClose, action} : ConfirmationModelProps ) {
    return <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {message}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
                onClose();
                action();
                
            }}>
              Yes
            </Button>
            <Button variant='ghost'>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
}