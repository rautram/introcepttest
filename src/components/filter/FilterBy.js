import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import country from '../../data/country';
import brands from '../../data/brands';
import SimpleInput from '../form/SimpleInput';
import {RectButton} from 'react-native-gesture-handler';
import AppSettings from '../../utils/AppSettings';

const FilterBy = (props) => {
  return (
    <View>
      <Text style={styles.text}>Filter By:</Text>
      <View style={styles.main}>
        <RectButton
          onPress={() => props.displayOverlay(country, 1)}
          style={{flex: 1}}>
          <SimpleInput
            title={props.country === '' ? 'Country' : props.country}
          />
        </RectButton>
        <View style={{width: 15}} />
        <RectButton
          onPress={() => props.displayOverlay(brands, 2)}
          style={{flex: 1}}>
          <SimpleInput title={props.brand === '' ? 'Brand' : props.brand} />
        </RectButton>
        <View style={{width: 15}} />
        <RectButton style={{flex: 0.5}} onPress={() => props.clear()}>
          <View style={styles.box}>
            <Text style={{fonSize: 18}}>CLEAR</Text>
          </View>
        </RectButton>
      </View>
    </View>
  );
};

export default FilterBy;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: AppSettings.fontFamily,
    fontSize: AppSettings.primaryFontSize,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: AppSettings.grayColor,
    borderWidth: 1,
    paddingVertical: 15,
    borderRadius: 10,
  },
});
