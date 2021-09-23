/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';
import colors from './src/styles/colors';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import { navigationRef } from './src/helpers/RootNavigation';
import Routes from './src/screen/routes';
import store from './src/store';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.cultured} />
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <Routes />
        </NavigationContainer>
      </Provider>

      <FlashMessage
        duration={1500}
        position={{ top: 0 }}
      />
    </>
  );
};

export default App;
