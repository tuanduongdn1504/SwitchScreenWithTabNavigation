import login from './LoginRedux/reducer';
import chat from './ChatRedux/reducer';
import password from './ForgotPasswordRedux/reducer';
import subjects from './SubjectsRedux/reducer';
import faqs from './FaqsRedux/reducer';
import app from './AppRedux/reducer';
import tutors from './TutorsRedux/reducer';

export default {
  tutors,
  app,
  faqs,
  subjects,
  password,
  chat,
  login,
};
