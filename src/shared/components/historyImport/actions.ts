import * as constants from './constants';

export function requestBegin() {
  return {
    type: constants.REQUEST_BEGIN,
  };
}
export function requestFail(error: any) {
  return {
    type: constants.REQUEST_FAIL,
    error,
  };
}

export function setParamsSearch(params: any) {
  return {
    type: constants.SET_PARAMS_SEARCH,
    params,
  };
}
export function fetchAll(params: any, pathBase) {

  return {
    type: constants.FETCH_ALL,
    params,
    pathBase
  };
}
export function fetchAllSuccess(payload: any) {
  return {
    type: constants.FETCH_ALL_SUCCESS,
    payload
  };
}


