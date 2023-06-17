import { createSelector } from 'reselect';
import { initialState } from './reducer';

export const selectListModel = (state: any) => state.historyImport || initialState;

export const selectList = () =>
  createSelector(
    selectListModel,
    modelsState => modelsState.list,
  );
export const selectLoading = () =>
  createSelector(
    selectListModel,
    modelsState => modelsState.isLoading,
  );
export const selectError = () =>
  createSelector(
    selectListModel,
    modelsState => modelsState.error,
  );
export const selectPaging = () =>
  createSelector(
    selectListModel,
    modelsState => modelsState.paging,
  );
export const selectParams = () =>
  createSelector(
    selectListModel,
    modelsState => modelsState.paramsSearch,
  );
