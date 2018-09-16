import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import tutorSagas from './TutorRedux/sagas';
import chatSagas from './ChatRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import subjectsSagas from './SubjectsRedux/sagas';

export default function* root() {
  yield all([
    ...subjectsSagas,
    ...ForgotPasswordSagas,
    ...chatSagas,
    ...appSagas,
    ...loginSagas,
    ...tutorSagas,
  ]);
}
