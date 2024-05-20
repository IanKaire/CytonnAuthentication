
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';

const SignUpScreen = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const {height} = useWindowDimensions();
    
    const onRegisterPressed = () => {
        console.warn(username);
        console.warn(password);
    };

    const onSignInPressed = () => {
        console.warn('Redirect to Sign In Screen');
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
        <CustomInput placeholder="Username" value={username} setValue={setUserName} secureTextEntry={false}/>
        <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={true}/>
        <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true}/>
        <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>

        <CustomButton text="Register" onPress={onRegisterPressed}/>

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

        <SocialSignInButtons/>

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
        maxWidth: 100,
        maxHeight: 50,
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
