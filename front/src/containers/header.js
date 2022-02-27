import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  InfoIcon,
  SearchIcon,
} from "@chakra-ui/icons";

const NavLink = ({ children }) => (
  <Link
    color="white"
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "black",
    }}
  >
    {children}
  </Link>
);

const NavBar = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="black" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={
            isOpen ? (
              <CloseIcon color={"white"} />
            ) : (
              <HamburgerIcon color={"white"} />
            )
          }
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Box color="primary.500" fontSize="4xl">
            SpotX
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {props.user.isLogged ? (
              <NavLink>Mon profil</NavLink>
            ) : (
              <NavLink>Connecte toi</NavLink>
            )}
            <NavLink>Ajoute un spot</NavLink>
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {props.user.isLogged ? (
              <NavLink>
                {" "}
                <InfoIcon m={2} />
                Mon profile
              </NavLink>
            ) : (
              <NavLink>
                {" "}
                <InfoIcon m={2} />
                Connecte toi
              </NavLink>
            )}
            ;
            <NavLink>
              <AddIcon m={2} />
              Ajoute un spot
            </NavLink>
            <NavLink>
              <SearchIcon m={2} />
              Trouve un spot
            </NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, null)(NavBar);
