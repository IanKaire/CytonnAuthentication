import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry = false,
}) => {
  return (        
               <Controller
                  control={control}
                  name={name}
                  rules={rules}
                  render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
                    <>
                    <View style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
                      <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder={placeholder}
                          style={styles.input}
                          secureTextEntry={secureTextEntry}
                          placeholderTextColor='gray' 
                          cursorColor='#006A5B'
                      />
                     </View> 
                     {error && (
                      <Text style={{color: 'red', alignSelf: 'stretch'}}>{error.message || 'Error'}</Text>
                      )}
                      </>
                      )}
              />
      )}
;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FBFC',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
  },
  input: {
    color:"#000000",
  },
});

export default CustomInput;