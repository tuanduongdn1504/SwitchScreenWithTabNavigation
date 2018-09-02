import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { menu, add } from '../navigationButtons';
import { navigatorStyle } from '../navigatonStyle';

export function startStackScreen() {
  const ROOT_SCREEN = 'home';
  const ROOT_TITLE = 'home';
  Navigation.setRoot({
    root: {
      stack: {
        options: _.merge(navigatorStyle, {
          topBar: {
            leftButtons: [menu()],
            rightButtons: [add()],
            background: {
              color: Colors.secondary,
            },
            title: {
              text: ROOT_TITLE,
            },
          },
        }),
        children: [
          {
            component: {
              name: ROOT_SCREEN,
              options: {},
            },
          },
        ],
      },
    },
  });
}
