import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Common screen
import InAppNotification from '../screens/Popup/Notification';
import ProgressScreen from '../components/ProgressScreen';
// Intro
import Intro from '../screens/User/Intro';
import SignIn from '../screens/User/SignIn';
import Signup from '../screens/User/Signup';
import SelectRole from '../screens/User/SelectRole';
import ForgotPassword from '../screens/User/ForgotPassword';
import ResetPassword from '../screens/User/ResetPassword';
import VerifyPassword from '../screens/User/VerifyPassword';
import SignupStudent from '../screens/User/SignupStudent';
import SignupTutor from '../screens/User/SignupTutor';
// tabbar
import Home from '../screens/Home';
import SideMenu from '../screens/SideMenu';
import About from '../screens/SideMenu/About';
import Detail from '../screens/Detail';
import ChatList from '../screens/ChatList';
import ChatBox from '../screens/ChatBox';
import Safety from '../screens/Safety';
import Notification from '../screens/Notification';
import Filter from '../screens/Filter';
import SearchResults from '../screens/Filter/SearchResults';

export function registerScreens(store, persistor) {
  console.log('persistor', persistor.getState());
  const PersistProvider = props => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };
  Navigation.registerComponent('progressScreen', () => ProgressScreen, PersistProvider, store);
  Navigation.registerComponent(
    'inAppNotification',
    () => InAppNotification,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux('intro', () => Intro, PersistProvider, store);
  Navigation.registerComponentWithRedux('signUp', () => Signup, PersistProvider, store);
  Navigation.registerComponentWithRedux(
    'signUpStudent',
    () => SignupStudent,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux('selectRole', () => SelectRole, PersistProvider, store);
  Navigation.registerComponentWithRedux('signUpTutor', () => SignupTutor, PersistProvider, store);
  Navigation.registerComponentWithRedux('home', () => Home, PersistProvider, store);
  Navigation.registerComponentWithRedux('sideMenu', () => SideMenu, PersistProvider, store);
  Navigation.registerComponentWithRedux('about', () => About, PersistProvider, store);
  Navigation.registerComponentWithRedux('detail', () => Detail, PersistProvider, store);
  Navigation.registerComponentWithRedux('chatBox', () => ChatBox, PersistProvider, store);
  Navigation.registerComponentWithRedux('Safety', () => Safety, PersistProvider, store);
  Navigation.registerComponentWithRedux('notification', () => Notification, PersistProvider, store);
  Navigation.registerComponentWithRedux('chatList', () => ChatList, PersistProvider, store);
  Navigation.registerComponentWithRedux('filter', () => Filter, PersistProvider, store);
  Navigation.registerComponentWithRedux(
    'searchResults',
    () => SearchResults,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'forgotPassword',
    () => ForgotPassword,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'verifyPassword',
    () => VerifyPassword,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux(
    'resetPassword',
    () => ResetPassword,
    PersistProvider,
    store,
  );
  Navigation.registerComponentWithRedux('signIn', () => SignIn, PersistProvider, store);
}
