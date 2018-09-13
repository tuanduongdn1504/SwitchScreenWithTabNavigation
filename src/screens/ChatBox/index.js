import React, { Component } from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StyleSheet,
  Keyboard,
  Dimensions,
  FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Colors } from '../../themes/index';
import Button from '../../components/Button';
import EmojiBoard from '../../components/EmojiBoard';
import ChatItem from '../../components/Items/ChatItem';
import ChatActions from '../../redux/ChatRedux/actions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import { addStore } from '../../redux/ChatRedux/firebaseStore';
import Container from '../../components/Container';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';

class Chat extends Component {
  constructor(props) {
    super(props);
    const { user, receive } = this.props;
    const users = user.id > receive.id ? `${receive.id},${user.id}` : `${user.id},${receive.id}`;
    this.state = {
      historyChat: props.historyChat,
      inputText: '',
      heightInput: 0,
      isInit: true,
      users,
    };
    this.inputChat = React.createRef();
    this.scrollView = React.createRef();
    this.animatedInput = new Animated.Value(0);
    this.props.watchChat({ users });
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ isInit: false });
    //   this.scrollView.scrollToEnd({ animated: true });
    // }, 300);
  }

  componentWillUnmount() {
    this.props.closeChat();
  }

  sendChat = () => {
    // const historyChat = [...this.state.historyChat];
    // historyChat.push({ idUser: 1, text: this.inputChat._lastNativeText, ...TEST_USER[0] });
    // this.setState({ historyChat });
    const { user, receive } = this.props;
    const chatData = {
      users: user.id > receive.id ? `${receive.id},${user.id}` : `${user.id},${receive.id}`,
      ...user,
      idUser: user.id,
      text: this.inputChat._lastNativeText,
      time: moment().toString(),
    };
    addStore(chatData);
    this.inputChat.blur();
    this.clearInput();
  };

  clearInput = () => {
    if (Platform.OS === 'ios') {
      this.inputChat.setNativeProps({ text: ' ' });
    }

    setTimeout(() => {
      this.inputChat.setNativeProps({ text: '' });
    });
  };

  openEmoji = () => {
    this.inputChat.blur();
    this.emojiPanel.toggleEmojiBoard();
  };

  handlePick = emoji => {
    this.inputChat._lastNativeText = this.inputChat._lastNativeText || '';
    this.inputChat._lastNativeText += emoji;
    this.inputChat.setNativeProps({ text: this.inputChat._lastNativeText });
  };

  renderInputGroup() {
    const { chats, user } = this.props;
    const { historyChat, isInit, heightInput } = this.state;
    return (
      <FlatList
        ref={ref => {
          this.scrollView = ref;
        }}
        style={{ flex: 1 }}
        data={chats}
        inverted
        keyExtractor={data => data.key}
        renderItem={({ item, index }) => (
          <ChatItem user={user} isInit={isInit} key={index} data={item} />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              height: heightInput,
            }}
          />
        )}
      />
    );
  }

  renderChatInput() {
    const { heightInput, value } = this.state;
    return (
      <View style={[styles.vButtonGroup, { marginBottom: heightInput }]}>
        <TextInput
          underlineColorAndroid="white"
          onBlur={() => {
            this.setState({ heightInput: 0 });
          }}
          onFocus={() => {
            this.setState({ heightInput: 60 });
            this.emojiPanel.hideEmojiBoard();
          }}
          ref={ref => {
            this.inputChat = ref;
          }}
          multiline
          placeholder="Type your message"
          placeholderTextColor={Colors.divider}
          style={styles.chatInput}
          value={value}
        />
        <Button
          ionicons="ios-send"
          iconSize={30}
          style={styles.btnSend}
          iconStyle={styles.iconBtnSend}
          onPress={this.sendChat}
        />
        <Button
          ionicons="ios-happy"
          iconSize={30}
          style={styles.btnSend}
          iconStyle={styles.iconBtnSend}
          onPress={this.openEmoji}
        />
      </View>
    );
  }

  render() {
    const content = (
      <Container>
        {this.renderInputGroup()}
        {this.renderChatInput()}
        <EmojiBoard
          ref={ref => {
            this.emojiPanel = ref;
          }}
          onPick={this.handlePick}
        />
      </Container>
    );
    return Platform.OS === 'ios' ? (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
        style={styles.vChatBox}
      >
        {content}
      </KeyboardAvoidingView>
    ) : (
      content
    );
  }
}

global.defaultImage = [
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
  'https://images.pexels.com/photos/460237/pexels-photo-460237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

const TEST_USER = [
  {
    userId: 0,
    thumbnail: global.defaultImage[0],
    name: 'Anh Doan',
  },
  {
    userId: 1,
    thumbnail: global.defaultImage[1],
    name: 'Long Nguyen',
  },
];

const TEST_DATA = [
  {
    id: 0,
    ...TEST_USER[0],
    text: 'Hello!',
  },
  {
    id: 1,
    ...TEST_USER[1],
    text: 'Hi! Where are you from?',
  },
  {
    id: 2,
    ...TEST_USER[0],
    text: 'Da Nang',
  },
];

Chat.propTypes = {
  historyChat: PropTypes.array,
};

Chat.defaultProps = {
  historyChat: TEST_DATA,
};
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.default,
  },
  vChatBox: {
    flexGrow: 1,
  },
  vButtonGroup: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderTopWidth: 1,
    borderColor: Colors.divider,
  },
  btnSend: {
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.divider,
    backgroundColor: Colors.default,
  },
  iconBtnSend: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: Colors.gray,
    fontSize: 35,
  },
  chatInput: {
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 15,
    marginVertical: 10,
    textAlign: 'left',
    flex: 1,
  },
});

function mapStateToProps(state) {
  return {
    user: state.login.data,
    chats: getDataArr(state, 'chat') || TEST_DATA,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    watchChat: data => dispatch(ChatActions.watchChat(data)),
    closeChat: data => dispatch(ChatActions.closeChat(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);
