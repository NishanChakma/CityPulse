import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  favorites: [],
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setFavourite: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setEvents, setFavourite } = eventSlice.actions;

export default eventSlice.reducer;
