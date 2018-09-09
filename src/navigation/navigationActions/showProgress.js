import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';

const progressId = 'progressScreen';
export const showProgress = (isShow = true) => {
  Navigation.dismissOverlay(progressId);
  if (isShow) {
    Navigation.showOverlay({
      component: {
        id: 'progressScreen',
        name: 'progressScreen',
        passProps: {
          onDisplay: id => {
            // progressId = id;
          },
        },
        options: {
          overlay: {
            interceptTouchOutside: false,
          },
          layout: {
            backgroundColor: Colors.blur,
          },
        },
      },
    });
  }
};
