import { View, Text, StyleSheet, SafeAreaView, StatusBar, Pressable} from 'react-native'
import React, { useState }from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const onboardingSteps = [
    {
      icon: 'checklist',
      title: 'Welcome to Cytonn Tasks',
      description: 'Stay organized and on top of your investment and real estate tasks with Cytonns dedicated To Do app',
    },
    {
      icon: 'account-balance',
      title: 'Seamless Task Management',
      description: 'Manage your daily tasks effortlessly, track progress, and achieve your goals with our intuitive interface',
    },
    {
      icon: 'done-all',
      title: 'Achieve More with Cytonn',
      description:
        'Unlock the full potential of your productivity and take control of your time with Cytonn Tasks. Lets get started!',
    },
  ];
const OnboardingScreen = () => {

    const [screenIndex, setScreenIndex] = useState(0);

    const data = onboardingSteps[screenIndex];
    const navigation = useNavigation();
    const onContinue = () => {
      const isLastScreen = screenIndex === onboardingSteps.length - 1;
      if (isLastScreen) {
        endOnboarding();
      } else {
        setScreenIndex(screenIndex + 1);
      }
    };
  
    // const onBack = () => {
    //   const isFirstScreen = screenIndex === 0;
    //   if (isFirstScreen) {
    //     endOnboarding();
    //   } else {
    //     setScreenIndex(screenIndex - 1);
    //   }
    // };
  
    const endOnboarding = () => {
        navigation.navigate('SignIn');
        setScreenIndex(0);
    };

  return (
    <SafeAreaView style={styles.page}>
    {/* <Stack.Screen options={{ headerShown: false }} /> */}
    <StatusBar style="light" />

    <View style={styles.stepIndicatorContainer}>
      {onboardingSteps.map((step, index) => (
        <View
          key={index}
          style={[
            styles.stepIndicator,
            { backgroundColor: index === screenIndex ? '#CEF202' : 'grey' },
          ]}
        />
      ))}
    </View>

   
      <View style={styles.pageContent} key={screenIndex}>
          <MaterialIcons
            style={styles.image}
            name={data.icon}
            size={150}
            color="#CEF202"
          />

        <View style={styles.footer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
          <View style={styles.buttonsRow}>
            <Text onPress={endOnboarding} style={styles.buttonText}>
              Skip
            </Text>

            <Pressable onPress={onContinue} style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        </View>
      </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    page: {
      // alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#002822',
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
      fontFamily: 'Inter Black',
      letterSpacing: 1.3,
      marginVertical: 10,
    },
    description: {
      color: 'gray',
      fontSize: 20,
      fontFamily: 'Inter Regular', //Inter
      lineHeight: 28,
    },
    footer: {
      marginTop: 'auto',
    },
  
    buttonsRow: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
    },
    button: {
      backgroundColor: '#302E38',
      borderRadius: 50,
      alignItems: 'center',
      flex: 1,
    },
    buttonText: {
      color: '#FDFDFD',
      fontFamily: 'Inter SemiBold', //InterSemi
      fontSize: 16,
  
      padding: 15,
      paddingHorizontal: 25,
    },
  
    // steps
    stepIndicatorContainer: {
      flexDirection: 'row',
      marginHorizontal: 15,
      marginTop: 20,
    },
    stepIndicator: {
      flex: 1,
      height: 3,
      backgroundColor: 'gray',
      borderRadius: 10,
      margin: 5,
    },
  });
  
export default OnboardingScreen;
