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
} from "@chakra-ui/react";
import axios from "axios";
import { config } from "../../utils/config";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import { fetchPhotos, openUploadWidget } from "../../utils/cloudinaryServices";

const FormAddSpot = (props) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("street");
  const [location, setLocation] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [images, setImages] = useState([]);

  const token = window.localStorage.getItem("user_token");

  const checkUploadResult = (resultEvent) => {
    console.log("RESULT EVENT", resultEvent);
    if (resultEvent.event === "success") {
      let data = {
        imageURL: resultEvent.info.secure_url,
        id: props.user.infos._id,
      };
      axios
        .post(config.api_url + "spot/picture", data, {
          headers: { "x-access-token": token },
        })
        .then((response) => {
          console.log(response);
          setImageURL(resultEvent.info.secure_url);
          return response;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showWidget = () => {
    let widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "du7ab0zzw",
        uploadPreset: "SpotX-preset",
        maxImageWidth: 800,
        cropping: false,
        showAdvancedOptions: true,
      },
      (error, result) => {
        console.log("checkUpload RESULT", result);
        checkUploadResult(result);
      }
    );
    widget.open();
  };

  const onSubmitForm = () => {
    let data = {
      name: name,
      // category: category,
      // location: location,
      imageURL: imageURL,
      user_id: props.user.infos._id,
    };

    axios
      .post(config.api_url + "spot/add", data, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
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
          <button
            onClick={(e) => {
              e.preventDefault();
              showWidget();
            }}
          >
            Upload Photo
          </button>

          <section>
            {images.map((i, idx) => (
              <img src={i} key={idx} alt="" />
            ))}
          </section>
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
                {/* <FormControl id="category">
                <Select placeholder="Selectionne une catégorie">
                  <option value="street">Street</option>
                  <option value="courbe">Courbe</option>
                  <option value="polyvalent">Polyvalent</option>
                </Select>
              </FormControl> */}

                <Stack spacing={14}>
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
