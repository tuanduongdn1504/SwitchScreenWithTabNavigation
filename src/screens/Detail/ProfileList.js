import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import ProfileItem from '../../components/Items/ProfileItem';
// import Divider from '../../components/Divider';

const data = [
  {
    id: 1,
    title: 'About tutor',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo maximus pretium. Aliquam quis arcu ut dolor ultrices venenatis. Sed sed nisi velit. Integer a eros elit. Donec vehicula est non nisl pellentesque, id finibus mi vehicula. Praesent feugiat arcu nec neque rutrum, sed ultrices nulla ullamcorper. Suspendisse vehicula, mauris sit amet egestas sodales, arcu quam pretium lacus, vitae mattis lectus velit id sem. Nulla hendrerit odio non diam dignissim, id scelerisque sem sodales.',
  },
  {
    id: 2,
    title: 'Education',
    content:
      'Ut sollicitudin, arcu sed mattis tincidunt, erat quam tempor neque, et mattis ante tortor nec est. Pellentesque tristique sit amet magna at luctus. Aliquam ut fermentum arcu, a vehicula lorem. Proin id ultricies erat, eget interdum augue. Vestibulum efficitur est lorem, vel aliquet velit elementum eget. Sed lacinia erat sed imperdiet hendrerit. Maecenas egestas ullamcorper tristique.',
  },
  {},
];

const DetailList = () => {
  const renderItem = ({ item }) => <ProfileItem data={item} index={item.key} onPress={() => {}} />;

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        // ListEmptyComponent={this.renderEmpty}
        ListHeaderComponent={() => <View style={{ width: 20 }} />}
        ListFooterComponent={() => <View style={{ width: 20 }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

DetailList.propTypes = {
  item: PropTypes.object,
};

export default DetailList;
