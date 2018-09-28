import {
  call, put, fork, takeLatest, select,
} from 'redux-saga/effects';
import { delay, cancel } from 'redux-saga';
import _ from 'lodash';
import SubjectsActions, { MODEL, IGNORE_ACTIONS, SubjectsTypes } from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import { searchSubjects } from '../../api/subjects';
import { PRIMARY_KEY } from '../crudCreator/actions';

function* handleSearchInput(text) {
  yield delay(300);
  try {
    const response = yield call(searchSubjects, text);
    // if (response)
    const { data } = yield select(state => state.subjects);
    if (response.success) {
      const convertData = {
        ids: response.data.map(item => item[PRIMARY_KEY]),
        data: { ...data, ..._.keyBy(response.data, PRIMARY_KEY) },
      };
      yield put(SubjectsActions.getAllSubjectsSuccess(convertData));
    } else {
      yield put(SubjectsActions.getAllSubjectsFailure(response));
    }
  } catch (err) {
    yield put(SubjectsActions.getAllSubjectsFailure(err));
  }
}

export function* searchSubjectsSaga({ text }) {
  let task = null;
  if (task) {
    yield cancel(task);
  }
  task = yield fork(handleSearchInput, text);
}

export default [
  ...rootCRUDSaga(MODEL, IGNORE_ACTIONS, SubjectsActions),
  takeLatest(SubjectsTypes.SEARCH_SUBJECTS, searchSubjectsSaga),
];
