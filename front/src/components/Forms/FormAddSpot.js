import { useState } from "react";
import { connect } from "react-redux";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
  Button,
  useColorModeValue,
  Heading,
  Select,
  Image,
} from "@chakra-ui/react";
import { CloudinaryContext } from "cloudinary-react";
import { useNavigate } from "react-router-dom";
import { saveSpot, updatePicture } from "../../utils/spot";

const FormAddSpot = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("street");
  const [location, setLocation] = useState([]);
  const [imageURL, setImageURL] = useState("");

  let navigate = useNavigate();

  const checkUploadResult = (resultEvent) => {
    if (resultEvent.event === "success") {
      let data = {
        imageURL: resultEvent.info.secure_url,
        id: props.user.infos._id,
      };

      updatePicture(data).then((response) => {
        if (response.status === 200) {
          setImageURL(resultEvent.info.secure_url);
          setLocation(props.position);
        }
      });
    }
  };

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "du7ab0zzw",
        uploadPreset: "SpotX-preset",
        maxImageWidth: 600,
        cropping: true,
        showAdvancedOptions: true,
      },
      (error, result) => {
        checkUploadResult(result);
      }
    );
    widget.open();
  };

  const onSubmitForm = () => {
    let data = {
      name: name,
      category: category,
      location: location,
      imageURL: imageURL,
      user_id: props.user.infos._id,
    };

    saveSpot(data).then((response) => {
      if (response.status === 201) {
        navigate("/");
      }
    });
  };

  return (
    <CloudinaryContext cloudName="du7ab0zzw">
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
                Rajoute ton spot
              </Heading>
              <Box
                rounded={"lg"}
                bg={useColorModeValue("gray", "gray")}
                boxShadow={"lg"}
                p={8}
              >
                <FormControl id="upload-picture">
                  {imageURL ? (
                    <Box size={"lg"}>
                      <Image src={imageURL} alt="upload picture"></Image>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setImageURL("");
                        }}
                      >
                        Supprimer la photo
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      border={"1px"}
                      onClick={(e) => {
                        e.preventDefault();
                        showWidget();
                      }}
                    >
                      Ajoute une photo
                    </Button>
                  )}
                </FormControl>
                <FormControl id="name">
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    name="name"
                    onChange={(e) => {
                      setName(e.currentTarget.value);
                    }}
                  />
                </FormControl>
                <FormControl id="category">
                  <FormLabel>Catégorie</FormLabel>

                  <Select
                    id="option"
                    bg={"gray"}
                    onChange={(e) => {
                      setCategory(e.currentTarget.value);
                    }}
                  >
                    <option id="option" value="street">
                      Street
                    </option>
                    <option id="option" value="courbe">
                      Skatepark
                    </option>
                  </Select>
                </FormControl>
                <Stack spacing={14}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  ></Stack>
                  <Button
                    type="submit"
                    value="Register"
                    bg={"primary.500"}
                    color={"white"}
                    _hover={{
                      bg: "primary.300",
                    }}
                  >
                    Envoyer
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </CloudinaryContext>
  );
};

const mapStateToProps = (store) => {
  return {
    position: store.position,
    user: store.user,
  };
};

export default connect(mapStateToProps)(FormAddSpot);
