import { takeLatest, select, all } from 'redux-saga/effects';
import { startWithTabs } from '../../navigation/navigationActions';
import { Types } from './actions';

export function* startup() {
  yield all([]);
  const { token } = yield select(state => state.login);
  // !token ? startWelcome() : startHome();
  startWithTabs();
}

const appSagas = () => {
  return [takeLatest(Types.STARTUP, startup)];
};

export default appSagas();
