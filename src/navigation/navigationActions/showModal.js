import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';

export const showModal = (screen, config, navHidden = false) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id: screen,
            name: screen,
            passProps: config.passProps,
            options: {
              overlay: {
                interceptTouchOutside: true,
              },
              topBar: {
                visible: !navHidden,
                drawBehind: navHidden,
                leftButtons: config.leftButtons,
                rightButtons: config.rightButtons,
                background: {
                  color: Colors.secondary,
                },
                title: {
                  text: config.title,
                  color: Colors.default,
                },
              },
            },
          },
        },
      ],
    },
  });
};
