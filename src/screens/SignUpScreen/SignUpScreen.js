
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, Alert, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo_2.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const {control, handleSubmit, watch} = useForm();
    const pwd = watch('password');
    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const onRegisterPressed = async data => {
      if (loading) {
        return;
      }
  
      setLoading(true);

     
      try {
        const {username, password, email, name} = data;
        await Auth.signUp({
          username,
          password,
          attributes: {email, name, preferred_username: username},
        });
  
        navigation.navigate('ConfirmEmail', {username});
      } catch (e) {
        Alert.alert('Oops', e.message);
      }
        // navigation.navigate('ConfirmEmail');
        // console.warn(username);
        // console.warn(password);
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
        // console.warn('Redirect to Sign In Screen');
    };

    const onTermsOfUsePressed = () => {
        console.warn('Terms Of Use');
    };
    
    const onPrivacyPressed = () => {
        console.warn('Privacy Policy');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
             <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
        />
        <Text style={styles.title}>Create an account</Text>
      
        <CustomInput
          name="name"
          control={control}
          placeholder="Name"
          rules={{
            required: 'Name is required',
            minLength: {
              value: 3,
              message: 'Name should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Name should be max 24 characters long',
            },
          }}
        />

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />
        <CustomInput
          name="password-repeat"
          control={control}
          placeholder="Repeat Password"
          secureTextEntry
          rules={{
            validate: value => value === pwd || 'Password do not match',
          }}
        />

        <CustomButton text={loading ? 'Loading...' : 'Register'} onPress={handleSubmit(onRegisterPressed)}/>

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        {/* <SocialSignInButtons/> */}

        <CustomButton text="Have an account? Sign in" onPress={onSignInPressed} type="TERTIARY"/>
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    root: {
      alignItems: 'center',
      padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 200,
        maxHeight: 100,
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#006A5B',
        margin: 10,
      },
      text: {
        color: 'gray',
        marginVertical: 10,
      },
      link: {
        color: '#FDB075',
      },
  });

export default SignUpScreen;
