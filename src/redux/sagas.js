import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import tutorSagas from './TutorRedux/sagas';
import chatSagas from './ChatRedux/sagas';

export default function* root() {
  yield all([...chatSagas, ...appSagas, ...loginSagas, ...tutorSagas]);
}
