import login from './LoginRedux/reducer';
import password from './ForgotPasswordRedux/reducer';
import subjects from './SubjectsRedux/reducer';
import faqs from './FaqsRedux/reducer';
import app from './AppRedux/reducer';
import tutors from './TutorsRedux/reducer';
import location from './LocationRedux/reducer';
import deviceTokens from './DeviceTokensRedux/reducer';
import filter from './FilterRedux/reducer';
import notifications from './NotificationsRedux/reducer';

export default {
  notifications,
  deviceTokens,
  tutors,
  app,
  faqs,
  subjects,
  password,
  login,
  location,
  filter,
};
