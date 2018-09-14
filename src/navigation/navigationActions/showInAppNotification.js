import { Navigation } from 'react-native-navigation';

export const showInAppNoti = (title, content, type) => {
  dismissInAppNoti();
  Navigation.showOverlay({
    component: {
      id: 'inAppNotification',
      name: 'inAppNotification',
      passProps: {
        title,
        content,
        type,
      },
      options: {
        overlay: {
          interceptTouchOutside: false,
        },
      },
    },
  });
};

export const dismissInAppNoti = () => {
  Navigation.dismissOverlay('inAppNotification');
};
