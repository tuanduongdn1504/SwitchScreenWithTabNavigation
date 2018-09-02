import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import Emoji from './emoji';

const WINDOW_WIDTH = Dimensions.get('window').width;
class EmojiPanel extends Component {
  constructor(props) {
    super(props);
    this.EMOJI_ARR = this.formatEmojiArr(Emoji.map);
    this.animation = new Animated.Value(0);
    this.toggleEmojiBoard = this.toggleEmojiBoard.bind(this);
  }

  toggleEmojiBoard() {
    Animated.timing(this.animation, {
      toValue: this.animation._value == 0 ? 160 : 0,
      useNativeDriver: false,
      duration: 160,
    }).start();
  }

  hideEmojiBoard() {
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 160,
    }).start();
  }

  render() {
    const { bgColor } = this.props;
    const style4Bg = bgColor ? { backgroundColor: bgColor } : { backgroundColor: 'white' };

    return (
      <Animated.View style={{ height: this.animation }}>
        <ScrollView
          style={[styles.panel, style4Bg]}
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          pagingEnabled
        >
          {this.renderPages()}
        </ScrollView>
      </Animated.View>
    );
  }

  renderPages() {
    const { showSwitchMenu, onDelete } = this.props;

    return this.EMOJI_ARR.map((pageData, pageNum) => {
      return (
        <View style={styles.page} key={pageNum}>
          {pageData.map((emoji, index) => this.renderBtn(emoji, index))}
        </View>
      );
    });
  }

  renderBtn(emoji, key) {
    if (emoji === ':delete:') {
      const { onDelete } = this.props;

      return (
        <TouchableOpacity style={styles.btn} key={key} onPress={onDelete.bind(this)}>
          <Icon name="ios-backspace-outline" />
        </TouchableOpacity>
      );
    }

    const { onPick } = this.props;

    return (
      <TouchableOpacity style={styles.btn} key={key} onPress={onPick.bind(this, emoji)}>
        <Text style={styles.emoji} allowFontScaling={false}>
          {emoji}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSwitchMenu(index) {
    const pages = this.EMOJI_ARR.length;

    const menuWidth = 6 * pages + 8 * (pages - 1);

    const style4Menu = {
      left: (WINDOW_WIDTH - menuWidth) / 2,
      width: menuWidth,
    };
    const items = [];

    for (let i = 0; i < pages; i++) {
      const style4Item = i === index ? styles.switchItemCrt : styles.switchItemGrey;

      items.push(<View style={[styles.switchItem, style4Item]} key={i} />);
    }
    return <View style={[styles.switchMenu, style4Menu]}>{items}</View>;
  }

  formatEmojiArr(emojiMap) {
    const { onDelete } = this.props;
    const size = onDelete ? 26 : 27;
    const srcArr = [];

    const disArr = [];

    emojiMap.forEach((v) => {
      srcArr.push(v);
    });

    for (let i = 0; i < srcArr.length; i += size) {
      const emojis = srcArr.slice(i, i + size);

      if (onDelete) {
        emojis.push(':delete:');
      }
      disArr.push(emojis);
    }
    return disArr;
  }
}

EmojiPanel.propTypes = {
  bgColor: PropTypes.string,
  showSwitchMenu: PropTypes.bool,
  onDelete: PropTypes.func,
  onPick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  panel: {
    width: WINDOW_WIDTH,
    height: 160,
    borderTopWidth: 1,
    borderTopColor: '#d1d1d150',
  },
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingHorizontal: 26,
    width: WINDOW_WIDTH,
    height: 160,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: Math.floor((WINDOW_WIDTH - 52) / 9) - 1,
    height: 30,
  },
  emoji: {
    color: '#000',
    fontSize: 20,
  },
  iconDelete: {
    width: 22,
    height: 16,
    resizeMode: 'stretch',
  },
  switchMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    height: 6,
  },
  switchItem: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  switchItemCrt: {
    backgroundColor: '#666666',
  },
  switchItemGrey: {
    backgroundColor: '#CCCCCC',
  },
});

export default EmojiPanel;
