import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../themes';
import Button from './Button';

const SearchInput = (props) => {
  return (
    <View style={styles.container}>
      <Icon name="md-search" size={24} style={styles.icon} />
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        placeholder="Type some thing..."
        placeholderTextColor={Colors.grey}
        returnKeyType="search"
        onChange={(event) => {
          props.onChange(event.nativeEvent.text);
        }}
        onSubmitEditing={props.onSearch}
      />
      <Button style={styles.button} onPress={props.onSearch} buttonTitle="Search" />
    </View>
  );
};

SearchInput.prototype = {
  onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingLeft: 20,
    marginHorizontal: 15,
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
    width: 100,
    borderRadius: 20,
    backgroundColor: Colors.primary,
  },
});

export default SearchInput;
