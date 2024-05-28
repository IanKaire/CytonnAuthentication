
import React, { useState } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, ScrollView, TextInput, Alert, BackHandler} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import TouchID from 'react-native-touch-id';
import * as Keychain from 'react-native-keychain';

const SignInScreen = () => {
    const [loading, setLoading] = useState(false);
    const [loadingBiometrics, setLoadingBiometrics] = useState(false);
    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const { control, handleSubmit, formState: {errors} } = useForm();

    console.log(errors);
   
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#006A5B', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    const handleAuth = () => {
      TouchID.isSupported().then(biometryType => {
        if(biometryType === 'FaceID'){
          // Alert.alert('FaceID is supported.')
          TouchID.authenticate('', optionalConfigObject)
          .then( async success => {
            // Retrieve username and password
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                 const {username, password} = credentials;
                 if (loadingBiometrics) {
                  return;
                }
            
                setLoadingBiometrics(true);
            try {
              // Sign in the user using AWS Amplify's Auth module
              const user = await Auth.signIn(username, password);
              console.log(user);
              // navigation.navigate("Home");
            } catch (e) {
              Alert.alert('Oops', 'Invalid credentials');
            }
               setLoadingBiometrics(false);
          }})
          .catch(e => {
              Alert.alert('Authentication Failed', 'Biometric authentication failed. Please try again.');
          })
        } else {
          TouchID.authenticate('', optionalConfigObject)
          .then( async success => {
            // Retrieve username and password
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                 const {username, password} = credentials;

                 if (loadingBiometrics) {
                  return;
                }
            
                setLoadingBiometrics(true);
            try {
              // Sign in the user using AWS Amplify's Auth module
              const user = await Auth.signIn(username, password);
              // navigation.navigate("Home");
            } catch (e) {
              Alert.alert('Oops', 'Invalid credentials');
            }
               setLoadingBiometrics(false);
          }})
          .catch(e => {
              Alert.alert('Authentication Failed', 'Biometric authentication failed. Please try again.');
          });
        }
      })
    }
  
    const onSignInPressed = async data => {
      if (loading) {
        return;
      }
  
      setLoading(true);
      try {
        const response = await Auth.signIn(data.username, data.password);
        console.log(response);
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
      setLoading(false);
        //console.warn(data);
        // navigation.navigate('Home');
        // console.warn(username);
        // console.warn(password);
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
        // console.warn('Forgot Password Pressed');
    };

    const onSignUpPressed = () => {
        navigation.navigate('SignUp');
        // console.warn('Redirect to Sign Up Screen');
    };
    
    const onBiometricsPressed = () => {
        handleAuth();
        // console.warn('Biometrics Pressed');
    };
    
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
             <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
        />
        {/* <CustomInput placeholder="Username" value={username} setValue={setUserName} secureTextEntry={false}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/> */}
        
        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry={true}
          control={control}
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be minimum 8 characters long',
            },
          }}
         />

        <CustomButton  text={loading ? 'Loading...' : 'Sign In'} onPress={handleSubmit(onSignInPressed)}/>

        <CustomButton text={loadingBiometrics ? 'Loading Biometrics Details...' : "Sign In with Biometrics"} onPress={onBiometricsPressed} type="SECONDARY"/>

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>

        {/* <SocialSignInButtons/>         */}

        <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY"/>
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
      paddingTop: 100,
    },
    logo: {
      width: '70%',
      maxWidth: 300,
      maxHeight: 200,
    },
  });

export default SignInScreen;
