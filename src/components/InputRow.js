import React, { Component } from 'react';
import {
  View,
  TextInput,
  Dimensions,
  Animated,
  Platform,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Metrics, Colors } from '../themes/index';
import { type, size } from '../themes/Fonts';

export default class InputRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || '',
      placeholderTextColor: props.placeholderTextColor || Colors.lightDivider,
      bounceValue: new Animated.Value(0),
      placeholderTranslateY: new Animated.Value(
        props.value == '' || !props.value ? 5 : -20,
      ),
      placeholderTranslateX: new Animated.Value(
        props.value == '' || !props.value ? 0 : 0,
      ),
      scaleText: new Animated.Value(14),
    };
  }

  componentDidMount() {
    if (this.props.defaultValue) {
      this.input._lastNativeText = this.props.defaultValue;
      this.transformOnFocus();
    }
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  onFocus() {
    this.setState({
      placeholderTextColor: this.props.textColor || Colors.primary,
    });
    this.transformOnFocus();
    this.props.onFocus && this.props.onFocus();
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
    if (!this.input._lastNativeText || this.input._lastNativeText == '') {
      this.setState({
        placeholderTextColor: this.props.placeholderTextColor || Colors.divider,
      });
      this.transformOnFocus(false);
    }
  }

  setValue(text) {
    this.setState({ value: text });
    this.transformOnFocus();
  }

  getText() {
    return this.input._lastNativeText;
  }

  transformOnFocus(mode = true) {
    Animated.spring(this.state.bounceValue, {
      toValue: mode ? 1 : 0,
    }).start();
    if (this.props.value) return;
    Animated.sequence([
      Animated.parallel([
        Animated.spring(this.state.placeholderTranslateY, {
          toValue: mode ? -20 : 5,
        }),
        Animated.spring(this.state.scaleText, { toValue: mode ? 10 : 14 }),
        Animated.spring(this.state.placeholderTranslateX, {
          toValue: mode ? 0 : 0,
        }),
      ]),
    ]).start();
  }

  render() {
    return (
      <View ref="containerInput" style={[styles.item, this.props.style]}>
        <View
          style={[
            styles.containerInputRow,
            { backgroundColor: this.props.backgroundColor },
          ]}
        >
          {this.props.icon && this.renderIcon()}
          {this.renderTextInput()}
          {this.props.children}
        </View>
      </View>
    );
  }

  renderIcon() {
    return (
      <View
        style={
          this.props.multiline
            ? styles.containerLeftMultil
            : styles.containerLeft
        }
      >
        <Icon
          name={this.props.icon}
          size={Metrics.icons.small}
          style={[
            styles.icon,
            { color: this.props.placeholderTextColor || Colors.divider },
          ]}
        />
      </View>
    );
  }

  renderTextInput() {
    return (
      <View
        style={[
          styles.containerRight,
          { paddingTop: this.props.animatedTitle ? 20 : 0 },
        ]}
      >
        {this.props.textInputBackgroundStyle && (
          <View
            style={[
              styles.textInputBackground,
              this.props.textInputBackgroundStyle,
            ]}
          />
        )}
        {this.props.animatedTitle && this.renderAnimatedTitle()}
        {this.renderInput()}
        {this.props.underLine
          && Platform.OS !== 'android'
          && this.renderUnderLine()}
      </View>
    );
  }

  renderAnimatedTitle() {
    return (
      <View>
        <Animated.Text
          style={[
            styles.placeholder,
            {
              color: this.state.placeholderTextColor,
              transform: [
                { translateY: this.state.placeholderTranslateY },
                { translateX: this.state.placeholderTranslateX },
              ],
              fontSize: this.state.scaleText,
            },
          ]}
        >
          {this.props.placeholder}
          {this.props.required && <Text style={[{ color: 'red' }]}> *</Text>}
        </Animated.Text>
      </View>
    );
  }

  renderInput() {
    return (
      <View>
        <TextInput
          onChangeText={text => {
            if (checkTypeNumber(this.props.keyboardType)) {
              if (text == '' || !text) return;
              if (checkPhoneType(this.props.keyboardType)) {
                !checkPhone(text) && this.setState({ value: this.state.value });
                return;
              }
              !checkNumber(text) && this.setState({ value: this.state.value });
            }
          }}
          spellCheck={false}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={this.props.onSubmitEditing}
          returnKeyType={this.props.returnKeyType || 'done'}
          keyboardType={this.props.keyboardType}
          blurOnSubmit={!this.props.multiline}
          underlineColorAndroid={
            this.props.textInputBackgroundStyle && !this.props.underLine
              ? this.props.textInputBackgroundStyle.backgroundColor
              : this.state.placeholderTextColor
          }
          multiline={this.props.multiline}
          editable={this.props.editable}
          secureTextEntry={this.props.secureTextEntry}
          ref={ref => {
            this.input = ref;
          }}
          placeholder={this.props.animatedTitle ? '' : this.props.placeholder}
          placeholderTextColor={this.state.placeholderTextColor}
          selectTextOnFocus
          style={[
            styles.textInput,
            {
              color: this.props.textColor || Colors.primaryText,
              textAlign: this.props.textAlign == 'center' ? 'center' : null,
            },
            this.props.multiline ? { height: 100, margin: 10 } : {},
            this.props.textInputStyle,
          ]}
          value={this.state.value}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          defaultValue={this.props.defaultValue}
          onChange={event => {
            this.setState({ value: event.nativeEvent.text });
            this.props.onChangeText
              && this.props.onChangeText(event.nativeEvent.text);
          }}
        />
      </View>
    );
  }

  renderUnderLine() {
    return (
      <View>
        <View
          style={[
            styles.separatorRow,
            { top: 1.5, backgroundColor: this.state.placeholderTextColor },
          ]}
        />
        {false && (
          <Animated.View
            style={[
              styles.separatorRow,
              {
                height: 2,
                transform: [{ scaleX: this.state.bounceValue }],
                backgroundColor: Colors.primary,
              },
            ]}
          />
        )}
      </View>
    );
  }
}

const styles = {
  containerInputRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  containerLeft: {
    width: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerLeftMultil: {
    width: 38,
    paddingTop: 3,
    alignItems: 'center',
  },
  containerRight: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    color: Colors.divider,
  },
  textInput: {
    height: 35,
    paddingBottom: 5,
    textAlignVertical: 'top',
    backgroundColor: 'transparent',
    fontFamily: type.text,
    fontSize: 14,
  },
  separatorRow: {
    height: 1.5,
    backgroundColor: Colors.divider,
  },
  placeholder: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    fontFamily: type.text,
    fontSize: 12,
  },
  textInputBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 40,
    bottom: Platform.OS == 'android' ? 0 : 5,
  },
};
function checkPhone(num) {
  const re = /^[0-9#+*.,]+$/;
  return re.test(num);
}
function checkPhoneType(type) {
  return type == 'phone-pad';
}

function checkNumber(num) {
  const re = /^[-+]?[0-9]*\.?[0-9]?[0-9]?$/;
  const re1 = /^[-+]?[0-9]*\,?[0-9]?[0-9]?$/;
  return re.test(num) || re1.test(num);
}

function checkTypeNumber(type) {
  return (
    type == 'numeric'
    || type == 'phone-pad'
    || type == 'number-pad'
    || type == 'decimal-pad'
  );
}
