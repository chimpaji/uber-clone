import { configureStore } from "@reduxjs/toolkit";
import NavSlice from "./slices/NavSlice";
import navReducer from "./slices/NavSlice";

export default store = configureStore({
  reducer: {
    nav: navReducer,
  },
});
