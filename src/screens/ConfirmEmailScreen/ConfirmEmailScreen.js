import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/Logo_2.png';
import {useNavigation} from '@react-navigation/native';

const ConfirmEmailScreen = () => {
  const [code, setCode] = useState('');

  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  const onConfirmPress = () => {
    navigation.navigate('Home');
    // console.warn('Go to Home Screen');
  };
  
  const onSignInPress = () => {
    navigation.navigate('SignIn');
    // console.warn('Sign In Screen');
  };

  const onResendPress = async () => {
    console.warn('onResendPress');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
        />
        <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="username"
          placeholder="Username"
        />

        <CustomInput
          value={code}
          setValue={setCode}
          name="code"
          placeholder="Enter your confirmation code"
        />

        <CustomButton text="Confirm" onPress={onConfirmPress}/>

        <CustomButton
          text="Resend code"
          onPress={onResendPress}
          type="SECONDARY"
        />

        <CustomButton
          text="Back to Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
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

export default ConfirmEmailScreen;