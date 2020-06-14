import React, {useState} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import {useDispatch} from 'react-redux';
import CustomInput from '../animation/CustomInput';
import SimpleInput from './SimpleInput';
import {RectButton} from 'react-native-gesture-handler';
import country from '../../data/country';
import brands from '../../data/brands';
import AppSettings from '../../utils/AppSettings';
import {addData} from '../../redux/actions/dataAction';

const FormComponent = (props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  function submit() {
    if (
      name !== '' &&
      number !== '' &&
      props.country !== '' &&
      props.brand !== ''
    ) {
      if (number.length === 10) {
        const data = {
          id: parseInt((Math.random() * 10) ^ 3) + new Date().toISOString(),
          name: name,
          number: number,
          country: props.country,
          brand: props.brand,
        };
        dispatch(addData(data));
        setName('');
        setNumber('');
        ToastAndroid.show('Data successfully added', ToastAndroid.LONG);
      } else {
        ToastAndroid.show(
          'Phone number must be of 10 digits',
          ToastAndroid.LONG,
        );
      }
    } else {
      ToastAndroid.show('You must fill all the fields', ToastAndroid.LONG);
    }
  }
  return (
    <View style={styles.main}>
      <CustomInput
        value={name}
        onChangeText={(text) => setName(text)}
        title="Name*"
      />
      <View style={{height: 20}} />
      <RectButton onPress={() => props.showOverlay(country, 1)}>
        <SimpleInput title={props.country === '' ? 'Country' : props.country} />
      </RectButton>

      <View style={{height: 20}} />
      <RectButton onPress={() => props.showOverlay(brands, 2)}>
        <SimpleInput title={props.brand === '' ? 'Brand' : props.brand} />
      </RectButton>

      <View style={{height: 20}} />
      <CustomInput
        value={number}
        onChangeText={(text) => setNumber(text)}
        title="Phone Number*"
        keyboardType="number-pad"
      />
      <View style={{height: 20}} />
      <RectButton style={styles.button} onPress={submit}>
        <Text style={styles.buttonText}>ADD</Text>
      </RectButton>
    </View>
  );
};

export default FormComponent;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 15,
    backgroundColor: AppSettings.white,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: AppSettings.primaryColor,
  },
  buttonText: {
    fontFamily: AppSettings.fontFamily,
    fontSize: AppSettings.primaryFontSize,
    color: AppSettings.white,
    fontWeight: 'bold',
  },
});
