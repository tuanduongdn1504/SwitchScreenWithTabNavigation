import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import EmergencyTypeActions, { MODEL, IGNORE_ACTIONS } from './actions';
import rootCRUDSaga from '../crudCreator/saga';

export function* changePassword({ data }) {
  try {
    const response = yield call(updatePassword, data);
    if (!response || !response.success) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.user));
  } catch (err) {
    console.log(err);
    yield put(Actions.updateUserFailure(err));
  }
}

export default [...rootCRUDSaga(MODEL, IGNORE_ACTIONS, EmergencyTypeActions)];
