import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Colors, Images } from '../../themes/index';
import Text from '../Text';

const Item = ({
  // state
  data,
  color,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} defaultSource={Images.defaultUser} />
      <View style={styles.row}>
        <Text type="body2" style={[styles.txtTitle, color && { color }]} numberOfLines={2}>
          {data.title}
        </Text>
        <Text type="small">{data.timer}</Text>
      </View>
    </View>
  );
};

Item.propTypes = {
  // action
  onPress: PropTypes.func,
  // state
  data: PropTypes.object,
  // title: PropTypes.string,
  // timer: PropTypes.string,
  // bold: PropTypes.bool,
  color: PropTypes.string,
  unShowArrow: PropTypes.bool,
  noBottomBorder: PropTypes.bool,
};

const styles = {
  container: {
    paddingVertical: 10,
    marginHorizontal: 20,
    backgroundColor: 'transparent',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: Colors.divider,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  txtTitle: {
    color: Colors.primaryText,
    flex: 1,
    paddingRight: 15,
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 25,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
};

export default Item;
