import React from 'react';
import {StatusBar} from 'react-native';
import Route from './src/NativeNavigation';
export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Route />
    </>
  );
}
