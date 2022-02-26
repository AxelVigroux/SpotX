import { Flex, useColorModeValue } from "@chakra-ui/react";
import FormRegister from "../../components/Forms/FormRegister";

const Register = (props) => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("black")}
      color="white"
    >
      <FormRegister />
    </Flex>
  );
};

export default Register;
