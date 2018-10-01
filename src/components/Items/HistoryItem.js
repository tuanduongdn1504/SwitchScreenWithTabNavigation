import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import { Colors, Images } from '../../themes';
import Touchable from '../Touchable';

const HistoryItem = ({ data, onPress }) => {
  return (
    <View style={styles.root}>
      <Touchable onPress={onPress}>
        <View style={styles.container}>
          <Image style={styles.image} defaultSource={Images.defaultUser} />
          <View style={styles.footer}>
            <Text type="body2Bold" numberOfLines={1} color={Colors.primaryText}>
              {data.user}
            </Text>
            <View style={styles.vContent}>
              <Text
                type="small"
                numberOfLines={1}
                color={Colors.primaryTextBlur}
                style={{ flex: 1 }}
              >
                {data.message}
              </Text>
            </View>
          </View>
          <View style={styles.right}>
            <Text type="small" center color={Colors.primaryTextBlur}>
              {data.timer}
            </Text>
          </View>
        </View>
      </Touchable>
    </View>
  );
};

HistoryItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'transparent',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  right: {
    width: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: Colors.default,
    marginLeft: 15,
  },
  vContent: {
    paddingTop: 5,
    marginRight: 10,
  },
});

export default HistoryItem;
