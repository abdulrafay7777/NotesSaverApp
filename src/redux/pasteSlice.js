import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    AddtoPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Saved to clipboard successfully")
    },

    UpdateToPaste: (state, action) => {
      const updatedPaste = action.payload; // Step 1

      const index = state.pastes.findIndex(
        (paste) => paste._id === updatedPaste._id // Step 2
      );

      if (index !== -1) {
        state.pastes[index] = updatedPaste; // Step 3
        localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Step 4
        toast("Paste updated successfully");
      }

      else {
        toast.error("Paste not found");
      }
    },

    ResetAllPaste: (state, action) => {
      state.pastes = [];

      localStorage.removeItem("pastes")
      toast("All pastes have been cleared");
    },

    RemoveFromPaste: (state, action) => {
      const idToRemove = action.payload;

      state.pastes = state.pastes.filter(paste => paste._id !== idToRemove);

      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste removed successfully");
    },
  },
})

// Action creators are generated for each case reducer function
export const { AddtoPaste, UpdateToPaste, ResetAllPaste, RemoveFromPaste } = pasteSlice.actions;

export default pasteSlice.reducer