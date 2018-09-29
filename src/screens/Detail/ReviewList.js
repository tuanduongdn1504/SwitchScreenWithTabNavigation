import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import ReviewItem from '../../components/Items/ReviewItem';
// import Divider from '../../components/Divider';
import Text from '../../components/Text';

const data = [
  {
    id: 1,
    content:
      'My daughter has been working with John for the past year. He first helped her with the biology SAT prep and she received a very good score. ',
    author: 'Ryan Mason',
    timer: 'Sep 20, 2018',
  },
  {
    id: 2,
    content:
      'My daughter has been working with John for the past year. He first helped her with the biology SAT prep and she received a very good score. ',
    author: 'Alma Fuller',
    timer: 'Sep 20, 2018',
  },
];

const DetailList = () => {
  const renderItem = ({ item }) => <ReviewItem data={item} index={item.key} onPress={() => {}} />;

  const renderEmpty = () => <Text type="body2">No reviews</Text>;

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        ListHeaderComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => <View style={{ width: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DetailList;
