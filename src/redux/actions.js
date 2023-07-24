import { FETCH_DATA_SUCCESS, SET_PAGE, SET_SORT_BY, SET_SEARCH_TERM } from './actionTypes';

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const setSortBy = (sortBy) => ({
  type: SET_SORT_BY,
  payload: sortBy,
});

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});
