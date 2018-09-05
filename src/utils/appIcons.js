import { PixelRatio } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const navIconSize = __DEV__ === false ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
  'ios-home': [25, '#000'],
  'ios-search': [25, '#000'],
  'ios-create': [25, '#000'],
  'ios-settings': [25, '#000'],
  'ios-chatbubbles': [25, '#000'],
  'ios-notifications': [25, '#000'],
  'ios-help-buoy': [25, '#000'],
  'md-arrow-back': [25, '#fff'],
  'md-close': [25, '#fff'],
  'md-menu': [25, '#fff'],
  'md-add': [25, '#fff'],
  'ios-chatbubbles': [25, '#fff'],
  'ios-notifications': [25, '#fff'],
  qrcode: [25, '#fff', 'fontAwesome'],
};

const iconsMap = {};
const iconsLoaded = new Promise((resolve) => {
  new Promise.all(
    Object.keys(icons).map(
      iconName => (icons[iconName][2] === 'fontAwesome'
        ? FontAwesome.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1],
        )
        : Icon.getImageSource(
          iconName.replace(replaceSuffixPattern, ''),
          icons[iconName][0],
          icons[iconName][1],
        )),
    ),
  )
    .then((sources) => {
      Object.keys(icons).forEach((iconName, idx) => {
        iconsMap[iconName] = sources[idx];
      });

      // Call resolve (and we are done)
      resolve(true);
    })
    .catch(err => console.log(err));
});

export { iconsMap, iconsLoaded };
