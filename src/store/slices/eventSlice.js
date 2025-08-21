import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  favorites: [],
  currentEvent: null,
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
    cleanEvent: state => {
      state.events = [];
      state.favorites = [];
      state.currentEvent = null;
    },
  },
});

export const { setEvents, setFavourite, setCurrentEvent, cleanEvent } =
  eventSlice.actions;

export default eventSlice.reducer;
