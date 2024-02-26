import { ADD_DATA } from "../Constant/constant";

const initialState = {
  dataList: JSON.parse(localStorage.getItem("dataList")) || [],
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DATA:
      const updatedData = [...state.dataList, action.payload];
      localStorage.setItem("dataList", JSON.stringify(updatedData));
      return {
        ...state,
        dataList: updatedData,
      };
    default:
      return state;
  }
};

export default listReducer;
