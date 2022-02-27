import axios from "axios";
import { config } from "./config";

const token = window.localStorage.getItem("user_token");

export const saveSpot = (data) => {
  return axios
    .post(config.api_url + "spot/add", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updatePicture = (data) => {
  return axios
    .post(config.api_url + "spot/picture", data, {
      headers: { "x-access-token": token },
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};
