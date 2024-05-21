
import React, { useState } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, ScrollView, TextInput} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const SignInScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    
    const { control, handleSubmit, formState: {errors} } = useForm();

    console.log(errors);

    const onSignInPressed = data => {
        console.warn(data);
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

        <CustomButton text="Sign In" onPress={handleSubmit(onSignInPressed)}/>

        <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY"/>

        <SocialSignInButtons/>        

        <CustomButton text="Don't have an account? Create one" onPress={onSignUpPressed} type="TERTIARY"/>
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
      maxWidth: 300,
      maxHeight: 200,
    },
  });

export default SignInScreen;
