import React, { Component } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Images, Colors } from '../../themes';
import Text from '../../components/Text';
import RatingStar from '../../components/RatingStar';

export default class Profile extends Component {
  static propTypes = {
    fullName: PropTypes.string,
    avatar: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      rateValue: 0,
    };
  }

  onRating = value => {
    this.setState({ rateValue: value });
  };

  render() {
    const { fullName, avatar } = this.props;
    return (
      <View style={styles.content}>
        <Image source={{ uri: avatar }} defaultSource={Images.defaultUser} style={styles.avatar} />
        <Text type="title2" style={styles.title}>
          {fullName}
        </Text>
        <RatingStar
          onRating={this.onRating}
          left
          colors={Colors.starColors}
          size={32}
          maxRating={5}
          currentRating={this.state.rateValue}
          style={[styles.vRating]}
        />
      </View>
    );
  }
}

const styles = {
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  vRight: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    marginTop: 10,
  },
};
