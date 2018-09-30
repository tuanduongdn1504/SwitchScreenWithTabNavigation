import React from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/tutor';
import { iconsMap } from '../utils/appIcons';
import { Fonts, Colors } from '../themes';

const star = {
  full: 'star-full',
  half: 'star-half',
  empty: 'star-empty',
};
const colorStar = {
  full: Colors.primary,
  half: Colors.primary,
  empty: Colors.divider,
};
// <RatingStar size={20} maxRating={5} currentRating={rowData.rate} />

class RatingStar extends React.Component {
  static defaultProps = {
    size: 24,
    color: Colors.primary,
    currentRating: 0,
  };

  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    currentRating: PropTypes.number,
    onRating: PropTypes.func,
    totalRated: PropTypes.number,
    showTotalAfterStar: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      code: [],
      currentRating: props.currentRating,
      maxRating: props.maxRating,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentRating !== this.props.currentRating) {
      this.setState({ currentRating: nextProps.currentRating });
    }
  }

  onPressStar = rating => {
    this.props.onRating && this.props.onRating(rating);
  };

  getRating() {
    return this.state.currentRating;
  }

  renderStarRow() {
    const { maxRating, currentRating } = this.state;
    const components = [];
    const full = _.floor(currentRating || 0);
    // const half = currentRating - full >= 0.5 ? 'half' : 'empty';
    for (let i = 0; i < maxRating; i += 1) {
      let iconName;
      let iconColor;
      if (full > i) {
        iconName = star.full;
        iconColor = colorStar.full;
      } else if (full === i) {
        iconName = star.half;
        iconColor = colorStar.half;
      } else {
        iconName = star.empty;
        iconColor = colorStar.empty;
      }

      components.push(
        <TouchableHighlight
          key={i}
          underlayColor="transparent"
          onPress={() => this.onPressStar(i + 1)}
        >
          <View>
            <Icon
              name={iconName}
              size={this.props.size}
              style={{
                color: this.props.color,
                marginRight: 5,
              }}
            />
          </View>
        </TouchableHighlight>,
      );
    }

    return (
      <View style={styles.rowContainer}>
        {components}
        {this.props.showTotalAfterStar && (
          <Text style={styles.secondaryText}>
            {' '}
            {this.props.totalRated && this.props.totalRated}
          </Text>
        )}
      </View>
    );
  }

  renderEmpty() {
    return <View />;
  }

  render() {
    return (
      <View
        style={[
          this.props.left ? styles.containerAlignLeft : styles.containerAlignRight,
          this.props.style,
        ]}
      >
        {this.renderStarRow()}
        {this.props.totalRated != null
          && !this.props.showTotalAfterStar && (
            <Text style={[styles.secondaryText, this.props.totalRatedStyle]}>
              (
              {this.props.totalRated}
)
            </Text>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerAlignRight: {
    alignItems: 'flex-end',
  },
  containerAlignLeft: {
    alignItems: 'flex-start',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    color: Colors.primary,
    backgroundColor: 'transparent',
  },
  secondaryText: {
    fontSize: Fonts.size.semiSmall,
    color: Colors.secondaryText,
  },
});

module.exports = RatingStar;
