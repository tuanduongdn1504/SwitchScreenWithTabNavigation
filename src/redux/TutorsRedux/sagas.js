import {
  call, put, fork, takeLatest, select,
} from 'redux-saga/effects';
import { delay, cancel } from 'redux-saga';
import _ from 'lodash';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import TutorsActions, { MODEL, IGNORE_ACTIONS, TutorsTypes } from './actions';
import rootCRUDSaga from '../crudCreator/saga';
import { searchTutors, createReviews } from '../../api/tutors';
import { PRIMARY_KEY } from '../crudCreator/actions';
import { apiWrapper } from '../../utils/reduxUtils';
import { showInAppNoti } from '../../navigation/navigationActions';

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

export function* createReviewsSaga({ data }) {
  try {
    const response = yield call(apiWrapper, true, createReviews, data);
    if (!response || !response.success) {
      yield put(TutorsActions.createReviewsFailure(response));
      showInAppNoti('', response?.message || I18n.t('error.somethingWentWrong'), 'error');
      return;
    }
    yield put(TutorsActions.createReviewsSuccess(response));
    // TODO: Refresh Tutor info
    Navigation.dismissAllModals();
    yield put(TutorsActions.getOneTutors(response.data));
    showInAppNoti('', response?.message, 'success');
  } catch (err) {
    yield put(TutorsActions.createReviewsFailure(err));
    showInAppNoti('', err?.message || I18n.t('error.somethingWentWrong'), 'error');
  }
}

export default [
  ...rootCRUDSaga(MODEL, IGNORE_ACTIONS, TutorsActions),
  takeLatest(TutorsTypes.SEARCH_TUTOR, searchTutorsSaga),
  takeLatest(TutorsTypes.CREATE_REVIEWS, createReviewsSaga),
];
