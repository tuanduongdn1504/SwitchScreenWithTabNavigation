import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, AppState } from 'react-native';
import MapView from 'react-native-maps';
import { Colors } from '../../themes/index';
import Button from '../Button';
import CustomCallout from './CustomCallout';

const DEFAULT_REGION = {
  longitude: 16.072098,
  latitude: 108.2228667,
  latitudeDelta: 0.00922,
  longitudeDelta: 0.00421,
};
export default class CustomMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
    };
    this.map = React.createRef();
    this.isGotoSetting = false;
  }

  componentDidMount() {
    const { selectedMarker } = this.props;
    AppState.addEventListener('change', this.handleAppStateChange);
    const region = {
      longitude: selectedMarker?.location?.longitude || DEFAULT_REGION.longitude,
      latitude: selectedMarker?.location?.latitude || DEFAULT_REGION.latitude,
    };
    this.setState({
      region,
    });
    this.map.animateToCoordinate(region, 200);
  }

  componentDidUpdate(prevProps) {
    const { selectedMarker, markers } = this.props;
    if (
      (prevProps.selectedMarker
        && selectedMarker
        && prevProps.selectedMarker.location?.longitude != selectedMarker.location?.longitude)
      || prevProps.selectedMarker?.location?.latitude != selectedMarker?.location?.latitude
    ) {
      const region = {
        longitude: selectedMarker.location.longitude || DEFAULT_REGION.longitude,
        latitude: selectedMarker.location.latitude || DEFAULT_REGION.latitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      };
      this.setState({ region });
      this.map.animateToCoordinate(region, 200);
    }

    if (markers.length === 0 && prevProps.markers.length > 0) {
      const firstMarker = markers[0];
      // test
      // this.map.animateToCoordinate({
      //   longitude: 8.305394,
      //   latitude: 47.04838,
      // }, 200);
      // this.setState({
      //   region: {
      //     longitude: 8.305394,
      //     latitude: 47.04838,
      //   },
      // });
    }
  }

  handleAppStateChange = (e) => {
    const { isGotoSetting } = this;
    if (!e === 'active') return;

    this.isGotoSetting = false;
    if (e === 'active' && isGotoSetting) {
      this.setState({
        region: {
          longitude: e.coords.longitude,
          latitude: e.coords.latitude,
        },
      });
      navigator.geolocation.getCurrentPosition(
        (e) => {
          this.map.animateToCoordinate(
            {
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
            },
            200,
          );
        },
        (err) => {},
      );
    }
  };

  onPressMarker = (data) => {
    const { onPressMarker } = this.props;
    this.map.animateToCoordinate(
      {
        ...data.location,
      },
      200,
    );
    this.map.fitToSuppliedMarkers([data.objectId], true);
    onPressMarker && onPressMarker(data);
  };

  onPressPin = (data) => {
    const { onPressPin } = this.props;
    onPressPin && onPressPin(data);
  };

  onPressMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.setState({
          region: {
            longitude: e.coords.longitude,
            latitude: e.coords.latitude,
          },
        });
        this.map.animateToCoordinate(
          {
            longitude: e.coords.longitude,
            latitude: e.coords.latitude,
          },
          200,
        );
        // this.props.onPressMylocation && this.props.onPressMylocation();
      },
      (err) => {
        // Navigation.showLightBox({
        //   screen: 'app.LocationPermissionPopup', // unique ID registered with Navigation.registerScreen
        //   passProps: {
        //     type: 'popup',
        //     onClose: () => { Navigation.dismissLightBox(); },
        //   }, // simple serializable object that will pass as props to the lightbox (optional)
        //   style: {
        //     backgroundBlur: 'light', // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
        //     backgroundColor: `${Colors.tabBackground}30`, // tint color for the background, you can specify alpha here (optional)
        //     tapBackgroundToDismiss: true, // dismisses LightBox on background taps (optional)
        //   },
        // });
      },
    );
  };

  renderMapMarkers = () => {
    const { markers, currentLocation, selectedMarker } = this.props;
    const components = markers.map((data) => {
      return (
        <CustomCallout
          identifier={data.objectId}
          map={this.map}
          title={data.name}
          address={data.address}
          image={data.thumbnail}
          key={data.objectId}
          selectedMarker={markers.length > 1 ? selectedMarker : data.objectId}
          onPressMarker={() => this.onPressMarker(data)}
          currentLocation={currentLocation}
          onPress={this.onPressPin}
          coordinate={{
            latitude: data.location ? data.location.latitude : 0,
            longitude: data.location ? data.location.longitude : 0,
          }}
        />
      );
    });
    return components;
  };

  renderButtonMyLocation = () => {
    return (
      <Button
        backgroundColor="#ffffff"
        onPress={this.onPressMyLocation}
        icon="ios-locate-outline"
        style={styles.btnMyLocation}
        iconStyle={{ color: Colors.primary }}
      />
    );
  };

  render() {
    const { style } = this.props;
    const { region } = this.state;
    return (
      <View style={[styles.container, style]}>
        <MapView
          ref={(ref) => {
            this.map = ref;
          }}
          showsUserLocation
          moveOnMarkerPress
          style={[styles.container, style]}
          region={
            region
              ? {
                ...region,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.00421,
              }
              : { ...DEFAULT_REGION }
          }
        >
          {this.renderMapMarkers()}
        </MapView>
        {false && this.renderButtonMyLocation()}
      </View>
    );
  }
}

CustomMap.propTypes = {
  style: PropTypes.any,
  currentLocation: PropTypes.object,
  markers: PropTypes.array,
  selectedMarker: PropTypes.object,
  onPressMarker: PropTypes.func,
  onPressPin: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnMyLocation: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
