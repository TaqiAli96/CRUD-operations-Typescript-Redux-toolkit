import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { CrudModal } from "./modal/CrudModal";
import { UserTable } from "./component/UserTable";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "./store/store";

export enum ActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
}
export interface User {
  userId: number;
  userName: string;
  userPhone: number;
}
function App() {
  const [actionType, setActionType] = useState<ActionType>();
  const [editUser, setEditUser] = useState<User | null>(null);

  let state = useSelector((store: RootState) => {
    return store["crud"];
  });

  const {
    isOpen: isOpenCrudModal,
    onOpen: onOpenCrudModal,
    onClose: onCloseCrudModal,
  } = useDisclosure();

  const openCrudModel = () => {
    onOpenCrudModal();
    setActionType(ActionType.ADD);
  };
  return (
    <>
      <Container>
        <Button onClick={() => openCrudModel()}>Add a User</Button>
      </Container>
      <UserTable
        data={state || ""}
        setActionType={setActionType}
        onOpen={onOpenCrudModal}
        setEditUser={setEditUser}
      />

      <CrudModal
        isOpen={isOpenCrudModal}
        onClose={onCloseCrudModal}
        setActionType={setActionType}
        actionType={actionType}
        setEditUser={setEditUser}
        editUser={editUser}
      />
    </>
  );
}

export default App;
