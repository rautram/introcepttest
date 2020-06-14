import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppSettings from '../utils/AppSettings';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Activity} from '../nativemodule/ActivityModule';

const CircularButton = (props) => {
  return (
    <BorderlessButton onPress={() => Activity.gotoForm()}>
      <View style={styles.circle}>
        <Icon name="add" size={30} color={AppSettings.white} />
      </View>
    </BorderlessButton>
  );
};

export default CircularButton;

const styles = StyleSheet.create({
  circle: {
    height: 60,
    width: 60,
    backgroundColor: AppSettings.primaryColor,
    elevation: 8,
    shadowColor: AppSettings.black,
    shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
