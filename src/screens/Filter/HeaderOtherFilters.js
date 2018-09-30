import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import Text from '../../components/Text';
import { Colors } from '../../themes';

const SelectedOtherFilters = ({ onBackFromOtherFilter, otherFilterName, onSearch }) => {
  return (
    <View style={styles.vHeaderOtherFilter}>
      <Button
        onPress={onBackFromOtherFilter}
        iconStyle={styles.iconButton}
        style={styles.btnHeaderOtherScreen}
        icon="back"
        endColor={Colors.default}
        startColor={Colors.default}
      />
      <Text type="body2" style={{ flex: 1, textAlign: 'center' }}>
        {otherFilterName}
      </Text>
      <View style={styles.btnHeaderOtherScreen} />
      <SearchBar
        onChange={text => {
          onSearch(text);
        }}
      />
    </View>
  );
};

SelectedOtherFilters.propTypes = {
  onBackFromOtherFilter: PropTypes.func,
  onSearch: PropTypes.func,
  otherFilterName: PropTypes.string,
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  btnHeaderOtherScreen: {
    width: 50,
  },
  iconButton: {
    color: Colors.primaryText,
    fontSize: 24,
  },
  vHeaderOtherFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.default,
    borderBottomColor: Colors.lightDivider,
    borderBottomWidth: 1,
    marginTop: -10,
  },
});

export default SelectedOtherFilters;
