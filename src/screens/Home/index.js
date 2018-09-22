import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, FlatList, Platform, Dimensions, Animated,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from 'react-native-i18n';
import { Navigation } from 'react-native-navigation';
import { push, showModal } from '../../navigation/navigationActions';
import { close, chat } from '../../navigation/navigationButtons';
import { getDataArr } from '../../redux/crudCreator/selectors';
import TutorActions from '../../redux/TutorRedux/actions';
import CheckUpdate from './CheckUpdate';
import Container from '../../components/Container';
import HomeItem from '../../components/Items/HomeItem';
import Divider from '../../components/Divider';
import Maps from '../../components/Maps';
import SearchInput from '../../components/SearchInput';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import { FILTER } from '../../localData';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMarker: {},
      filter: 'Tutor name',
    };
    this.animatedSearch = new Animated.Value(0);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.getTutors();
  }

  onPressItem(item) {
    this.props.getOneTutor(item);
    push(this.props.componentId, 'detail', {
      title: I18n.t('tutorDetail'),
      rightButtons: [chat()],
    });
  }

  onPressMarker = item => {
    this.setState({ selectedMarker: item });
  };

  showChatBox = () => {
    showModal('chatBox', {
      title: I18n.t('chatBox'),
      leftButtons: [],
      rightButtons: [close()],
    });
  };

  navigationButtonPressed = ({ buttonId }) => {
    if (buttonId === 'add') {
      this.showChatBox();
    }
  };

  onChangeItem = (currentPopupProps, value) => {
    this.setState({ [currentPopupProps]: value });
    this.ActionSheet.hide();
  };

  blurSearch = () => {
    this.setState({ isShowSearch: false }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 0,
        duration: 200,
      }).start();
    });
    Navigation.dismissOverlay('searchResults');
  };

  focusSearch = () => {
    this.setState({ isShowSearch: true }, () => {
      Animated.timing(this.animatedSearch, {
        toValue: 1,
        duration: 200,
      }).start();
    });
    Navigation.showOverlay({
      component: {
        id: 'searchResults',
        name: 'searchResults',
        passProps: {},
        options: {
          overlay: {
            interceptTouchOutside: false,
          },
        },
      },
    });
  };

  showFilter = () => {
    showModal('filter', {
      title: I18n.t('filter.text'),
      leftButtons: [],
      rightButtons: [close()],
    });
    // this.setState({ currentPopupProps: name }, () => {
    //   this.ActionSheet.show();
    // });
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

  renderOption = ({ item }) => {
    const { currentPopupProps } = this.state;
    return (
      <Button
        onPress={() => this.onChangeItem(currentPopupProps, item.value)}
        textStyle={styles.textButton}
        style={styles.item}
        buttonTitle={item.value}
      />
    );
  };

  renderSelect = () => {
    const { currentPopupProps } = this.state;
    if (!currentPopupProps) {
      return <View />;
    }
    return (
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        data={FILTER}
        renderItem={this.renderOption}
        keyExtractor={item => item.id}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={() => <View style={{ width: 10 }} />}
        ListFooterComponent={() => <View style={{ width: 10 }} />}
      />
    );
  };

  render() {
    const { tutors } = this.props;
    const left = this.animatedSearch.interpolate({
      inputRange: [0, 1],
      outputRange: [60, 0],
    });
    const searchBackground = this.animatedSearch.interpolate({
      inputRange: [0, 0.65, 1],
      outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    });
    const {
      isUpdate, selectedMarker, currentPopupProps, isShowSearch,
    } = this.state;
    return (
      <Container style={styles.container}>
        <CheckUpdate />
        <View style={styles.vMap}>
          <Maps
            markers={tutors}
            selectedMarker={selectedMarker}
            onPressMarker={this.onPressMarker}
          />
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.space} />
          <FlatList
            style={styles.list}
            extraData={isUpdate}
            data={tutors}
            renderItem={this.renderItem}
            keyExtractor={data => data.objectId}
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            ItemSeparatorComponent={() => <Divider />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ height: 30 }} />}
          />
          <View style={styles.vHeaderList}>
            <View style={styles.vLinePrimary} />
          </View>
        </View>
        {!isShowSearch && (
          <View style={styles.iconFilter}>
            <Button
              isShadow
              ionicons="ios-options"
              endColor={Colors.default}
              startColor={Colors.default}
              onPress={this.showFilter}
              iconColor={Colors.primaryText}
              iconStyle={{ marginRight: 0 }}
              style={styles.btnFilter}
            />
          </View>
        )}
        <Animated.View
          style={[
            styles.iconSearch,
            {
              backgroundColor: searchBackground,
              left,
            },
          ]}
        >
          <SearchInput
            isShadow={!isShowSearch}
            isFocus={isShowSearch}
            onClose={this.blurSearch}
            onFocus={this.focusSearch}
            onChange={this.onChangeSearch}
            style={styles.search}
            unFocusBackground={Colors.default}
          />
        </Animated.View>
      </Container>
    );
  }
}

Home.propTypes = {
  getTutors: PropTypes.func,
  componentId: PropTypes.string,
  tutors: PropTypes.array,
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  search: {
    flexDirection: 'row',
    // marginTop: Platform.OS === 'ios' ? 48 : 23,
    // marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFilter: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconFilter: {
    position: 'absolute',
    top: 30,
    left: 20,
    width: 50,
    height: 50,
  },
  iconSearch: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 60,
    paddingTop: 30,
  },
  item: {
    backgroundColor: 'transparent',
  },
  textButton: {
    color: Colors.primaryText,
  },
  space: {
    height: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    backgroundColor: Colors.default,
  },
  vMap: {
    height: (height * 2) / 5,
  },
  vHeaderList: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
  },
  vLinePrimary: {
    width: 68,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});

function mapStateToProps(state) {
  return {
    tutors: getDataArr(state, 'tutor'),
    loading: state.tutor.loading,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getTutors: () => dispatch(TutorActions.getAllTutor()),
    getOneTutor: data => dispatch(TutorActions.getOneTutor(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
