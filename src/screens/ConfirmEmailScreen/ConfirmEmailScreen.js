import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Logo from '../../../assets/images/Logo_2.png';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });
  const [loading, setLoading] = useState(false);
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  
  const username = watch('username');

  const onConfirmPress = async data => {
    if (loading) {
      return;
    }

    setLoading(true); 
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
    // console.warn(data);
  };
  
  const onSignInPress = () => {
    navigation.navigate('SignIn');
    // console.warn('Sign In Screen');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    // console.warn('onResendPress');
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
          control={control}
          rules={{required: 'Username is required'}}
        />

        <CustomInput
          control={control}
          name="code"
          placeholder="Enter your confirmation code"
          rules={{required: 'Confirmation code is required'}}
        />

        <CustomButton text={loading ? <ActivityIndicator size="small" color="#ffffff"/> : 'Confirm'}onPress={handleSubmit(onConfirmPress)}/>

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
    paddingTop: 150,
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

export default ConfirmEmailScreen;