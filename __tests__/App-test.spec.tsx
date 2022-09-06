/**
 * @format
 */

import 'react-native';
import React from 'react';
// @ts-ignore
import AppWrapper from '../App.tsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const component = renderer.create(<AppWrapper/>);
});
