import React, { Component } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/icomoon';
import { Colors, Fonts } from '../themes/index';
import Button from './Button';

export default class SwipperView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      selectedIndex: 0,
    };
    this.onJump = this.onJump.bind(this);
    this.scrollToItem = this.scrollToItem.bind(this);
    (this: any).adjustPageSize = this.adjustPageSize.bind(this);
  }

  renderPage({ item, index }) {
    if (item == 'end') return <View />;
    return <View style={{ flex: 1, width: this.state.width }}>{item}</View>;
  }

  scrollToItem(e) {
    e.viewableItems.length === 1
      && this.state.selectedIndex < 4
      && this.setState({ selectedIndex: e.viewableItems[0].index });
  }

  renderPageNumber() {
    const components = this.props.children.map((data, index) => {
      if (data == 'end') return <View />;
      return (
        <View
          key={index}
          style={[styles.paggingPoint, index == this.state.selectedIndex && styles.paggingPointAct]}
        />
      );
    });
    return (
      <View style={styles.vPagging}>
        {this.renderFooterTilte()}
        <View style={styles.vPointer}>{components}</View>
        {this.props.btnSkip && (
          <Button
            backgroundColor={Colors.primary}
            style={styles.btnSkip}
            textStyle={{ color: 'white' }}
            onPress={() => {
              this.props.next && this.props.next();
            }}
            text="Skip"
          />
        )}
      </View>
    );
  }

  onJump(index) {
    if (!(index < this.props.children.length)) {
      this.props.next && this.props.next();
      return;
    }
    if (index < 0 || index > this.props.children.length) return;
    this.refs.flatlist.scrollToIndex({ viewPosition: 0.5, index });
  }

  renderFooterTilte() {
    const { selectedIndex } = this.state;
    const { children } = this.props;
    if (children[selectedIndex].props.footerTitle) {
      return (
        <View style={styles.vTitleFooter}>
          <Text style={styles.titleFooter}>{children[selectedIndex].props.footerTitle.title}</Text>
          <Text style={styles.descriptionFooter}>
            {children[selectedIndex].props.footerTitle.description}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={[styles.vFlatList, this.props.style]}>
        <View>
          <FlatList
            ref="flatlist"
            onViewableItemsChanged={this.scrollToItem}
            style={[styles.vFlatList]}
            horizontal
            pagingEnabled
            onLayout={this.adjustPageSize}
            directionalLockEnabled
            onLayout={this.adjustPageSize}
            renderItem={this.renderPage}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            data={[...this.props.children, 'end']}
            renderItem={this.renderPage.bind(this)}
          />

          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.onJump(this.state.selectedIndex - 1);
            }}
          >
            <View style={styles.btnBack}>
              <Icon name="left" style={styles.icon} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnNext}
            onPress={() => {
              this.onJump(this.state.selectedIndex + 1);
            }}
          >
            <View style={styles.btnNext}>
              <Icon name="right" style={styles.icon} />
            </View>
          </TouchableOpacity>
        </View>
        {this.renderPageNumber()}
      </View>
    );
  }

  adjustPageSize(e: any) {
    this.setState({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }
}

const styles = {
  vFlatList: {
    flex: 1,
  },
  vPagging: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  vPointer: {
    flexDirection: 'row',
  },
  paggingPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: Colors.gray,
  },
  paggingPointAct: {
    backgroundColor: 'white',
    borderColor: Colors.gray,
    borderWidth: 1,
  },
  vTitleFooter: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  titleFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 15,
    color: Colors.secondaryText,
    ...Fonts.style.h4,
  },
  descriptionFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: Colors.secondaryText,
    ...Fonts.style.note,
  },
  btnSkip: {
    backgroundColor: Colors.darkprimary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 38,
  },
  btnNext: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 30,
  },
};
