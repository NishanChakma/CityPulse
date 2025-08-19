import http from './config/networkClient';

const API_BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events.json'; //THIS SHOULD BE IN .env FILE
const API_KEY = 'Am65w8xDiOQdKU1hyfqUM5iKBg6GQh1X'; //This key should be in .env file

const API = {
  async getEvents(keyword, city) {
    const response = await http.get(
      `${API_BASE_URL}?keyword=${encodeURIComponent(
        keyword,
      )}&city=${encodeURIComponent(city)}&apikey=${API_KEY}`,
    );
    return response;
  },
};

export default API;
