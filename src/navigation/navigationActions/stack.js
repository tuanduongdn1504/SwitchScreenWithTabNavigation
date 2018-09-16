import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { Colors } from '../../themes/index';
import { navigatorStyle } from '../navigatonStyle';

export function startStackScreen() {
  const ROOT_SCREEN = 'intro';
  // const ROOT_TITLE = 'home';
  Navigation.setRoot({
    root: {
      stack: {
        // options: _.merge(navigatorStyle, {
        //   topBar: {
        //     visibale: false,
        //     drawBehind: true,
        //     background: {
        //       color: Colors.secondary,
        //     },
        //   },
        // }),
        // options: {
        //   topBar: {
        //     visible: true,
        //     drawBehind: true,
        //     animate: false,
        //   },
        // },
        children: [
          {
            component: {
              name: ROOT_SCREEN,
              options: {
                topBar: {
                  visible: false,
                  drawBehind: true,
                  animate: false,
                },
              },
            },
          },
        ],
      },
    },
  });
}

// export function startStackScreen() {
//   const ROOT_SCREEN = 'forgotPassword';
//   // const ROOT_TITLE = 'home';
//   Navigation.setRoot({
//     root: {
//       stack: {
//         children: [
//           {
//             component: {
//               name: ROOT_SCREEN,
//             },
//           },
//         ],
//       },
//     },
//   });
// }
