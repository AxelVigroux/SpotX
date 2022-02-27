import { Flex, useColorModeValue } from "@chakra-ui/react";

import FormAddSpot from "../../components/Forms/FormAddSpot";

const AddSpot = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("black")}
      color="white"
    >
      <FormAddSpot />
    </Flex>
  );
};

export default AddSpot;
