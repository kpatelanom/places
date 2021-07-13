import axios from 'axios';
import {REACT_APP_API_KEY} from '@env';

const API_URL = 'https://maps.googleapis.com/maps/api/place';

export const placeSearch = (lat, long, radius, type) => {
  const query = `location=${lat},${long}&radius=${radius}`;
  return axios.get(
    `${API_URL}/textsearch/json?${query}&key=${REACT_APP_API_KEY}`,
  );
};

export const nextPageResult = next_page_token => {
  return axios.get(
    `${API_URL}/nearbysearch/json?pagetoken=${next_page_token}&key=${REACT_APP_API_KEY}`,
  );
};

export const placeDetails = placeID => {
  return axios.get(
    `${API_URL}/details/json?place_id=${placeID}&fields=photo,formatted_phone_number,review&key=${REACT_APP_API_KEY}`,
  );
};

export const placePhotosUrl = photoReference => {
  return `${API_URL}/photo?maxwidth=400&photoreference=${photoReference}&key=${REACT_APP_API_KEY}`;
};

export const qurtySearch = query => {
  return axios.get(
    `${API_URL}/queryautocomplete/json?key=${REACT_APP_API_KEY}&input=${query}`,
  );
};

export const textSearch = text => {
  return axios.get(
    `${API_URL}/textsearch/json?query=${text}&key=${REACT_APP_API_KEY}`,
  );
};
