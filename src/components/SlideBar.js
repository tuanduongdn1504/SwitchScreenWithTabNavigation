import React from 'react';
import {
  PanResponder, StyleSheet, Dimensions, Text, View,
} from 'react-native';
import { Colors } from '../themes/index';

const { width } = Dimensions.get('window');

const CIRCLE_SIZE = 26;
const MARGIN = 0;
const UNIT = 99;
const LENGTH = width - 2 * MARGIN - CIRCLE_SIZE * 2;

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 1,
      end: 50,
      left: MARGIN + 5,
      right: MARGIN + LENGTH - (LENGTH / UNIT) * (UNIT - 50) + 5,
    };
  }

  componentDidMount() {
    this.changeRange();
  }
  
  getData = () => {
    return {
      start: this.state.start,
      end: this.state.end,
      text: `$${this.state.start.toFixed(2)} - $${this.state.end.toFixed(2)} Per Hour`,
    };
  }

  changeRange = () => {
    if (this.refs.p1._circleStyles.style.left < this.refs.p2._circleStyles.style.left) {
      const start = this.refs.p1._circleStyles.style.left;
      const end = this.refs.p2._circleStyles.style.left;
      this.setState({
        start: (start - MARGIN) / (LENGTH / UNIT) + 1,
        end: (end - MARGIN) / (LENGTH / UNIT) + 1,
        left: start + 5,
        right: LENGTH - 5 - end,
      });
    } else {
      const start = this.refs.p2._circleStyles.style.left;
      const end = this.refs.p1._circleStyles.style.left;
      this.setState({
        start: (start - MARGIN) / (LENGTH / UNIT) + 1,
        end: (end - MARGIN) / (LENGTH / UNIT) + 1,
        left: start + 5,
        right: LENGTH - 5 - end,
      });
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.txtValue}>
          {this.state.start.toFixed(2)}
          {' '}
          USD
          {' '}
- 
          {this.state.end.toFixed(2)}
          {' '}
          USD
        </Text>
        <View style={styles.container}>
          <View style={styles.sliderOut} />
          <View style={[styles.sliderRange, { left: this.state.left, right: this.state.right }]} />
          <Pointer
            ref="p1"
            pointer="p1"
            unit={UNIT}
            start={this.props.start != null ? this.props.start - 1 : 0}
            changeRange={this.changeRange}
          />
          <Pointer
            ref="p2"
            pointer="p2"
            unit={UNIT}
            start={this.props.end != null ? this.props.end - 1 : 49}
            changeRange={this.changeRange}
          />
        </View>
      </View>
    );
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = 'blue';
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return false;
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {}

  _handlePanResponderMove(e: Object, gestureState: Object) {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx < MARGIN ? MARGIN : this._previousLeft + gestureState.dx;
    // this._circleStyles.style.left =  width - this._circleStyles.style.left<2*MARGIN? width - 2*MARGIN:this._circleStyles.style.left;
    this._updateNativeStyles();
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    this._previousLeft += gestureState.dx;
  }
}

class Pointer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      range: LENGTH,
      perUnitLength: LENGTH / UNIT,
    };
    this._panResponder = {};
    this._previousLeft = (props.start * LENGTH) / UNIT;
    this._circleStyles = {};
    this.circle = (null: ?{ setNativeProps(props: Object): void });
    this._handleStartShouldSetPanResponder = this._handleStartShouldSetPanResponder.bind(this);
    this._handleMoveShouldSetPanResponder = this._handleMoveShouldSetPanResponder.bind(this);
    this._handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
    this._handlePanResponderMove = this._handlePanResponderMove.bind(this);
    this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
    this._handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
    this._highlight = this._highlight.bind(this);
    this._unHighlight = this._unHighlight.bind(this);
    this._updateNativeStyles = this._updateNativeStyles.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = MARGIN + this.props.start * this.state.perUnitLength;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
      },
    };
  }

  componentDidMount() {
    this._updateNativeStyles();
  }

  render() {
    return (
      <View
        ref={circle => {
          this.circle = circle;
        }}
        style={styles.circle}
        hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}
        {...this._panResponder.panHandlers}
      />
    );
  }

  _highlight() {
    this._circleStyles.style.backgroundColor = 'blue';
    this._updateNativeStyles();
  }

  _unHighlight() {
    this._circleStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  }

  _updateNativeStyles() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  }

  _handleMoveShouldSetPanResponder(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return false;
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {}

  _handlePanResponderMove(e: Object, gestureState: Object) {
    const value = Math.floor((this._previousLeft + gestureState.dx - MARGIN) / this.state.perUnitLength)
        * this.state.perUnitLength
      + MARGIN;
    this._circleStyles.style.left = value < MARGIN ? MARGIN : value;
    this._circleStyles.style.left = value > MARGIN + UNIT * this.state.perUnitLength
      ? MARGIN + UNIT * this.state.perUnitLength
      : this._circleStyles.style.left;

    this.props.changeRange(this._circleStyles.style.left, this.props.pointer);
    this._updateNativeStyles();
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    this._previousLeft += gestureState.dx;
  }
}

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: Colors.lightDivider,
    borderWidth: 1,
    backgroundColor: Colors.default,
    position: 'absolute',
    top: 1.5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
    elevation: 1
  },
  container: {
    height: 30,
  },
  sliderOut: {
    height: 2.5,
    backgroundColor: Colors.lightDivider,
    position: 'absolute',
    top: 12.5,
    left: 5,
    right: 5,
  },
  sliderRange: {
    height: 2.5,
    backgroundColor: Colors.primary,
    position: 'absolute',
    top: 12.5,
  },
  txtValue: {
    color: Colors.secondaryText,
    marginVertical: 16,
    marginBottom: 10,
  },
});

export default Slider;
