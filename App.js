/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import TextApp from './TestApp';

Navigation.registerComponent(`test`, () => TextApp);

const start = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
      root: {
        stack: {
          options: {
            topBar: {
              visible: false
            }
          },
          children: [
            {
              component: {
                name: 'test',
                passProps: {
                  text: 'This is tab 2'
                },
                options: {}
              }
            }
          ]
        }
      }
    });
  });
};

export default start;
