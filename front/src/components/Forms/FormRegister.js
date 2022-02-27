import { useState } from "react";
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
import axios from "axios";
import { config } from "../../utils/config";

export default function FormRegister() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitForm = () => {
    let data = {
      pseudo: pseudo,
      email: email,
      password: password,
    };

    axios.post(config.api_url + "auth/user/register", data).then((response) => {
      if (response.status === 200) {
        console.log("ok");
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
        {" "}
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} color="white">
              Rejoins nous !{" "}
            </Heading>
            <Text fontSize={"lg"} color={"white"}>
              et partage tes meilleurs <Link color={"primary.500"}>spots</Link>{" "}
              ! ✌️
            </Text>{" "}
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
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
                    to="/login"
                    _hover={{
                      color: "primary.500",
                    }}
                  >
                    Déja inscrit ? Connecte toi !
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
                  Inscription
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}
