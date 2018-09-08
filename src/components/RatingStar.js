import React from 'react';
import {
  View, Text, TouchableHighlight, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { Fonts, Colors } from '../themes';

const star = {
  full: 'ios-star',
  half: 'ios-star-half',
  empty: 'ios-star-outline',
};
// <RatingStar size={20} maxRating={5} currentRating={rowData.rate} />

class RatingStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: [],
      currentRating: props.currentRating || 0,
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
      if (full > i) {
        iconName = star.full;
      } else if (full === i) {
        iconName = star.half;
      } else {
        iconName = star.empty;
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
              size={this.props.size ? this.props.size : 24}
              style={[
                {
                  color: this.props.color ? this.props.color : Colors.primary,
                  marginRight: 5,
                },
                this.props.colors && { color: this.props.colors[i] },
              ]}
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
(
            {this.props.totalRated || 0}
)
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
  },
});

module.exports = RatingStar;
