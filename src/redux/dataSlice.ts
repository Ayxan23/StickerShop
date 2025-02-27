import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface ApiState {
  data: any;
}

const initialState: ApiState = {
  data: null,
};

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch("https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json");
  return await response.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    });
  },
});

export default dataSlice.reducer;
