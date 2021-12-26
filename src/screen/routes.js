import * as React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ListContact from './ListContact';
import DetailContact from './DetailContact';
import {ROUTE_NAMES} from '../helpers/Contants';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      initialRouteName={ROUTE_NAMES.LIST_CONTACT}
      mode={'modal'}
      headerMode={'screen'}>
      <Stack.Screen
        name={ROUTE_NAMES.LIST_CONTACT}
        component={ListContact}
        options={{header: () => null}}
      />

      <Stack.Screen
        name={ROUTE_NAMES.DETAIL_CONTACT}
        component={DetailContact}
        options={{header: () => null}}
      />

      <Stack.Screen
        name={ROUTE_NAMES.LIST_CONTACT2}
        component={ListContact}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
}

export default Routes;
