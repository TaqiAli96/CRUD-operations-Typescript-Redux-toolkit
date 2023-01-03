import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ActionType, User } from "../App";
import { CrudForm } from "../component/CrudForm";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActionType: React.Dispatch<React.SetStateAction<ActionType | undefined>>;
  actionType: ActionType | undefined;
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
  editUser: User | null;
}
export const CrudModal = (props: ModalProps) => {
  const { isOpen, onClose, setActionType, actionType, setEditUser, editUser } =
    props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setActionType(undefined);
        setEditUser(null);
      }}
    >
      <ModalOverlay />
      <ModalContent>
        {actionType && (
          <ModalHeader>
            {actionType === ActionType.ADD && <Text>Add a user</Text>}
            {actionType === ActionType.EDIT && <Text>Edit a user</Text>}
          </ModalHeader>
        )}
        <ModalCloseButton />
        <ModalBody>
          <CrudForm
            name="Username"
            age="Age"
            phone="Phone"
            onClose={onClose}
            setActionType={setActionType}
            actionType={actionType}
            setEditUser={setEditUser}
            editUser={editUser}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
