import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import contentReducer from './contentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
  },
});

store.subscribe(() => {
    console.log('State after dispatch: ', store.getState());
});

export { store };
