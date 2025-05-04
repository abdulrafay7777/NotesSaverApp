import { configureStore } from '@reduxjs/toolkit';
import pastesReducer from './redux/PasteSlice';


export const store = configureStore({
  reducer: {
    paste: pastesReducer,
  },
});
 