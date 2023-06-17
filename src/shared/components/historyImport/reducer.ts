import produce from 'immer';
import * as constants from './constants';

// The initial state of the App
export const initialState = {
  isLoading: false,
  list: [],
  error: {},
  paramsSearch: {
    page: 1,
    limit: 20,
  },
  paging: {
    total: 0,
    current: 1,
    pageSize: 20,
  },
};

/* eslint-disable default-case, no-param-reassign */
const historyReducer = (state = initialState, action: any) =>
  produce(state, draft => {
    switch (action.type) {
      case constants.REQUEST_BEGIN:
        draft.isLoading = true;
        break;
      case constants.REQUEST_FAIL:
        draft.error = action.error;
        draft.isLoading = false;
        break;
      case constants.FETCH_ALL:
        draft.isLoading = true;
        break;
      case constants.FETCH_ALL_SUCCESS:
        draft.list = action.payload.rows
        draft.paging = {
          ...draft.paging,
          total: action.payload.count,
          pageSize: action.payload.limit,
          current: action.payload.page
        }
        draft.isLoading = false;
        break;
      case constants.SET_PARAMS_SEARCH:
        draft.paramsSearch = action.params;
        break;
    }
  });

export default historyReducer;
