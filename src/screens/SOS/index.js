import React, { Component } from 'react';
import { Share, StyleSheet, View, Text } from 'react-native';

import { Colors } from '../../themes';
import Button from '../../components/Button';

export default class SOS extends Component {
  // componentDidMount() {
  //   Share.share({
  //     message: 'Hello World',
  //   }).then(result => console.log(result));
  // }

  componentWillUnmount() {
    Share.dismissedAction();
  }

  handleShare = () => {
    Share.share(
      {
        message:
          "BAM: we're helping your business with awesome React Native apps",
        url: 'http://bam.tech',
        title: 'Wow, did you see that?',
      },
      {
        // Android only:
        dialogTitle: 'Share BAM goodness',
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  render() {
    return (
      <View>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text>Hello</Text>
        <Text onPress={this.handleShare}>Hello</Text>

        <Button
          style={styles.button}
          onPress={this.handleShare}
          buttonTitle="Share"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
});
