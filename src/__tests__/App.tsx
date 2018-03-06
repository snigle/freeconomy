require('ts-jest')
import * as React from 'react';
import 'react-native';
import App from '../App';

// Note: test renderer must be required after react-native.
import * as renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
});
