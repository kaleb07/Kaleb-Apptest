import * as React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import List from './List';
import DetailTransaction from './DetailTransaction';
import { ROUTE_NAMES } from '../helpers/Contants';

const Stack = createStackNavigator();

function Routes() {
    return (
        <Stack.Navigator
            initialRouteName={ROUTE_NAMES.LIST}
            mode={'modal'}
            headerMode={'screen'}>
            <Stack.Screen
                name={'LIST'}
                component={List}
                options={{ header: () => null }}
            />

            <Stack.Screen
                name={ROUTE_NAMES.DETAIL_TRANSACTION}
                component={DetailTransaction}
                options={{ header: () => null }}
            />
        </Stack.Navigator>
    );
}

export default Routes;