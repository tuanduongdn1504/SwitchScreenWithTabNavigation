import { Colors } from '../themes/index';
import { iconsMap } from '../utils/appIcons';
import { styles as TextStyle } from '../components/Text';

export const navigatorHiddenTab = {
  tabBarHidden: true,
};

export const navigatorStyle = {
  topBar: {
    visible: true,
    drawBehind: false,
    animate: false,
    // hideOnScroll: false,
    elevation: 0,
    noBorder: true,
    buttonColor: Colors.titleNav,
    title: {
      fontSize: 17,
      color: Colors.titleNav,
    },
    background: {
      color: Colors.default,
    },
    largeTitle: {
      visible: true,
      ...TextStyle.largeTitle,
    },
    backButton: {
      icon: iconsMap.back,
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

export const bottomTabs = {
  backgroundColor: Colors.tabBackground,
  visible: true,
  animate: false,
  // currentTabIndex: 0,
  // currentTabId: 'currentTabId',
  // testID: 'bottomTabsTestID',
  drawBehind: false,
  translucent: true,
  hideShadow: false,
};
