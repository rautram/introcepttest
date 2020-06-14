import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AppSettings from '../../utils/AppSettings';

const SimpleInput = (props) => {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>{props.title}</Text>
      <Icon name="md-arrow-dropdown" size={20} color={AppSettings.grayColor} />
    </View>
  );
};

export default SimpleInput;

const styles = StyleSheet.create({
  main: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: AppSettings.black,
    borderRadius: 10,
  },
  title: {
    fontFamily: AppSettings.fontFamily,
    fontSize: 16,
    color: AppSettings.grayColor,
  },
});
