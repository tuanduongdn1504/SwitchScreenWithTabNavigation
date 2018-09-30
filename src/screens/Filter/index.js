import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet, LayoutAnimation } from 'react-native';
import I18n from 'react-native-i18n';
import { Colors } from '../../themes';
import Button from '../../components/Button';
import SortView from './SortView';
import PriceRange from './PriceView';
import FilterItem from '../../components/Items/FilterItem';
import SelectedOtherFilters from './SelectedOtherFilters';
import HeaderOtherFilters from './HeaderOtherFilters';
import Popup from '../../components/Popup';
import TutorsActions, { makeFilterForTutor } from '../../redux/TutorsRedux/actions';
import { setFilter as setFilterActions } from '../../redux/FilterRedux/actions';
import { getDataArr } from '../../redux/crudCreator/selectors';
import DistanceView from './DistanceView';
import AddressView from './AddressView';
import { getPlace } from '../../api/locations';
import { searchAsync } from '../../utils/tools';
import SessionTypes from '../../components/SessionTypes';
import { dismissAllModals } from '../../navigation/navigationActions';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollEnabled: false,
      otherFilterData: [],
      filter: {
        ...props.filter,
        location: props.filter.location || {
          ...props.currentLocation,
          id: props.currentLocation.location,
        },
      },
    };
  }

  componentDidMount() {
    this.searchLocation = searchAsync(getPlace, this.searchLocationResult);
  }

  onBackFromOtherFilter = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      scrollEnabled: false,
    });
  };


  onSubmitSearch = () => {
    const { filter } = this.state;
    const { setFilter, getAllTutors, componentId } = this.props;
    if (this.priceRange && this.priceRange.getData) {
      filter.priceRange = this.priceRange.getData();
    }
    dismissAllModals();
    setTimeout(() => {
      setFilter(filter);
      getAllTutors(makeFilterForTutor(filter));
    })
  };

  onReset = () => {
    const { currentLocation } = this.props;
    this.setState({
      filter: {
        location: {
          ...currentLocation,
          id: currentLocation?.location,
        },
      },
    });
  };

  onSetFilter = data => {
    this.setState({ filter: { ...this.state.filter, ...data } });
  };

  onSetFilterOther = data => {
    const { filter, currentProperty } = this.state;
    const currentPropertyFilter = filter[currentProperty] || {};
    this.setState({
      filter: {
        ...filter,
        [currentProperty]:
          currentProperty === 'location'
            ? data
            : { ...currentPropertyFilter, [data.id]: !currentPropertyFilter[data.id] },
      },
    });
  };

  onPressSort = property => item => {
    const { filter } = this.state;
    this.setState({
      filter: {
        ...filter,
        [property]: filter[property]
          ? {
            ...filter[property],
            [item.id]: !filter[property][item.id],
          }
          : {
            [item.id]: true,
          },
      },
    });
  };

  changeFilter = (otherFilterName, property) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      scrollEnabled: true,
      otherFilterName,
      currentProperty: property,
      otherFilterData: this.getOtherFilterData(property),
      filter: {...this.state.filter, PriceRange: this.priceRange?.getData()}
    });
    setTimeout(() => {
      // this.swiper.scrollBy(1);
    }, 200);
  };

  onSearch = text => {
    const { currentProperty } = this.state;
    if (currentProperty === 'location') {
      this.searchLocation(text);
      return;
    }
    this.setState({ otherFilterData: this.getOtherFilterData(currentProperty, text) });
  };

  searchLocationResult = res => {
    const data = res.resourceSets[0].resources.map(item => ({
      latitude: item.point.coordinates[0],
      location: item.name,
      longitude: item.point.coordinates[1],
      id: item.name,
    }));
    this.setState({ otherFilterData: data });
  };

  getOtherFilterData = (property, searchKey = '') => {
    const { filter } = this.state;
    if (property === 'location') {
      return filter.location ? [filter.location] : [];
    }
    if (this.props[property]) {
      return Object.values(this.props[property]).filter(data => {
        return data.name.search(searchKey) > -1;
      });
    }
    return [];
  };

  renderContent = () => {
    const { filter } = this.state;
    const {totalSubjects} = this.props;
    const {
      distance, location, session_types, sort, priceRange,subjects
    } = filter;
    return (
      <View>
        <SortView sort={sort} onPress={this.onPressSort('sort')} />
        <SessionTypes session_types={session_types} onPress={this.onPressSort('session_types')} />
        <AddressView
          location={location}
          onPress={() => this.changeFilter(I18n.t('filter.location'), 'location')}
        />
        <DistanceView value={distance} onSetFilter={this.onSetFilter} />
        <PriceRange start={priceRange?.start} end={priceRange?.end} refFunc={ref => {this.priceRange = ref;}}  />
        <FilterItem
          onPress={() => this.changeFilter(I18n.t('userInfo.tutor.subjects'), 'subjects')}
          name={I18n.t('userInfo.tutor.subjects')}
          value={subjects?`${Object.keys(subjects).length} / ${totalSubjects}`: I18n.t('filter.selectSubject')}
        />
        <View style={{ height: 100 }} />
      </View>
    );
  }

  renderFooter = () => {
    return (
      <View style={styles.row}>
        <View style={styles.btnSearch}>
          <Button
            onPress={() => this.onSubmitSearch()}
            buttonTitle={I18n.t('button.search')}
          />
        </View>
        <View style={{ width: 10 }} />
        <View style={styles.btnReset}>
          <Button
            isShadow
            endColor={Colors.default}
            startColor={Colors.default}
            buttonTitle={I18n.t('button.reset')}
            textStyle={styles.txtBtn}
            onPress={() => this.onReset()}
          />
        </View>
      </View>
    );
  }

  render() {
    const {
      scrollEnabled, otherFilterName, currentProperty, otherFilterData, filter,
    } = this.state;
    const { componentId } = this.props;
    const content = scrollEnabled ? (
      <SelectedOtherFilters
        currentProperty={currentProperty}
        onSetFilter={this.onSetFilterOther}
        data={otherFilterData}
        selectedItems={filter[currentProperty]}
      />
    ) : (
      this.renderContent()
    );
    return (
      <Popup
        isFull
        componentId={componentId}
        renderFooter={this.renderFooter}
        scrollEnabled={!scrollEnabled}
        renderHeader={() => {
          return scrollEnabled ? (
            <HeaderOtherFilters
              onSearch={text => {
                this.onSearch(text);
              }}
              onBackFromOtherFilter={this.onBackFromOtherFilter}
              otherFilterName={otherFilterName}
            />
          ) : null;
        }}
      >
        <View style={{backgroundColor: "white"}}>
          {content}
        </View>
      </Popup>
    );
  }
}

Filter.propTypes = {
  componentId: PropTypes.string,
  filter: PropTypes.object,
  currentLocation: PropTypes.object,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 40,
  },
  btnSearch: {
    height: 40,
    flex: 1,
  },
  btnReset: {
    width: 100,
    height: 40,
  },
  txtBtn: {
    color: Colors.primaryText,
  },
});

function mapStateToProps(state) {
  return {
    subjects: getDataArr(state, 'subjects'),
    totalSubjects: state.subjects.total,
    filter: state.filter.data,
    currentLocation: state.location,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    getAllTutors: data => dispatch(TutorsActions.getAllTutors(data)),
    setFilter: data => dispatch(setFilterActions(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
