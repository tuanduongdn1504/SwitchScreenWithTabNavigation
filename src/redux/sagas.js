import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import tutorSagas from './TutorRedux/sagas';

export default function* root() {
  yield all([...appSagas, ...loginSagas, ...tutorSagas]);
}
