import { combineReducers } from 'redux';
import { FETCH_DATA_SUCCESS, SET_PAGE, SET_SORT_BY, SET_SEARCH_TERM } from './actionTypes';

const initialDataState = {
  posts: [],
  currentPage: 1,
  totalPages: 1,
  sortBy: null,
  searchTerm: '',
};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  data: dataReducer,
});
