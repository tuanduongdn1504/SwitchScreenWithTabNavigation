import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TextInput } from 'react-native';
import Text from './Text';
import { Colors } from '../themes';

class Input extends Component {
  state = {
    isFocus: false,
    value: this.props.value,
  };

  onFocus = () => {
    this.setState({ isFocus: true });
  };

  onBlur = () => {
    this.setState({ isFocus: false });
    this.input.setNativeProps({ style: { color: Colors.primaryText } });
  };

  render() {
    return (
      <View>
        {this.props.title ? (
          <Text type="subTextBlack" style={styles.txtTitle}>
            {this.props.title}
          </Text>
        ) : null}
        <TextInput
          underlineColorAndroid="transparent"
          {...this.props}
          onChangeText={(text) => {
            this.setState({ value: text });
            this.props.onChangeText(text);
          }}
          ref={(ref) => {
            this.input = ref;
          }}
          value={this.state.value}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={StyleSheet.flatten([
            styles.textInput,
            this.state.isFocus && styles.focus,
            { color: this.state.isFocus ? Colors.primary : Colors.primaryText },
          ])}
        />
      </View>
    );
  }
}
Input.propTypes = {};

const styles = StyleSheet.create({
  txtTitle: {
    paddingBottom: 5,
  },
  textInput: {
    height: 40,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    paddingLeft: 10,
    marginBottom: 15,
    color: Colors.primaryText,
  },
  focus: {
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
});

export default Input;
