import {
  takeLatest, select, all, put,
} from 'redux-saga/effects';
import { startWithTabs, startStackScreen } from '../../navigation/navigationActions';
import { Types } from './actions';
import SubjectsActions from '../SubjectsRedux/actions';

export function* startup() {
  yield all([put(SubjectsActions.getAllSubjects())]);
  const { token } = yield select(state => state.login);
  !token ? startStackScreen() : startWithTabs();
}

const appSagas = () => {
  return [takeLatest(Types.STARTUP, startup)];
};

export default appSagas();
