import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState:{heightHeader:number} = {
  heightHeader: 0,
};

const getHeightHeader = createSlice({
  name: "height-header",
  initialState,
  reducers: {
    setHeightHeader: (state, action: PayloadAction<number>) => {
      state.heightHeader = action.payload;
    },
  },
});

export const { setHeightHeader } = getHeightHeader.actions;
export default getHeightHeader.reducer;