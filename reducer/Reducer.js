const Reducer = (state = {isLoading: true}, action) => {
  switch (action.type) {
    case 'PLACE_SEARCH':
      return {
        ...state,
        placeData: action.payload.data.results,
        next_page_token: action.payload.data.next_page_token,
        isLoading: action.payload.isLoading,
      };
    case 'PLACE_DETAILS':
      console.log(action.payload.result);
      return {
        ...state,
        PlacePhotos: action.payload.result.photos
          ? action.payload.result.photos
          : undefined,
        placeReviews: action.payload.result.reviews
          ? action.payload.result.reviews
          : undefined,
        formatted_phone_number: action.payload.result.formatted_phone_number
          ? action.payload.result.formatted_phone_number
          : undefined,
        actual_phone_number: action.payload.result.formatted_phone_number
          ? action.payload.result.formatted_phone_number.replace(
              /[\-\s\(\)]/g,
              '',
            )
          : null,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        placeData: [...state.placeData, ...action.payload.results],
        next_page_token: action.payload.next_page_token,
      };
    case 'QUERY_SEARCH':
      return {
        ...state,
        predictions: action.payload.predictions,
      };
    case 'TEXT_SEARCH':
      return {
        ...state,
        textSerchResult: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

export default Reducer;
