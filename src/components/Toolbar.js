import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AppSettings from '../utils/AppSettings';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Activity} from '../nativemodule/ActivityModule';

const Toolbar = (props) => {
  return (
    <View style={styles.main}>
      <BorderlessButton onPress={() => Activity.onBack()}>
        <Icon name="arrow-back" size={30} color={AppSettings.black} />
      </BorderlessButton>
      <Text style={styles.title}>Add Data</Text>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  main: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppSettings.white,
    elevation: 3,
    shadowColor: AppSettings.black,
    shadowOpacity: 0.3,
    paddingHorizontal: 10,
  },
  title: {
    fontFamily: AppSettings.fontFamily,
    fontSize: AppSettings.primaryFontSize,
    marginLeft: 20,
    color: AppSettings.black,
  },
});
