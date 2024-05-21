
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const AppTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#FFFFFF',
    },
  };

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer theme={AppTheme}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="NewPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation