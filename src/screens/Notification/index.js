import React, { Component } from 'react';
import {
  StyleSheet, View, FlatList, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Item from '../../components/Items/NotificationItem';
import Divider from '../../components/Divider';
import Text from '../../components/Text';
import Button from '../../components/Button';
import { push } from '../../navigation/navigationActions';

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
  {
    id: 6,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 7,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 8,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 9,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 10,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 11,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 12,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 13,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 14,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
  {
    id: 15,
    title:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
];

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderItem = ({ item, index }) => {
    return <Item data={item} index={index} onPress={() => {}} />;
  };

  send = () => {
    const { componentId } = this.props;
    push(componentId, 'notification', {
      title: 'Notification',
    });
  };

  render() {
    // const { user } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={notificationList}
          renderItem={this.renderItem}
          keyExtractor={data => data.id.toString()}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <Divider style={{ marginLeft: 80, marginRight: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
          ListHeaderComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
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
