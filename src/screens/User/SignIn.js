import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import I18n from 'react-native-i18n';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import { styles as TextStyle } from '../../components/Text';

class SignIn extends Component {
  static options(passProps) {
    return {
      topBar: {
        title: {
          text: 'Sign In',
        },
        background: {
          color: 'red',
        },
        largeTitle: {
          visible: true,
          ...TextStyle.largeTitle,
        },
        leftButtons: [back()],
        drawBehind: true,
      },
    };
  }

  forgotPassword = () => {
    push(this.props.componentId, 'forgotPassword', {
      // title: I18n.t('forgotPassword'),
    });
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={this.forgotPassword}>forgotPassword</Text>
      </View>
    );
  }
}
SignIn.propTypes = {};

const styles = StyleSheet.create({});

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
