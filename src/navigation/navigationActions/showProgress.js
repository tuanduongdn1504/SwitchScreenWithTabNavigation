import { Navigation } from 'react-native-navigation';
import { Colors } from '../../themes/index';

export const showProgress = (isShow = true) => {
  if (isShow) {
    Navigation.showOverlay({
      component: {
        id: 'progressScreen',
        name: 'progressScreen',
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
    Navigation.dismissOverlay('progressScreen');
  }
};
