import axios from "axios";
import { config } from "./config";

const iaxios = axios.create({
  baseURL: config.api_url,
  headers: {
    "x-access-token": "Bearer " + localStorage.getItem("token"),
  },
});

export default iaxios;
