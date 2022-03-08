import { Flex, useColorModeValue } from "@chakra-ui/react";
import FormLogin from "../../components/Forms/FormLogin";

const Login = (props) => {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("black")}
      color="white"
    >
      <FormLogin />
    </Flex>
  );
};

export default Login;
