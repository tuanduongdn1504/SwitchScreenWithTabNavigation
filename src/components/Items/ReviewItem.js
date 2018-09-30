/* eslint camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../themes';
import Text from '../Text';
import StarRating from '../StarRating';
import { fromNow } from '../../utils/textUtils';

const ReviewItem = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <StarRating disabled rating={data.rating} starSize={16} />
      </View>
      <Text type="body2" style={styles.txtContent}>
        {data.review}
      </Text>
      <Text type="body3" style={styles.txtAuthor}>
        {'By '}
        {data?.reviewer?.first_name}
        {' '}
        {data?.reviewer?.last_name}
        {' - '}
        {fromNow(data.created_at)}
      </Text>
    </View>
  );
};

ReviewItem.propTypes = {
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  txtContent: {
    color: Colors.primaryText,
    marginTop: 10,
  },
  txtAuthor: {
    marginTop: 15,
  },
  rating: {
    marginTop: 30,
    alignItems: 'flex-start',
  },
});

export default ReviewItem;
