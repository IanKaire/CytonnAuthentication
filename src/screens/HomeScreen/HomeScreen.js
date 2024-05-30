import React from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {Auth} from 'aws-amplify';

const HomeScreen = () => {
  const signOut = () => {
    Auth.signOut();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.homeTxt}>Home, sweet home</Text>
      <Text
        onPress={signOut}
        style={styles.signOutTxt}>
        Sign out
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeTxt: {
    fontSize: 24,
  },
  signOutTxt: {
    marginVertical: 20,
    color: 'red',
    fontSize: 20,
  },
});

export default HomeScreen;