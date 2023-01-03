import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import { deleteUser } from "../feature/crudFeature";
import { useDispatch } from "react-redux/es/exports";
import { ActionType, User } from "../App";
import { Data } from "../feature/Interface";

interface TableProps {
  data: Data[];
  setActionType: React.Dispatch<React.SetStateAction<ActionType | undefined>>;
  onOpen: () => void;
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const Columns = [
  {
    label: "",
    colSpan: 2,
  },
  {
    label: "UserName",
    colSpan: 2,
  },

  {
    label: "Phone",
    colSpan: 1,
  },

  {
    label: "",
    colSpan: 1,
  },
];

export const UserTable = (props: TableProps) => {
  const { data, setActionType, onOpen, setEditUser } = props;
  const dispatch = useDispatch();
  const removeUser = (uID: string) => {
    setActionType(ActionType.DELETE);
    dispatch(deleteUser(uID));
    setTimeout(() => {
      setActionType(undefined);
    }, 500);
  };
  const updateUser = (user: any) => {
    onOpen();
    setActionType(ActionType.EDIT);
    setEditUser(user);
  };
  return (
    <>
      <Box overflow={"auto"}>
        <Grid
          templateRows={"repeat(1, 1fr)"}
          templateColumns={"repeat(10, 1fr)"}
          py={4}
          rounded={"lg"}
          minW={"1050px"}
          overflow={"hidden"}
          alignItems={"center"}
          textAlign={{ base: "center", md: "left" }}
        >
          {Columns.map((item, index) => (
            <GridItem key={item.label + index} colSpan={item.colSpan}>
              <Flex>
                <Box display="flex" alignItems="center">
                  <Text textStyle={"paragraph"}>{item.label}</Text>
                </Box>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {data?.length > 0 &&
        data.map((user: any) => (
          <Grid
            templateRows={"repeat(1, 1fr)"}
            templateColumns={"repeat(10, 1fr)"}
            rounded={"lg"}
            border={"1px"}
            borderStyle={"solid"}
            py={4}
            mt={3}
            overflow={"hidden"}
            alignItems={"center"}
            textAlign={{ base: "center", md: "left" }}
            minW={"1050px"}
            key={user.userId}
          >
            <GridItem colSpan={2}></GridItem>

            <GridItem colSpan={1}>{user.userName}</GridItem>
            <GridItem colSpan={1}></GridItem>

            <GridItem colSpan={1}>
              <Text
                textStyle={"paragraph"}
                // color={rowValueColor}
                textAlign="left"
                paddingLeft="5px"
              >
                {user.userPhone}
              </Text>
            </GridItem>
            <GridItem colSpan={1}></GridItem>
            <GridItem colSpan={1}>
              <HStack spacing={3}>
                <Button
                  colorScheme="blue"
                  onClick={() => removeUser(user.userId)}
                >
                  Delete
                </Button>
                <Button colorScheme="blue" onClick={() => updateUser(user)}>
                  Edit
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        ))}
    </>
  );
};
