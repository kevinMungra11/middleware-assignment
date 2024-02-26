// store.js
import { createStore } from "redux";
import listReducer from "./reducer";

const store = createStore(listReducer);

export default store;
