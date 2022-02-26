import axios from "axios";
import { config } from "./config";

export const saveUser = (data) => {
  return axios
    .post(config.api_url + "/auth/user/register", data)
    .then((response) => {
      console.log("user:", response);
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const loginUser = (data) => {
  return axios
    .post(config.api_url + "auth/user/login", data)
    .then((response) => {
      console.log("response from utils/user.js", response);
      return response;
    })
    .catch((err) => {
      console.log("ERR from utils/user.js", err);
    });
};
