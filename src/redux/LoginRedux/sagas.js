import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import Actions, { LoginTypes } from './actions';
import {
  login, register, getInfor, updatePassword, editUser, logout,
} from '../../api/auth';
import {
  startWithTabs,
  startStackScreen,
  showInAppNoti,
  showProgress,
} from '../../navigation/navigationActions';
import { apiWrapper } from '../../utils/reduxUtils';

export function* signOut() {
  global.token = null;
  try {
    startStackScreen();
    yield call(logout);
  } catch (error) {}
}

export function* signUp({ data }) {
  try {
    const response = yield call(apiWrapper, true, register, data);
    if (!response || !response.token) {
      yield put(Actions.signUpFailure(response));
      showInAppNoti('', response.message, 'error');
      return;
    }
    yield put(Actions.signInSuccess(response));
    global.token = response.token;
    startWithTabs();
    yield put(Actions.getUser());
  } catch (err) {
    yield put(Actions.signUpFailure(err));
    if (err && err.error && err.error.response) {
      showInAppNoti('', I18n.t('error.signup', { message: 'tài khoản' }), 'error');
    }
  }
}

export function* signIn({ data }) {
  try {
    const response = yield call(apiWrapper, true, login, data);
    // if (!response || !response.token) {
    //   yield put(Actions.signInFailure(response));
    //   showInAppNoti('', I18n.t('error.login'), 'error');
    //   return;
    // }
    // yield put(Actions.signInSuccess(response));
    // global.token = response.token;
    // yield put(Actions.getUser());
    startWithTabs();
  } catch (err) {
    showInAppNoti('', I18n.t('error.login'), 'error');
    yield put(Actions.signInFailure(err));
  }
}

export function* getUser() {
  try {
    const response = yield call(apiWrapper, true, getInfor);
    if (!response) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.data));
  } catch (err) {
    yield put(Actions.updateUserFailure(err));
  }
}

export function* editUserSaga({ data }) {
  try {
    showProgress();
    const user = yield select(state => state.login.data);
    const response = yield call(editUser, { ...data });
    showProgress(false);
    if (!response || !response.success) {
      yield put(Actions.updateUserFailure(response));
      return;
    }
    yield put(Actions.updateUserSuccess(response.data));
    showInAppNoti('', I18n.t('success.editUser'), 'success');
  } catch (err) {
    showProgress();
    yield put(Actions.updateUserFailure(err));
  }
}

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

const loginSagas = () => {
  return [
    takeLatest(LoginTypes.SIGN_UP, signUp),
    takeLatest(LoginTypes.SIGN_IN, signIn),
    takeLatest(LoginTypes.SIGN_OUT, signOut),
    takeLatest(LoginTypes.GET_USE, getUser),
    takeLatest(LoginTypes.EDIT_USER, editUserSaga),
  ];
};

export default loginSagas();
