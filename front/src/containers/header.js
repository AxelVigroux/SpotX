import React from "react";
import { connect } from "react-redux";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Link,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, AddIcon, InfoIcon } from "@chakra-ui/icons";

const NavLink = ({ children, href, color, fontSize }) => (
  <Link
    fontSize={fontSize}
    color={color}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "black",
    }}
    href={href}
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
          <Box>
            <NavLink color="primary.500" fontSize="4xl" href={"/"}>
              SpotX
            </NavLink>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {props.user.isLogged ? (
              <NavLink color={"white"} href={"addSpot"}>
                Ajoute un spot
              </NavLink>
            ) : (
              <NavLink color={"white"} href="login">
                Connecte toi
              </NavLink>
            )}
          </HStack>
        </HStack>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {props.user.isLogged ? (
              <NavLink color={"white"} href="addSpot">
                {" "}
                <AddIcon m={2} />
                Ajoute un spot
              </NavLink>
            ) : (
              <NavLink color={"white"} href="login">
                {" "}
                <InfoIcon m={2} />
                Connecte toi
              </NavLink>
            )}
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
