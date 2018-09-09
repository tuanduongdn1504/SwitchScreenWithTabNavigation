import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
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
          background: {
            color: Colors.secondary,
          },
          title: {
            text: config.title,
            color: Colors.default,
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
