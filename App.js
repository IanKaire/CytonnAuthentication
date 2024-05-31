
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import Navigation from './src/navigation';
import Amplify from 'aws-amplify';
import config from './src/aws-exports';
import SplashScreen from 'react-native-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

Amplify.configure(config);

const App = () => {

  useEffect(() => {
     if(Platform.OS === 'android') SplashScreen.hide();
  },[]);
  
  // Auth.signOut();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
});

export default App;


