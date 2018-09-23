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
      longitude: selectedMarker?.location?.coordinates[1] || DEFAULT_REGION.longitude,
      latitude: selectedMarker?.location?.coordinates[0] || DEFAULT_REGION.latitude,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    };
    if (selectedMarker._id) {
      this.setState({
        region,
      });
      this.map.animateToCoordinate(region, 200);
    } else {
      navigator.geolocation.getCurrentPosition(
        e => {
          this.map.animateToCoordinate(
            {
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421,
            },
            200,
          );
        },
        err => {},
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { selectedMarker, markers } = this.props;
    if (
      (prevProps.selectedMarker
        && selectedMarker
        && prevProps.selectedMarker.location?.coordinates[1]
          != selectedMarker.location?.coordinates[1])
      || prevProps.selectedMarker?.location?.coordinates[0] != selectedMarker?.location?.coordinates[0]
    ) {
      const region = {
        longitude: selectedMarker?.location?.coordinates[0] || DEFAULT_REGION.longitude,
        latitude: selectedMarker?.location?.coordinates[1] || DEFAULT_REGION.latitude,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421,
      };
      this.setState({ region });
      this.map.animateToCoordinate(region, 200);
    }

    if (markers.length === 0 && prevProps.markers.length > 0) {
      const firstMarker = markers[0];
      // test
      this.map.animateToCoordinate(
        {
          longitude: firstMarker?.location?.coordinates[0] || DEFAULT_REGION.longitude,
          latitude: firstMarker?.location?.coordinates[1] || DEFAULT_REGION.latitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        },
        200,
      );
      this.setState({
        region: {
          longitude: firstMarker?.location?.coordinates[0] || DEFAULT_REGION.longitude,
          latitude: firstMarker?.location?.coordinates[1] || DEFAULT_REGION.latitude,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421,
        },
      });
    }
  }

  handleAppStateChange = e => {
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
        e => {
          this.map.animateToCoordinate(
            {
              longitude: e.coords.longitude,
              latitude: e.coords.latitude,
            },
            200,
          );
        },
        err => {},
      );
    }
  };

  onPressMarker = data => {
    const { onPressMarker } = this.props;
    this.map.animateToCoordinate(
      {
        longitude: data?.location?.coordinates[0] || DEFAULT_REGION.longitude,
        latitude: data?.location?.coordinates[1] || DEFAULT_REGION.latitude,
      },
      200,
    );
    this.map.fitToSuppliedMarkers([data._id], true);
    onPressMarker && onPressMarker(data);
  };

  onPressPin = data => {
    const { onPressPin } = this.props;
    onPressPin && onPressPin(data);
  };

  onPressMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      e => {
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
      // (err) => {
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
      // },
    );
  };

  renderMapMarkers = () => {
    const { markers, currentLocation, selectedMarker } = this.props;
    const components = markers.map(data => {
      return (
        <CustomCallout
          identifier={data._id}
          map={this.map}
          title={`${data.first_name} ${data.last_name}`}
          address={data.address}
          image={data.avatar}
          key={data._id}
          selectedMarker={markers.length > 1 ? selectedMarker : data.objectId}
          onPressMarker={() => this.onPressMarker(data)}
          currentLocation={currentLocation}
          onPress={this.onPressPin}
          coordinate={{
            latitude: data.location?.coordinates ? data.location?.coordinates[1] : 0,
            longitude: data.location?.coordinates ? data.location?.coordinates[0] : 0,
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
          ref={ref => {
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

CustomMap.defaultProps = {
  markers: [],
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
