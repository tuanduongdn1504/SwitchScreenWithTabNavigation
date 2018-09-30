import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import { Colors, Images } from '../../themes/index';
import Text from '../Text';
import { fromNow } from '../../utils/textUtils';

const Item = ({ data, onPress }) => {
  const { isRead } = data;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image style={styles.image} defaultSource={Images.defaultUser} />
        <View style={{ flex: 1 }}>
          <Text type={isRead ? 'body2' : 'body2Bold'} style={styles.txtTitle} numberOfLines={2}>
            {data.title}
          </Text>
          <Text type="small">{fromNow(data.created_at)}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Item.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.object,
};

const styles = {
  container: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  txtTitle: {
    color: Colors.primaryText,
    flex: 1,
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
