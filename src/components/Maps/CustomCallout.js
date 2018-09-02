import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, Platform, TouchableHighlight, Image, StyleSheet,
} from 'react-native';

import MapView from 'react-native-maps';
import { Colors } from '../../themes/index';
import Marker from './MarkerItem';

class CustomCallout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      driverTime: '',
    };
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.selectedMarker != this.props.selectedMarker
      && (nextProps.selectedMarker == this.props.identifier
        || this.props.identifier == this.props.selectedMarker)
    ) {
      return true;
    }
    return false;
  }

  onPress = () => {
    const { onPressMarker } = this.props;
    onPressMarker();
  };

  render() {
    const {
      index, identifier, onPress, coordinate, image, style, title, address,
    } = this.props;
    return (
      <MapView.Marker
        key={index}
        identifier={identifier}
        ref="marker"
        onSelect={this.onPress}
        onPress={this.onPress}
        onCalloutPress={onPress}
        onDeselect={() => {
          this.setState({});
        }}
        coordinate={coordinate}
        calloutAnchor={{ x: 0.5, y: 0.4 }}
      >
        <Marker image={image} />
        <MapView.Callout
          tooltip={Platform.OS !== 'ios'}
          style={Platform.OS === 'ios' ? styles.customView : styles.androidCustomView}
        >
          <View
            collapsible={false}
            style={[Platform.OS === 'ios' ? styles.container : styles.androidContainer, style]}
          >
            <View style={Platform.OS === 'ios' ? styles.bubble : styles.androidBubble}>
              <TouchableHighlight underlayColor="transparent">
                <View style={Platform.OS === 'ios' ? styles.amount : styles.androidAmount}>
                  <View style={styles.vLeft}>
                    <Image source={{ uri: image }} style={styles.thumbnail} />
                  </View>
                  <View style={styles.vRight}>
                    <Text style={styles.txtTitle}>{title}</Text>
                    <Text style={styles.txtAddress}>{address}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.arrowBorder} />
            <View style={styles.arrow} />
          </View>
        </MapView.Callout>
      </MapView.Marker>
    );
  }
}

const calloutWidth = 300;

CustomCallout.propTypes = {
  selectedMarker: PropTypes.object,
  address: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  coordinate: PropTypes.object,
  onPress: PropTypes.func,
  style: PropTypes.any,
  index: PropTypes.number,
  identifier: PropTypes.string,
  map: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: calloutWidth,
    height: 63,
    transform: [{ translateY: -13 }, { translateX: -1 }, { scale: 1.1 }],
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  androidContainer: {
    width: calloutWidth,
    height: 63,
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  customView: {
    ...StyleSheet.absoluteFillObject,
    width: calloutWidth,
    height: 28,
  },
  androidCustomView: {
    width: calloutWidth,
    height: 70,
  },
  bubble: {
    width: calloutWidth,
    height: 55,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 2,
    borderColor: 'white',
  },
  androidBubble: {
    width: calloutWidth,
    height: 55,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'white',
  },
  amount: {
    width: calloutWidth,
    height: 52,
    flex: 1,
    flexDirection: 'row',
  },
  androidAmount: {
    width: calloutWidth,
    height: 52,
    flex: 1,
    flexDirection: 'row',
  },
  vLeft: {
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  vRight: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: 'white',
    alignSelf: 'center',
    marginTop: -0.5,
  },
  thumbnail: {
    width: 39,
    height: 39,
    borderRadius: 5,
    marginLeft: 4,
  },
  txtTitle: {
    color: Colors.primaryText,
  },
  txtAddress: {
    color: Colors.secondaryText,
  },
});

module.exports = CustomCallout;
