import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

const CustomInput = ({
  control,
  name,
  placeholder,
  secureTextEntry = false,
}) => {
  return (
          <View
            style={
              styles.container}>
               <Controller
                  control={control}
                  name={name}
                  render={({field: {value, onChange, onBlur}}) => (
                      <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder={placeholder}
                          style={styles.input}
                          secureTextEntry={secureTextEntry}
                      />
                      )}
              />
          </View>
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
  input: {},
});

export default CustomInput;