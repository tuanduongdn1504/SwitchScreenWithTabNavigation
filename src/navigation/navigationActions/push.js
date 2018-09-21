import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
import { back } from '../navigationButtons';
import { styles as TextStyle } from '../../components/Text';

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
            // fontSize: Fonts.size.h2,
            // color: Colors.primaryText,
            // fontFamily: Fonts.type.semiBold,
            ...TextStyle.largeTitle,
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
