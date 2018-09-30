import React, { Component } from 'react';
import {
  View, StyleSheet, Animated, Dimensions, InteractionManager, FlatList,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import I18n from 'react-native-i18n';
import Text from '../../components/Text';
import { Colors } from '../../themes';
import { dismissInAppNoti, push } from '../../navigation/navigationActions';
import TutorsActions from '../../redux/TutorsRedux/actions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import Divider from '../../components/Divider';
import HomeItem from '../../components/Items/HomeItem';
import { chat } from '../../navigation/navigationButtons';
import { isIPhoneX } from '../../utils/tools';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.animation = new Animated.Value(height);
  }

  componentDidMount() {
    this.toggleNotiAnim();
  }

  onPressItem(item) {
    const { componentId } = this.props;
    push(componentId, 'detail', {
      title: I18n.t('tutorDetail'),
      passProps: {
        item,
      },
      rightButtons: [chat()],
    });
  }

  toggleNotiAnim = (isShow = true) => {
    const handle = InteractionManager.createInteractionHandle();
    Animated.timing(this.animation, {
      toValue: isShow ? (isIPhoneX ? 90 : 70) : height,
      useNativeDriver: true,
      duration: 300,
    }).start(() => {
      InteractionManager.clearInteractionHandle(handle);
      if (!isShow) {
        dismissInAppNoti();
      } else {
      }
    });
  };

  renderEmpty = () => {
    return (
      <Text type="title2" center color={Colors.divider}>
        {I18n.t('empty.tutor')}
      </Text>
    );
  };

  renderItem = ({ item, index }) => {
    return (
      <HomeItem
        showQR={this.showQR}
        data={item}
        index={index}
        onPress={() => this.onPressItem(item, index)}
      />
    );
  };

  render() {
    const { tutors } = this.props;
    return (
      <Animated.View
        style={[
          styles.wrapperView,
          {
            transform: [{ translateY: this.animation }],
          },
        ]}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          this.containerHeight = height;
        }}
      >
        <View style={styles.container}>
          <FlatList
            style={styles.list}
            data={tutors}
            keyExtractor={data => data.id}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.renderEmpty}
            ItemSeparatorComponent={() => <Divider />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
      </Animated.View>
    );
  }
}

SearchResults.propTypes = {
  componentId: PropTypes.string,
  tutors: PropTypes.array,
};

SearchResults.defaultProps = {};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapperView: {
    width,
    height: isIPhoneX ? height - 100 : height - 60,
    backgroundColor: Colors.default,
  },
  container: {
    paddingTop: 16,
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    paddingBottom: 10,
  },
  list: {},
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutors'),
    loading: state.tutors.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOneTutors: data => dispatch(TutorsActions.getOneTutors(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResults);
