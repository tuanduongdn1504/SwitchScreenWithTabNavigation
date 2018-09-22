import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import { navigatorStyle, bottomTabs } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'home',
      title: 'Tutor',
      icon: iconsMap.home,
      screen: 'home',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          title: {
            text: I18n.t('appName'),
            color: Colors.primaryText,
          },
        },
        backButton: {
          icon: iconsMap.back,
          visible: true,
        },
      },
    },
    {
      label: 'chatList',
      title: 'Chat',
      icon: iconsMap.chat,
      screen: 'chatList',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          title: {
            text: I18n.t('chatHistory'),
            color: Colors.primaryText,
          },
          backButton: {},
        },
      },
    },
    {
      label: 'safety',
      title: 'Safety',
      icon: iconsMap.shield,
      screen: 'Safety',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          title: {
            text: I18n.t('safety.title'),
            color: Colors.primaryText,
          },
          backButton: {},
        },
      },
    },
    {
      label: 'notifications',
      title: 'Notifications',
      icon: iconsMap.notification,
      screen: 'notification',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          title: {
            text: I18n.t('notification'),
            color: Colors.primaryText,
          },
          backButton: {},
        },
      },
    },
    {
      label: 'more',
      title: 'Menu',
      icon: iconsMap.user,
      screen: 'sideMenu',
      options: {
        ...navigatorStyle,
        topBar: {
          ...navigatorStyle.topBar,
          visible: false,
          drawBehind: true,
          backButton: {},
        },
      },
    },
  ];

  const childrens = Tabs.map(data => ({
    stack: {
      children: [
        {
          component: {
            id: data.screen,
            name: data.screen,
            options: {
              ...data.options,
            },
          },
        },
      ],
      options: {
        bottomTabs: {
          drawBehind: false,
          translucent: true,
          hideShadow: false,
        },
        bottomTab: configTab(data),
      },
    },
  }));

  Navigation.setRoot({
    root: {
      options: {
        topBar: {
          visible: true,
        },
        // bottomTabs,
      },
      bottomTabs: {
        children: childrens,
        options: {
          // bottomTabs,
        },
      },
    },
  });
};

const configTab = data => ({
  title: data.title,
  icon: data.icon,
  text: data.title,
  // badge: '2',
  // badgeColor: 'red',
  textColor: Colors.secondaryText,
  iconColor: Colors.secondaryText,
  selectedIconColor: Colors.tabSelected,
  selectedTextColor: Colors.tabSelected,
  fontSize: 10,
  drawBehind: false,
});
