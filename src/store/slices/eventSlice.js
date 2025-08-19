import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  favorites: [],
  currentEvent: {},
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
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    },
  },
});

export const { setEvents, setFavourite, setCurrentEvent } = eventSlice.actions;

export default eventSlice.reducer;
