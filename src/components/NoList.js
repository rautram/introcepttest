import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppSettings from '../utils/AppSettings';

const NoList = () => {
  return (
    <View style={styles.main}>
      <View style={styles.box}>
        <Icon name="done" size={50} color={AppSettings.primaryColor} />
      </View>
      <View style={{height: 20}} />
      <Text style={styles.title}>No List available yet!!</Text>
    </View>
  );
};

export default NoList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    borderColor: AppSettings.primaryColor,
    borderWidth: 5,
  },
  title: {
    fontFamily: AppSettings.fontFamily,
    fontSize: AppSettings.primaryFontSize,
    color: AppSettings.primaryColor,
  },
});
