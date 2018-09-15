import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';
import { styles as TextStyle } from '../../components/Text';

export const showModal = (screen, config, navHidden = false) => {
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            // id: screen,
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
                  color: Colors.default,
                },
                title: {
                  text: config.title,
                  color: Colors.default,
                },
                largeTitle: {
                  visible: true,
                  ...TextStyle.largeTitle,
                },
                noBorder: true,
              },
            },
          },
        },
      ],
    },
  });
};
