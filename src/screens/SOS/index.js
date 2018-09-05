import React, { Component } from 'react';
import { Share, StyleSheet, View } from 'react-native';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import Text from '../../components/Text';
import NavBar from '../../components/NavigationBar';

export default class SOS extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    Share.dismissedAction();
  }

  handleShare = () => {
    Share.share(
      {
        message: 'Help me',
        url: 'http://help.me',
        title: 'HELP ME',
      },
      {
        // Android only:
        dialogTitle: 'Help me',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <NavBar title="SOS" />
        <View style={styles.center}>
          <Text type="normalBold">{I18n.t('shareYourCurrentLocation')}</Text>
          <Button style={styles.button} onPress={this.handleShare} buttonTitle="Share" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default,
    flex: 1,
  },
  button: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
