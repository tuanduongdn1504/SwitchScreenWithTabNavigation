import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Accordion from '../../components/Accordion';
import Text from '../../components/Text';
import FaqItem from '../../components/Items/FaqItem';

const SECTIONS = [
  {
    title: 'First',
    content: 'Lorem ipsum...',
  },
  {
    title: 'Second',
    content: 'Lorem ipsum...',
  },
];

class FAQ extends Component {
  renderHeader(section, _, isActive) {
    return <FaqItem title={section.title} collapsed={!isActive} />;
  }

  renderContent(section) {
    return (
      <View style={styles.content}>
        <Text type="body2">{section.content}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Accordion
          sections={SECTIONS}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});

function mapStateToProps(state) {
  return {
    // user: state.login.data,
    // user: {
    //   fullName: 'Anh Doan',
    //   location: 'Osaka, Japan',
    // },
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // logout: () => dispatch(LoginActions.signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FAQ);
