import React, { Component } from 'react';
import {
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Animated,
  StyleSheet,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../themes/index';
import Button from '../../components/Button';
import EmojiBoard from '../../components/EmojiBoard';
import ChatItem from '../../components/Items/ChatItem';

export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      historyChat: props.historyChat,
      inputText: '',
      heightInput: 0,
      isInit: true,
    };
    this.inputChat = React.createRef();
    this.scrollView = React.createRef();
    this.animatedInput = new Animated.Value(0);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isInit: false });
      this.scrollView.scrollToEnd({ animated: true });
    }, 300);
  }

  sendChat = () => {
    const historyChat = [...this.state.historyChat];
    historyChat.push({ idUser: 1, text: this.inputChat._lastNativeText, ...TEST_USER[0] });
    this.setState({ historyChat });
    setTimeout(() => {
      this.scrollView.scrollToEnd({ animated: true });
    }, 200);
    Keyboard.dismiss();
    this.inputChat.clear();
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
    const { historyChat, isInit, heightInput } = this.state;
    const components = historyChat.map((data, index) => {
      return <ChatItem isInit={isInit} key={index} data={data} right={index % 2 === 0} />;
    });
    return (
      <ScrollView
        ref={ref => {
          this.scrollView = ref;
        }}
        style={{ flex: 1 }}
      >
        {components}
        <View
          style={{
            height: heightInput,
          }}
        />
      </ScrollView>
    );
  }

  renderChatInput() {
    const { heightInput } = this.state;
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
    return (
      <KeyboardAvoidingView
        contentContainerStyle={{ flex: 1 }}
        behavior="position"
        style={styles.vChatBox}
      >
        {this.renderInputGroup()}
        {this.renderChatInput()}
        <EmojiBoard
          ref={ref => {
            this.emojiPanel = ref;
          }}
          onPick={this.handlePick}
        />
      </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
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
