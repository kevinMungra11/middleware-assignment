import { ADD_DATA } from "../Constant/constant";

export const ADD_DETAIL = (data) => {
  return {
    type: ADD_DATA,
    payload: data,
  };
};
