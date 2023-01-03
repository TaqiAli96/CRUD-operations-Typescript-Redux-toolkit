import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  //   useToast,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addUser, updateUser } from "../feature/crudFeature";
import { useDispatch } from "react-redux/es/exports";
import { ActionType, User } from "../App";
interface FormProps {
  name: string;
  age: string;
  phone: string;
  onClose: () => void;
  setActionType: React.Dispatch<React.SetStateAction<ActionType | undefined>>;
  actionType: ActionType | undefined;
  setEditUser: React.Dispatch<React.SetStateAction<User | null>>;
  editUser: User | null;
}

export const CrudForm = (props: FormProps) => {
  const dispatch = useDispatch();
  const {
    name,
    phone,
    onClose,
    setActionType,
    actionType,
    setEditUser,
    editUser,
  } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: editUser?.userName || "",
      phone: editUser?.userPhone || "",
    },
  });
  // console.log("editUser =>", editUser);

  const onSubmit = (data: any) => {
    if (actionType === ActionType.ADD) {
      const userData = {
        userId: Date.now(),
        userName: data.username,
        userPhone: data.phone,
      };
      dispatch(addUser(userData));

      reset();
      onClose();
      setActionType(undefined);
    }
    if (actionType === ActionType.EDIT) {
      dispatch(
        updateUser({
          id: editUser?.userId,
          name: data.username,
          phone: data.phone,
        })
      );
      onClose();
    }
  };
  return (
    <VStack align={"stretch"} spacing={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username ? true : false}>
          <FormLabel>{name}</FormLabel>
          <Input
            type="text"
            {...register("username", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {/* {errors.username && errors.username.message} */}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.phone ? true : false} mt={3}>
          <FormLabel>{phone}</FormLabel>
          <Input
            type="phone"
            {...register("phone", {
              required: "This is required",
            })}
          />
          <FormErrorMessage>
            {/* {errors.password && errors.password.message} */}
          </FormErrorMessage>
        </FormControl>

        <HStack mt={3} spacing={5}>
          <Button colorScheme="blue" variant="solid" type="submit">
            Send
          </Button>
          <Button
            colorScheme="blue"
            variant="solid"
            onClick={() => {
              onClose();
              setActionType(undefined);
              setEditUser(null);
            }}
          >
            Close
          </Button>
        </HStack>
      </form>
    </VStack>
  );
};
