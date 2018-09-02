import { Colors } from '../themes/index';
import { iconsMap } from '../utils/appIcons';

export const navigatorHiddenTab = {
  tabBarHidden: true,
};

export const navigatorStyle = {
  topBar: {
    visible: true,
    animate: true,
    // hideOnScroll: false,
    buttonColor: Colors.titleNav,
    drawBehind: false,
    title: {
      fontSize: 17,
      color: Colors.titleNav,
    },
    background: {
      color: Colors.backgroundNav,
    },
    backButton: {
      icon: iconsMap['md-arrow-back'],
      visible: true,
      color: Colors.titleNav,
    },
  },
  layout: {
    backgroundColor: Colors.background,
    orientation: ['portrait', 'landscape'],
  },
};

export const navigatorHavNavStyle = {
  navBarBackgroundColor: Colors.secondary,
  navBarTextColor: Colors.titleNav,
  navBarButtonColor: Colors.titleNav,
  navBarRightButtonColor: Colors.primary,
  screenBackgroundColor: Colors.background,
  disabledButtonColor: Colors.disabledNavButons,
  navBarButtonFontWeight: '900',
  statusBarTextColorSchemeSingleScreen: 'light',
  // navBarTextFontFamily: Fonts.type.bold,
};
