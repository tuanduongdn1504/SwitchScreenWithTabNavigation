import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import I18n from 'react-native-i18n';
import { Images, Colors } from '../../themes';
import Text from '../../components/Text';
import Button from '../../components/Button';
import BackgroundImage from '../../components/BackgroundImage';
import { pop } from '../../navigation/navigationActions';

const About = (props) => {
  return (
    <View style={styles.container}>
      <BackgroundImage />
      <Button
        onPress={() => {
          pop(props.componentId);
        }}
        iconColor={Colors.default}
        transparent
        ionicons="md-arrow-back"
        style={styles.btnBack}
      />
      <View style={[styles.container, styles.center]}>
        <Image source={styles.image} source={Images.appLogo} />
        <Text type="header" style={styles.description} color={Colors.primary}>
          {I18n.t('appName')}
        </Text>
        <Text center type="subTextLight" style={styles.text} color={Colors.default}>
          {I18n.t('appDescription')}
        </Text>
      </View>
      <Text type="subTextBold" center style={styles.text} color={Colors.default}>
        {I18n.t('devBy')}
      </Text>
    </View>
  );
};
About.propTypes = {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    padding: 30,
  },
  description: {},
  image: {
    width: 300,
  },
  btnBack: {
    marginTop: 20,
    marginLeft: 10,
    width: 50,
    height: 50,
  },
});

export default About;
