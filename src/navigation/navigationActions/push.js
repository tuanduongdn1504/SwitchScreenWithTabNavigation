import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import { Colors, Fonts } from '../../themes/index';
import { back } from '../navigationButtons';

export const push = (componentId, screen, config, navHidden = false, tabHidden = true) => {
  Navigation.push(componentId, {
    component: {
      name: screen,
      passProps: config.passProps,
      options: {
        topBar: {
          visible: !navHidden,
          drawBehind: navHidden,
          leftButtons: config.leftButtons,
          rightButtons: config.rightButtons,
          animate: false,
          elevation: 0,
          noBorder: true,
          background: {
            color: Colors.default,
          },
          title: {
            text: config.title,
            color: Colors.primaryText,
          },
          largeTitle: {
            visible: true,
            fontSize: Fonts.size.h2,
            color: Colors.primaryText,
            fontFamily: Fonts.type.semiBold,
          },
          backButton: back(),
        },
        bottomTabs: {
          visible: !tabHidden,
          drawBehind: tabHidden,
          backgroundColor: Colors.tabBackground,
        },
      },
    },
  });
};
