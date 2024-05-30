import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

const OnboardingScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
    <View style={styles.pageContent}>
        <Text><Icon name="rocket" size={30} color="#900" /></Text>
        <Text style={styles.title}>Onboarding</Text>
        <Text style={styles.description}>Track your progress</Text>
    </View>
    </SafeAreaView>
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    page: {
      // alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#15141A',
    },
    pageContent: {
      padding: 20,
      flex: 1,
    },
    image: {
      alignSelf: 'center',
      margin: 20,
      marginTop: 70,
    },
    title: {
      color: '#FDFDFD',
      fontSize: 50,
      fontFamily: 'Inter Regular',
      letterSpacing: 1.3,
      marginVertical: 10,
    },
    description: {
      color: 'gray',
      fontSize: 20,
      fontFamily: 'Inter',
      lineHeight: 28,
    },
  });