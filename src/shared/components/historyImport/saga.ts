import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosGet } from 'shared/request';
import { showError } from 'shared/utils';
import * as actions from './actions';
import * as constants from './constants';
// Add new block
export function* handleFetchAll(action: any) {
  yield put(actions.requestBegin());
  const path = action.pathBase.list;
  try {
    const res = yield call(axiosGet, path, action.params);
    yield put(actions.fetchAllSuccess(res.data));
  } catch (err) {
    showError("Không thành công", err?.message)
    yield put(actions.requestFail(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* watchFetchAddBlock() {
  yield takeLatest(constants.FETCH_ALL, handleFetchAll);
}
