import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes/index';
import SlideBar from '../../components/SlideBar';
import Text from '../../components/Text';

const styles = {
  container: {
    paddingVertical: 20,
    marginHorizontal: 20,
    backgroundColor: Colors.default,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightDivider,
  },
  listSort: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  vItem: {
    flex: 1,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 20,
  },
  txtName: {
    color: Colors.primaryText,
    fontSize: 13,
    backgroundColor: 'transparent',
    marginTop: 12,
  },
  txtMedium: {},
};

const PriceView = ({ start, end, refFunc }) => {
  return (
    <View style={styles.container}>
      <Text type="headline">{I18n.t('filter.priceRange')}</Text>
      <SlideBar
        start={start}
        end={end}
        ref={e => {
          refFunc(e);
        }}
      />
    </View>
  );
};

PriceView.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  refFunc: PropTypes.func,
};

PriceView.defaultProps = {
  start: 0,
  end: 20,
};

export default PriceView;
