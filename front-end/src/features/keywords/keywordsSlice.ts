/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { isString } from "util";
import { isKeywords } from "../../typeScript/typeGuards";

export type Keywords = string[];

const initialState: Keywords = [];
export const keywordsSlice = createSlice({
    name: "keywords",
    initialState,
    reducers: {
        add: (state, action) => {
            const newKeyword = action.payload;
            if (typeof newKeyword === "string") {
                if (!state.includes(newKeyword.toLowerCase())) {
                    state.push(newKeyword.toLowerCase());
                }
            }
        },
        remove: (state, action) => {
            const newKeywordToRemove = action.payload;
            console.log(newKeywordToRemove);
            if (typeof newKeywordToRemove === "string") {
                state = state.filter((keyword) => {
                    return keyword != newKeywordToRemove;
                });
            }
        },
    },
});

export const { add, remove } = keywordsSlice.actions;
export const selectEquipment = (state: any) => state.keywordsSlice;
export default keywordsSlice.reducer;
