import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  // Text,
  // ActionSheetIOS,
  // Linking,
  StyleSheets,
  Dimensions,
} from 'react-native';
// import { Navigation } from 'react-native-navigation';
// import Icon from 'react-native-vector-icons/icomoon';
// import styles from '../style/ProductDetailStyle';
// import { Colors, Images, Fonts } from '../../Themes/index';
// import Tools from '../../Services/Tools';
// import Button from '../../Components/Button';
// import config from '../../Config/AppSetting';

export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openUber = this.openUber.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(newProps) {}

  componentWillUnmount() {}

  // openUber = (location, userLocation) => {
  //   Tools.openUber(this.props.location, this.props.userLocation);
  // };

  // direction = () => {
  //   const data = 'Bamboo 2 Bar';
  //   const lat = 16.065;
  //   const log = 108.224;
  //   ActionSheetIOS.showActionSheetWithOptions(
  //     {
  //       title: I18n.t('chooseMap'),
  //       tintColor: Colors.gray,
  //       options: [I18n.t('close'), I18n.t('useGoogleMap'), I18n.t('useAppleMap')],
  //       cancelButtonIndex: 0,
  //     },
  //     buttonIndex => {
  //       switch (buttonIndex) {
  //         case 0:
  //           break;
  //         case 1:
  //           Linking.openURL(`https://www.google.com/maps?q=${data}&sll=${lat},${log}`);
  //           break;
  //         case 2:
  //           Linking.openURL(`http://maps.apple.com/?q=q=${data}&sll=${lat},${log}`);
  //           break;
  //         default:
  //       }
  //     },
  //   );
  // };

  render() {
    const {
      location,
      userLocation,
      // action
      onPress,
    } = this.props;
    const { latitude } = location || 16.065;
    const { longitude } = location || 108.224;
    // const distance = Tools.distance(
    //   location.latitude,
    //   location.longitude,
    //   userLocation.latitude,
    //   userLocation.longitude,
    // );
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?markers=color:blue%7Clabel:S%7C${latitude},${longitude}&center=${latitude},${longitude}&zoom=9&size=${
      styles.width
    }x350&key=AIzaSyAy4q3x1jHwo4WkWPNbAl0QxVW3UETE4Ok`;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.vMap}>
          <Image style={styles.staticMap} source={{ uri: mapUrl }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheets.create({
  vMap: {
    width,
    height: 225,
    zIndex: -2,
    backgroundColor: 'white',
  },
  staticMap: {
    width,
    height: 300,
    position: 'absolute',
    marginTop: -60,
    zIndex: -99,
  },
});
