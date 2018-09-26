import login from './LoginRedux/reducer';
import chat from './ChatRedux/reducer';
import password from './ForgotPasswordRedux/reducer';
import subjects from './SubjectsRedux/reducer';
import faqs from './FaqsRedux/reducer';
import app from './AppRedux/reducer';
import tutors from './TutorsRedux/reducer';
import location from './LocationRedux/reducer';
import deviceTokens from './DeviceTokensRedux/reducer';

export default {
  deviceTokens,
  tutors,
  app,
  faqs,
  subjects,
  password,
  chat,
  login,
  location,
};
