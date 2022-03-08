import { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../utils/user";
import {
  logged_in_user,
  user_get_position,
} from "../../actions/users/userAction";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Box,
  Button,
  useColorModeValue,
  Heading,
  Text,
} from "@chakra-ui/react";

const FormLogin = (props) => {
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const onSubmitForm = () => {
    let data = {
      pseudo: pseudo,
      password: password,
    };

    loginUser(data).then((response) => {
      if (response.status === 200) {
        window.localStorage.setItem("user_token", response.data.token);
        props.logged_in_user(response.data.user);
        navigate("/");
      }
    });
  };

  return (
    <Stack spacing={4}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm();
        }}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="white">
              Connecte toi !
            </Heading>
            <Text fontSize={"lg"} color={"white"}>
              viens découvrir les meilleurs
              <Link color={"primary.500"}> spots</Link> ! ✌️
            </Text>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("gray", "gray")}
              boxShadow={"lg"}
              p={8}
            >
              <FormControl id="pseudo">
                <FormLabel>Pseudo</FormLabel>
                <Input
                  type="text"
                  name="pseudo"
                  onChange={(e) => {
                    setPseudo(e.currentTarget.value);
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.currentTarget.value);
                  }}
                />
              </FormControl>
              <Stack spacing={14}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link
                    to="/register"
                    _hover={{
                      color: "primary.500",
                    }}
                  >
                    Pas de compte ? Inscris toi !
                  </Link>
                </Stack>
                <Button
                  type="submit"
                  value="Register"
                  bg={"primary.500"}
                  color={"white"}
                  _hover={{
                    bg: "primary.300",
                  }}
                >
                  Connexion
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};
const mapDispatchToProps = {
  logged_in_user,
  user_get_position,
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    position: store.position,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
