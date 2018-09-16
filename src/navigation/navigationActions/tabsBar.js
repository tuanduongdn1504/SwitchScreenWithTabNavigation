import { Navigation } from 'react-native-navigation';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'home',
      title: 'Tutor',
      icon: iconsMap.home,
      screen: 'home',
      options: {
        topBar: {
          visible: false,
          drawBehind: true,
          backButton: {},
        },
      },
      // options: {
      //   ...navigatorStyle,
      //   topBar: {
      //     ...navigatorStyle.topBar,
      //     title: {
      //       text: I18n.t('appName'),
      //       color: Colors.default,
      //     },
      //   },
      //   backButton: {
      //     icon: iconsMap['md-arrow-back'],
      //     visible: true,
      //   },
      // },
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
            color: Colors.default,
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
            color: Colors.default,
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
            color: Colors.default,
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
              bottomTabs: {
                backgroundColor: Colors.tabBackground,
                visible: true,
                animate: false,
                // currentTabIndex: 0,
                // currentTabId: 'currentTabId',
                // testID: 'bottomTabsTestID',
                drawBehind: false,
              },
            },
          },
        },
      ],
      options: {
        bottomTab: configTab(data),
        bottomTabs: {
          backgroundColor: Colors.tabBackground,
          visible: true,
          animate: true,
          // currentTabIndex: 0,
          // currentTabId: 'currentTabId',
          // testID: 'bottomTabsTestID',
          drawBehind: false,
        },
      },
    },
  }));

  Navigation.setRoot({
    root: {
      options: {
        topBar: {
          visible: true,
        },
        bottomTabs: {
          backgroundColor: Colors.tabBackground,
          visible: true,
          animate: true,
          // currentTabIndex: 0,
          // currentTabId: 'currentTabId',
          // testID: 'bottomTabsTestID',
          drawBehind: false,
        },
      },
      bottomTabs: {
        children: childrens,
        options: {
          bottomTabs: {
            backgroundColor: Colors.tabBackground,
            visible: true,
            animate: true,
            // currentTabIndex: 0,
            // currentTabId: 'currentTabId',
            // testID: 'bottomTabsTestID',
            drawBehind: false,
          },
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
