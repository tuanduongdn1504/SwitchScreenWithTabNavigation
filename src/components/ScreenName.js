import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import Text from './Text';
import Touchable from './Touchable';

const ScreenName = props => (
  <View style={styles.vScreenName}>
    <View style={styles.vBackButton}>
      {props.haveBackButton && (
        <Touchable onPress={props.onBack}>
          <Icon name="ios-arrow-back" color={Colors.primaryText} size={30} />
        </Touchable>
      )}
    </View>
    <Text style={styles.txtScreenName}>{props.title}</Text>
    <Text style={styles.txtSubScreenName}>{props.subTitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  vScreenName: {
    paddingHorizontal: 32,
    paddingTop: 29,
  },
  vBackButton: {
    height: 30,
    marginBottom: 10,
  },
  txtScreenName: {
    color: Colors.secondaryText,
    paddingBottom: 15,
  },
  txtSubScreenName: {
    color: Colors.primaryText,
    fontWeight: 'bold',
  },
});
export default ScreenName;
