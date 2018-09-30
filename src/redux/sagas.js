import { all } from 'redux-saga/effects';
import loginSagas from './LoginRedux/sagas';
import appSagas from './AppRedux/sagas';
import chatSagas from './ChatRedux/sagas';
import ForgotPasswordSagas from './ForgotPasswordRedux/sagas';
import subjectsSagas from './SubjectsRedux/sagas';
import faqsSagas from './FaqsRedux/sagas';
import tutorsSagas from './TutorsRedux/sagas';
import locationSagas from './LocationRedux/sagas';
import deviceTokensSagas from './DeviceTokensRedux/sagas';
import notificationsSagas from './NotificationsRedux/sagas';

export default function* root() {
  yield all([
    ...notificationsSagas,
    ...deviceTokensSagas,
    ...tutorsSagas,
    ...faqsSagas,
    ...subjectsSagas,
    ...ForgotPasswordSagas,
    ...chatSagas,
    ...appSagas,
    ...loginSagas,
    ...locationSagas,
  ]);
}
