import {createSlice} from "@reduxjs/toolkit";

const name = 'categories';

const categoriesSlice = createSlice({
  name,
  initialState: {
    categories: [],
    fetchLoading: false,
    fetchError: null,
  },
  reducers: {
    fetchCategoriesRequest(state) {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    fetchCategoriesSuccess(state, {payload: categories}) {
      state.fetchLoading = false;
      state.categories = categories;
    },
    fetchCategoriesFailure(state, action) {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
  }
});

export const {
    fetchCategoriesRequest,
    fetchCategoriesSuccess,
    fetchCategoriesFailure
} = categoriesSlice.actions;

export default categoriesSlice;