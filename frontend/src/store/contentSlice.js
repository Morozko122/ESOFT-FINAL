import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/content';

// export const createContent = createAsyncThunk('content/create', async ({ contentData, token }, { rejectWithValue }) => {
//   try {
//     const response = await axios.post(`${API_URL}/create`, contentData, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });
export const createContent = createAsyncThunk(
  'content/createContent',
  async ({ formData, token }, thunkAPI) => {
    try {
      {console.log(formData)};
      const response = await axios.post(`${API_URL}/create`, formData, {
        
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const contentSlice = createSlice({
  name: 'content',
  initialState: {
    content: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.content.push(action.payload);
      })
      .addCase(createContent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default contentSlice.reducer;
