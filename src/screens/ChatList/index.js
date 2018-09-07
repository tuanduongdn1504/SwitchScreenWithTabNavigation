import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { showModal } from '../../navigation/navigationActions';
import { close } from '../../navigation/navigationButtons';
import { Colors } from '../../themes';
import Item from '../../components/Items/HistoryItem';
import Divider from '../../components/Divider';

const chatList = [
  {
    id: 1,
    user: 'Samantha Cap',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nunc felis, vel pharetra mi elementum eu.',
    timer: '2 min ago',
  },
  {
    id: 2,
    user: 'Loise Alto',
    message:
      'Mauris quis rhoncus nisi, vitae blandit dui. Nam mollis laoreet ligula vel sollicitudin.',
    timer: '4 min ago',
  },
  {
    id: 3,
    user: 'Brigid Destefano',
    message:
      'Ut blandit eleifend feugiat. Nullam sit amet euismod leo. Donec tincidunt ex ac mi venenatis posuere.',
    timer: '6 min ago',
  },
  {
    id: 4,
    user: 'Irina Marlowe',
    message:
      'Donec ultricies tortor neque, ac consequat odio commodo id. Donec posuere eros dui, sed molestie libero feugiat eget.',
    timer: '7 min ago',
  },
  {
    id: 5,
    user: 'Ezekiel Hannon',
    message:
      'Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et. Donec eget euismod mauris, at congue dolor. In ultricies neque nulla, nec suscipit justo molestie et.',
    timer: '10 min ago',
  },
];

class ChatList extends Component {
  static navigatorStyle = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  showChatBox(user) {
    showModal('chatBox', {
      title: user,
      leftButtons: [],
      rightButtons: [close()],
    });
  }

  renderItem = ({ item, index }) => {
    return <Item data={item} index={index} onPress={() => this.showChatBox(item.user)} />;
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={chatList}
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
)(ChatList);
