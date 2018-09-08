import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';

let progressId = 'progressScreen';
export const showProgress = (isShow = true) => {
  if (isShow) {
    Navigation.showOverlay({
      component: {
        name: 'progressScreen',
        passProps: {
          onDisplay: id => {
            progressId = id;
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
  } else {
    Navigation.dismissOverlay(progressId);
  }
};
