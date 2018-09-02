import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';
import { menu, add } from '../navigationButtons';
import { iconsMap } from '../../utils/appIcons';

export const startWithTabs = () => {
  const Tabs = [
    {
      label: 'home',
      title: 'Tutor',
      icon: iconsMap['ios-home'],
      screen: 'home',
      options: _.merge(navigatorStyle, {
        topBar: {
          rightButtons: [add()],
          title: {
            text: 'Bệnh Viện ABC',
            color: Colors.default,
          },
        },
        backButton: {
          icon: iconsMap['md-arrow-back'],
          visible: true,
        },
      }),
    },
    {
      label: 'more',
      title: 'Setting',
      icon: iconsMap['md-menu'],
      screen: 'sideMenu',
      options: {
        topBar: {
          visible: false,
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
                animate: true,
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
});
