import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, Dimensions, Image, StyleSheet,
} from 'react-native';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import { Images, Colors } from '../../themes/index';

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInit: props.isInit,
      isChecked: false,
    };
  }

  renderLeftAvatar() {
    const { text, idUser, thumbnail } = this.props.data;
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
        <Animatable.View animation={this.state.isInit ? '' : 'fadeInUp'} style={[styles.vContain]}>
          <View style={styles.vThumbnail}>
            <Image style={styles.thumbnail} source={{ uri: thumbnail || global.defaultImage[idUser-1] }} />
          </View>
          <View style={styles.vRight}>
            <View style={styles.triangle} />
            <View style={styles.vHeaderLeft}>
              {text && (
                <Text multiline style={styles.txtHeader}>
                  {text}
                  {' '}
                </Text>
              )}
            </View>
          </View>
        </Animatable.View>
      </TouchableHighlight>
    );
  }

  renderRightAvatar() {
    const { text, idUser, thumbnail } = this.props.data;
    return (
      <TouchableHighlight underlayColor="transparent" onPress={this.props.onPress}>
        <Animatable.View animation={this.state.isInit ? '' : 'fadeInUp'} style={[styles.vContain]}>
          <View style={styles.vRight}>
            <View style={styles.vHeaderRight}>
              {typeof text !== 'undefined' && (
                <Text multiline style={[styles.txtHeader, { color: 'white' }]}>
                  {text}
                  {' '}
                </Text>
              )}
            </View>
            <View style={styles.rightTriangle} />
          </View>
          <View style={styles.vThumbnail}>
            <Image style={styles.thumbnail} source={{ uri:  thumbnail || global.defaultImage[idUser-1] }} />
          </View>
        </Animatable.View>
      </TouchableHighlight>
    );
  }

  render() {
    const { text, idUser } = this.props.data;
    if (text) {
      return idUser === this.props.user.id ? this.renderRightAvatar() : this.renderLeftAvatar();
    }

    return <View />;
  }
}

function testImg() {
  if (Math.random() > 0.5) {
    return Images.test2;
  }
  return Images.test1;
}

// ios-square-outline
// ios-checkbox-outline
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  vContain: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  vRight: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'row',
  },
  text: {
    color: Colors.gray,
    fontWeight: '500',
  },
  txtHeader: {
    color: Colors.gray,
    padding: 10,
  },
  vThumbnail: {
    width: 40,
    marginHorizontal: 5,
  },
  vHeaderRight: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.gray,
  },
  vHeaderLeft: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.divider,
  },
  vMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  txtMore: {
    color: Colors.primary,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderTopWidth: 10,
    borderRightWidth: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.divider,
  },
  rightTriangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderTopWidth: 10,
    borderRightWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.gray,
  },
  vMap: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  map: {
    width,
    height: 170,
  },
});
