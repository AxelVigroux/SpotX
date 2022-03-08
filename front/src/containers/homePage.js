import { connect } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Box, Flex, Button } from "@chakra-ui/react";
import Map from "../components/Map";

const HomePage = (props) => {
  let navigate = useNavigate();

  return (
    <Box bg="black" display={"flex"}>
      <Flex
        h={"75%"}
        w={"75%"}
        m={"auto"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Map />
        {props.user.isLogged ? (
          <Button
            size="md"
            width={"100%"}
            mt={5}
            bg="primary.500"
            color="white"
            rounded={"full"}
            onClick={() => {
              navigate("/addSpot");
            }}
          >
            Ajoute ton spot
          </Button>
        ) : (
          <Button
            as={Link}
            to="/login"
            size="md"
            width={"100%"}
            mt={5}
            bg="primary.500"
            color="white"
            rounded={"full"}
          >
            Connecte toi !
          </Button>
        )}
      </Flex>
    </Box>
  );
};

const mapStateToProps = (store) => {
  return {
    user: store.user,
  };
};

export default connect(mapStateToProps, null)(HomePage);
