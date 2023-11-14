import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { backendAPIS } from "../../../utils/APIS";
import { redirect } from "react-router-dom";
import { axiosBearerToken } from "../../../utils/headerToken";

const initialState = { data: [], isLoader: false, isError: false };

export const getCategoryAsync = createAsyncThunk(
  "admin/getCategory",

  async () => {
    try {
      const response = await axios.get(backendAPIS.blog.addCategory, {
        headers: {
          Authorization: axiosBearerToken,
        },
      });

      return response.data;
    } catch (error) {
      console.log(error.response.data.detail, " -> ", error);
    }
  }
);

export const addCategoryAsync = createAsyncThunk(
  "admin/addCategory",
  async ({ CategoryName, alert, redirect }) => {
    try {
      const response = await axios.post(
        backendAPIS.blog.addCategory,
        {
          name: CategoryName,
        },
        { headers: { Authorization: axiosBearerToken } }
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data.detail, " -> ", error);
    }
  }
);

export const getCategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCategoryAsync.pending, (state, action) => {
        state.isLoader = true;
      })
      .addCase(getCategoryAsync.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(getCategoryAsync.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
      });

    builder
      .addCase(addCategoryAsync.pending, (state, action) => {
        state.isLoader = true;
      })

      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.isLoader = false;

        // console.log("state - ", state )
        // console.log("action - ", action )

        if (action.payload.message === "Category Added") {
          alert(action.payload.message);
          // redirect("/")
        }

        // state.data.concat(action.payload)
      });
  },
});

export default getCategorySlice.reducer;