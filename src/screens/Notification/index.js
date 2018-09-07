import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Colors } from '../../themes';
import Item from '../../components/Items/NotificationItem';
import NavBar from '../../components/NavigationBar';
import Divider from '../../components/Divider';

const notificationList = [
  {
    id: 1,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nunc felis, vel pharetra mi elementum eu.',
    timer: '2 min ago',
  },
  {
    id: 2,
    title:
      'Mauris quis rhoncus nisi, vitae blandit dui. Nam mollis laoreet ligula vel sollicitudin.',
    timer: '4 min ago',
  },
  {
    id: 3,
    title:
      'Ut blandit eleifend feugiat. Nullam sit amet euismod leo. Donec tincidunt ex ac mi venenatis posuere.',
    timer: '6 min ago',
  },
  {
    id: 4,
    title:
      'Donec ultricies tortor neque, ac consequat odio commodo id. Donec posuere eros dui, sed molestie libero feugiat eget.',
    timer: '7 min ago',
  },
  {
    id: 5,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
];

class Notification extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({ item, index }) => {
    return <Item data={item} index={index} onPress={() => {}} />;
  };

  render() {
    // const { user } = this.props;
    return (
      <View style={styles.container}>
        <NavBar title="Notification" />
        <FlatList
          style={styles.list}
          data={notificationList}
          renderItem={this.renderItem}
          keyExtractor={data => data.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider style={{ marginLeft: 80, marginRight: 20 }} />}
          ListFooterComponent={() => <View style={{ width: 20 }} />}
          ListHeaderComponent={() => <View style={{ width: 20 }} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.default,
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Notification);
