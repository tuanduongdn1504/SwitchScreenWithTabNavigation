import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';

let progressId = null;
export const showProgress = (isShow = true) => {
  if (isShow) {
    progressId && Navigation.dismissOverlay(progressId);
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
    progressId && Navigation.dismissOverlay(progressId);
  }
};
