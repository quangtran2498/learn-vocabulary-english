import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface DataVocabuleryCustomI {
  vocabulary:string;
  mean: string;
}

export interface Vocabulery {
  vocabuleryNumber: number;
  dataVocabuleryCustom: DataVocabuleryCustomI[];
}

const initialState: Vocabulery = {
  vocabuleryNumber: 0,
  dataVocabuleryCustom: [{ vocabulary: "", mean: "" }],
};

const learnVocabulery = createSlice({
  name: "vocabulery",
  initialState,
  reducers: {
    setVocabuleryNumber: (state, action: PayloadAction<number>) => {
      state.vocabuleryNumber = action.payload;
    },
    setDataVocabuleryCustom: (
      state,
      action: PayloadAction<DataVocabuleryCustomI[]>
    ) => {
      state.dataVocabuleryCustom = action.payload;
    },
  },
});

export const { setVocabuleryNumber, setDataVocabuleryCustom } =
  learnVocabulery.actions;
export default learnVocabulery.reducer;
