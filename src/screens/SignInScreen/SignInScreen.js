
import React, { useState } from 'react';
import { View, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSignInPressed = () => {
        navigation.navigate('Home');
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
        <CustomInput placeholder="Username" value={username} setValue={setUserName} secureTextEntry={false}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>

        <CustomButton text="Sign In" onPress={onSignInPressed}/>

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
