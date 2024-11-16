import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface AppState {
  isLoading: boolean;
}

const initialState: AppState = {
  isLoading: false,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
      
    },
    
  },
});

export const { toggleIsLoading } = appStateSlice.actions;

export default appStateSlice.reducer;
