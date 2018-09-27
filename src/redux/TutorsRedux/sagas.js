import {
  call, put, fork, takeLatest, select,
} from 'redux-saga/effects';
import { delay, cancel } from 'redux-saga';
import _ from 'lodash';
import TutorsActions, { MODEL, IGNORE_ACTIONS, TutorsTypes } from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import { searchTutors } from '../../api/tutors';
import { PRIMARY_KEY } from '../crudCreator/actions';

function* handleSearchInput(text) {
  yield delay(300);
  try {
    const response = yield call(searchTutors, text);
    // if (response)
    const { data } = yield select(state => state.tutors);
    if (response.success) {
      const convertData = {
        ids: response.data.map(item => item[PRIMARY_KEY]),
        data: { ...data, ..._.keyBy(response.data, PRIMARY_KEY) },
      };
      yield put(TutorsActions.getAllTutorsSuccess(convertData));
    } else {
      yield put(TutorsActions.getAllTutorsFailure(response));
    }
  } catch (err) {
    yield put(TutorsActions.getAllTutorsFailure(err));
  }
}

export function* searchTutorsSaga({ text }) {
  let task = null;
  if (task) {
    yield cancel(task);
  }
  task = yield fork(handleSearchInput, text);
}
export default [
  ...rootCRUDSaga(MODEL, IGNORE_ACTIONS, TutorsActions),
  takeLatest(TutorsTypes.SEARCH_TUTOR, searchTutorsSaga),
];
