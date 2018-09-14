import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import KeyboardAwareScrollView from '../../components/KeyboardAwareScrollView';
import InputRow from '../../components/InputRow';
import Button from '../../components/Button';
import { push } from '../../navigation/navigationActions';
import { back } from '../../navigation/navigationButtons';
import Text, { styles as TextStyle } from '../../components/Text';

export default class ForgotPassword extends Component {
  static propTypes = {
    componentId: PropTypes.string,
  };

  static options() {
    return {
      topBar: {
        title: {
          text: I18n.t('userInfo.password.forgotPassword'),
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

  constructor(props) {
    super(props);
    this.state = {};
    this.email = React.createRef();
  }

  onChange = name => text => {
    this.data[name] = text;
  };

  send = () => {
    const { componentId } = this.props;
    push(componentId, 'resetPassword', {});
  };

  renderDescription = () => {
    return (
      <View style={styles.description}>
        <Text type="body2" color={Colors.primaryText}>
          {I18n.t('userInfo.password.forgotPasswordDescription1')}
        </Text>
        <Text type="body3" color={Colors.primaryTextBlur}>
          {I18n.t('userInfo.password.forgotPasswordDescription2')}
        </Text>
      </View>
    );
  };

  renderInput = () => (
    <View style={styles.groupInput}>
      <InputRow
        ref={ref => {
          this.email = ref;
        }}
        textColor={Colors.primary}
        animatedTitle
        underLine
        validateType="email"
        // onChangeText={this.onChange('email')}
        placeholderTextColor={Colors.lightGray}
        placeholder={I18n.t('userInfo.email')}
      />
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          {this.renderDescription()}
          {this.renderInput()}
          <Button
            primary
            style={styles.vBtn}
            onPress={this.send}
            buttonTitle={I18n.t('send').toLocaleUpperCase()}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
  },
  description: {
    marginTop: 40,
  },
  groupInput: {
    marginTop: 20,
  },
  vBtn: {
    width: width - 40,
    marginTop: 40,
  },
});

// function mapStateToProps(state) {
//   return {};
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     signIn: data => dispatch(LoginActions.signIn(data)),
//     fbSignIn: data => dispatch(LoginActions.fbSignIn(data)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(ForgotPassword);
