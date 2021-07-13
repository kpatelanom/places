import axios from 'axios';
const API_KEY = 'AIzaSyDAoP9JuCQSVNCyHauPg5-Zwo9njXBHIbs';
const API_URL = 'https://maps.googleapis.com/maps/api/place';

export const placeSearch = (lat, long, radius) => {
  console.log('calling');
  return new Promise((resolve, reject) => {});
  const query = `location=${lat},${long}&radius=${radius}&type=restaurant`;

  return axios.get(`${API_URL}/textsearch/json?${query}&key=${API_KEY}`);
};

export const placeDetails = (placeID, fields) => {
  return axios.get(
    `${API_URL}/details/json?place_id=${placeID}&fields=${fields}&key=${API_KEY}`,
  );
};

export const placePhotos = photoReference => {
  return axios.get(
    `${API_URL}/photo?maxwidth=720&photoreference=${photoReference}&key=${API_KEY}`,
  );
};
