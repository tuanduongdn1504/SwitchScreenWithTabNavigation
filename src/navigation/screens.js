import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ProgressScreen from '../components/ProgressScreen';
import Notification from '../screens/Popup/Notification';

import Intro from '../screens/User/Intro';
import Signup from '../screens/User/Signup';
import Home from '../screens/Home';
import SideMenu from '../screens/SideMenu';
import About from '../screens/SideMenu/About';
import Detail from '../screens/Detail';
import NotificationList from '../screens/NotificationList';
import ChatList from '../screens/ChatList';
import ChatBox from '../screens/ChatBox';

export function registerScreens(store, persistor) {
  const PersistProvider = (props) => {
    const { children } = props;
    return (
      <Provider {...props}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    );
  };
  Navigation.registerComponent('progressScreen', () => ProgressScreen);
  Navigation.registerComponent('inAppNotification', () => Notification);
  Navigation.registerComponentWithRedux('intro', () => Intro, PersistProvider, store);
  Navigation.registerComponentWithRedux('signUp', () => Signup, PersistProvider, store);
  Navigation.registerComponentWithRedux('home', () => Home, PersistProvider, store);
  Navigation.registerComponentWithRedux('sideMenu', () => SideMenu, PersistProvider, store);
  Navigation.registerComponentWithRedux('about', () => About, PersistProvider, store);
  Navigation.registerComponentWithRedux('detail', () => Detail, PersistProvider, store);
  Navigation.registerComponentWithRedux('chatBox', () => ChatBox, PersistProvider, store);
  Navigation.registerComponentWithRedux('chatList', () => ChatList, PersistProvider, store);
  Navigation.registerComponentWithRedux(
    'notificationList',
    () => NotificationList,
    PersistProvider,
    store,
  );
}
