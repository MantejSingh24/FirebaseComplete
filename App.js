import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Login from './Login'
import database from './database'

import Main from './Main'
// create our app's navigation stack


const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Loading"
          component={Loading}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="database" component={database} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
