import { GET_ALL_SPOTS } from "./actions-types";
import axios from "axios";
import { config } from "../../utils/config";

export const getAllSpots = () => {
  return function (dispatch) {
    axios.get(config.api_url + "spot/all").then((response) => {
      dispatch({
        type: GET_ALL_SPOTS,
        payload: response.data.spots,
      });
    });
  };
};
