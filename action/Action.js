import Geolocation from 'react-native-geolocation-service';
import {
  placeSearch,
  placeDetails,
  nextPageResult,
  qurtySearch,
  textSearch,
} from './../services/Service';
export const getGeoLocation = () => dispatch => {
  Geolocation.getCurrentPosition(
    position => {
      console.log(position);
      placeSearch(
        position.coords.latitude,
        position.coords.longitude,
        1000,
      ).then(res => {
        console.log(res, 'The first api call');
        dispatch({
          type: 'PLACE_SEARCH',
          payload: {data: res.data, isLoading: false},
        });
      });
    },
    error => {
      console.log('error', error.code, error.message);
    },
  );
};

export const getPlaceDetails = placeID => dispatch => {
  console.log(placeID);
  placeDetails(placeID).then(res => {
    console.log(res);
    dispatch({
      type: 'PLACE_DETAILS',
      payload: res.data,
    });
  });
};

export const getNextPageResult = next_page_token => dispatch => {
  nextPageResult(next_page_token).then(res => {
    console.log('next_page_data> ', res);
    dispatch({
      type: 'NEXT_PAGE',
      payload: res.data,
    });
  });
};

export const getQuerySearch = query => dispatch => {
  qurtySearch(query).then(res => {
    console.log(res);
    dispatch({
      type: 'QUERY_SEARCH',
      payload: res.data,
    });
  });
};

export const getTextSerch = text => dispatch => {
  textSearch(text).then(res => {
    console.log(res);
    dispatch({
      type: 'TEXT_SEARCH',
      payload: res.data,
    });
  });
};
