import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFilter } from "./model";

const filterSlice = createSlice({
  name: "filter",
  initialState: <IFilter>{
    selectedCategories: [],
    search: "",
    sort: "",
    size: 9,
    currentPage: 0,
  },
  reducers: {
    setSelectedCategories(state, action: PayloadAction<Array<string>>) {
      state.selectedCategories = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.currentPage = 0;
      state.search = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setSelectedCategories, setSort, setSearch, setCurrentPage } =
  filterSlice.actions;

export default filterSlice.reducer;
