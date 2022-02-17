/** @format */

import { configureStore } from "@reduxjs/toolkit";

import pasteReducer from "../features/paste/pasteSlice.ts";
import KeyWordsReducer from "../features/keywords/keywordsSlice.ts";
import alertsReducer from "../features/alerts/alertsSlice.ts";


//import { loggingMiddleware } from "../middleweres/middleweres";

export const store = configureStore({
    reducer: {
        pasteReducer,
        KeyWordsReducer,alertsReducer
    },
});

export default store;
