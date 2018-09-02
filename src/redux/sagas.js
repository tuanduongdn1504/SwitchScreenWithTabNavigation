import { all } from 'redux-saga/effects';
/* ------------- Types ------------- */
/* ------------- Sagas ------------- */
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import tutorSagas from './TutorRedux/sagas';

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([...appSagas, ...loginSagas, ...tutorSagas]);
}
