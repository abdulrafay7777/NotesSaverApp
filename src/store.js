import { configureStore } from '@reduxjs/toolkit';
import pasteReducer from './redux/pasteslice';



export const store = configureStore({
  reducer: {
    paste: pasteReducer,
  },
});
 