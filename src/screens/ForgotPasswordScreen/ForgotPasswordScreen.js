import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/Logo_2.png';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

const ForgotPasswordScreen = () => {
  
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const {height} = useWindowDimensions();

  const onSignInPress = () => {
    navigation.navigate('SignIn');
    // console.warn(data);
  };

  const onSendPressed = data => {
    navigation.navigate('ResetPassword');
    console.warn(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
      <Image
                source={Logo}
                style={[styles.logo, {height: height * 0.3}]}
                resizeMode="contain"
        />
        <Text style={styles.title}>Forgot your password?</Text>

        <CustomInput
          name="username"
          placeholder="Username"
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomButton text="Send" onPress={handleSubmit(onSendPressed)}/>

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

export default ForgotPasswordScreen;