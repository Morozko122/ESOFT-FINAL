import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

store.subscribe(() => {
    console.log('State after dispatch: ', store.getState());
});

export { store };
