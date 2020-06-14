import React from 'react';
import {Text, View, StyleSheet, Dimensions, FlatList} from 'react-native';
import AppSettings from '../../utils/AppSettings';
import {RectButton, BorderlessButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

const Selection = (props) => {
  return (
    <View style={styles.main}>
      <View style={{flex: 1, paddingTop: 56}}>
        <FlatList
          data={props.data}
          renderItem={({item}) => {
            return (
              <RectButton
                onPress={() => props.getCountry(item.name)}
                style={styles.item}
                rippleColor={AppSettings.primaryColor}>
                <Text style={styles.title}>{item.name}</Text>
              </RectButton>
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <View style={styles.button}>
        <BorderlessButton
          style={styles.center}
          onPress={() => props.getCountry('')}>
          <Icon name="cross" size={30} color={AppSettings.black} />
        </BorderlessButton>
      </View>
    </View>
  );
};

export default Selection;

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'rgba(0,0,0,0.8)',
    elevation: 8,
  },
  title: {
    fontSize: 30,
    color: AppSettings.white,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    padding: 15,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: width / 2 - 30,
    right: width / 2 - 30,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: AppSettings.white,

    zIndex: 999,
    elevation: 10,
    shadowColor: AppSettings.white,
    shadowOpacity: 0.3,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
