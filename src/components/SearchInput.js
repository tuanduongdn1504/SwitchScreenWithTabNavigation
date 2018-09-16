import React from 'react';
import {
  View, TextInput, StyleSheet, Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import Button from './Button';

const SearchInput = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.contentInput}>
        <Icon name="md-search" size={24} style={styles.icon} />
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Type some thing..."
          placeholderTextColor={Colors.grey}
          returnKeyType="search"
          onChange={event => {
            props.onChange(event.nativeEvent.text);
          }}
          onSubmitEditing={props.onSearch}
          onFocus={props.onFocus}
        />
      </View>
      {props.isFocus && (
        <Button
          style={styles.button}
          textStyle={styles.txtButton}
          onPress={() => {
            Keyboard.dismiss();
            props.onClose && props.onClose();
          }}
          buttonTitle="Cancel"
        />
      )}
    </View>
  );
};

SearchInput.prototype = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  contentInput: {
    flex: 1,
    paddingLeft: 20,
    marginRight: 5,
    borderRadius: 22,
    height: 40,
    backgroundColor: Colors.lightDivider,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: Colors.grayBorder,
    fontSize: 17,
    height: 40,
    paddingHorizontal: 10,
  },
  icon: {
    color: Colors.primaryText,
  },
  button: {
    height: 40,
    backgroundColor: 'transparent',
  },
  txtButton: {
    fontSize: 17,
    color: Colors.primary,
  },
});

export default SearchInput;
