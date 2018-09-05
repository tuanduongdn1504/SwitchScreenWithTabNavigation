import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text as RNText } from 'react-native';
import { Fonts, Colors } from '../themes';

const Text = (props) => {
  const {
    type, color, center, underLine, style, children,
  } = props;
  return (
    <RNText
      {...props}
      style={[
        styles.normal,
        styles[type],
        color && { color },
        center && styles.center,
        underLine && styles.txtUnderline,
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

/* eslint-disable react-native/no-unused-styles */
const styles = StyleSheet.create({
  note: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.regular,
  },
  description: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.small,
  },
  text: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.regular,
  },
  center: {
    textAlign: 'center',
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
  header: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.h2,
    fontWeight: Fonts.fontWeight.regular,
    color: Colors.default,
  },
  headerBold: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h2,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.default,
  },
  title30PX: {
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h3,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title28PX: {
    fontFamily: Fonts.type.bold,
    fontSize: 28,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  title26PX: {
    fontFamily: Fonts.type.bold,
    fontSize: 26,
    fontWeight: Fonts.fontWeight.bold,
    color: Colors.primaryText,
  },
  RegularTitle26PX: {
    fontFamily: Fonts.type.regular,
    fontSize: 26,
    color: Colors.lightGray,
  },
  itemName: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: 25,
    color: Colors.default,
  },
  detailHeader: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: 23,
    color: Colors.primaryText,
  },
  mediumDetailHeader: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.medium,
    fontSize: Fonts.size.h5,
    color: Colors.primaryText,
  },
  normal18PX: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: Fonts.size.h6,
    color: Colors.primaryText,
  },
  normal18PXLight: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.h6,
    color: Colors.secondaryText,
  },
  normalSemiBold: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.semibold,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
  },
  normalBold: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
  },
  normalBlack: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.black,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
  },
  normalMedium: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.medium,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
  },
  normal: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
    backgroundColor: 'transparent',
  },
  normalLight: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.regular,
    color: Colors.primaryText,
  },
  medium: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.medium,
    color: Colors.primaryText,
  },
  mediumBold: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: Fonts.size.medium,
    color: Colors.primaryText,
  },
  subText: {
    fontFamily: Fonts.type.regular,
    fontSize: Fonts.size.semi,
    color: Colors.lightGray,
  },
  subTextLight: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.semi,
    color: Colors.secondaryText,
  },
  subTextBlack: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.black,
    fontSize: Fonts.size.semi,
    color: Colors.primaryText,
  },
  subTextBold: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.bold,
    fontSize: Fonts.size.semi,
    color: Colors.primaryText,
  },
  subTextMedium: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.primaryText,
  },
  subTextMediumDarker: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.medium,
    fontSize: Fonts.size.semi,
    color: Colors.primaryTextDarker,
  },
  // note: {
  //   fontFamily: Fonts.type.regular,
  //   fontSize: Fonts.size.small,
  //   color: Colors.secondaryText,
  // },
  lightNote: {
    fontFamily: Fonts.type.regular,
    fontWeight: Fonts.fontWeight.light,
    fontSize: Fonts.size.small,
    color: Colors.secondaryText,
  },
  titleInput: {
    fontFamily: Fonts.type.input,
    fontWeight: Fonts.fontWeight.normal,
    fontSize: Fonts.size.input,
    color: Colors.primaryTextDark,
  },
});

Text.propTypes = {
  type: PropTypes.oneOf(Object.keys(styles)),
  color: PropTypes.string,
  center: PropTypes.bool,
  underLine: PropTypes.bool,
  style: PropTypes.any,
};

export default Text;
