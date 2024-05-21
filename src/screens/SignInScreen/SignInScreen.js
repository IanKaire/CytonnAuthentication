
import React, { useState } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, ScrollView, TextInput} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';

const SignInScreen = () => {

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    
    const { control, handleSubmit } = useForm();

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
        
        <Controller
         control={control}
         name='username'
         render={({field: {value, onChange, onBlur}}) => (
        <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Username"
            secureTextEntry={false}
         />
        )}
        />
         <Controller
         control={control}
         name='password'
         render={({field: {value, onChange, onBlur}}) => (
        <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Password"
            secureTextEntry={true}
         />
        )}
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
