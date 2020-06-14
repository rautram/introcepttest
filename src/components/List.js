import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import AppSettings from '../utils/AppSettings';
import NoList from './NoList';

const List = ({data}) => {
  return (
    <View style={{flex: 1}}>
      {data.length > 0 ? (
        <View style={{flex: 1}}>
          <View
            style={[
              styles.item,
              {borderBottomColor: AppSettings.primaryColor},
            ]}>
            <Text
              style={[
                styles.itemText,
                {color: AppSettings.primaryColor, flex: 1},
              ]}>
              Name
            </Text>
            <View style={{width: 5}} />
            <Text
              style={[
                styles.itemText,
                {color: AppSettings.primaryColor, flex: 1},
              ]}>
              Country
            </Text>
            <View style={{width: 5}} />
            <Text
              style={[
                styles.itemText,
                {color: AppSettings.primaryColor, flex: 1},
              ]}>
              Number
            </Text>
            <View style={{width: 5}} />
            <Text
              style={[
                styles.itemText,
                {color: AppSettings.primaryColor, flex: 1},
              ]}>
              Brand
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <View style={styles.item}>
                  <View style={{flex: 1}}>
                    <Text style={styles.itemText}>{item.name}</Text>
                  </View>
                  <View style={{width: 5}} />
                  <View style={{flex: 1}}>
                    <Text style={styles.itemText}>{item.country}</Text>
                  </View>
                  <View style={{width: 5}} />
                  <View style={{flex: 1}}>
                    <Text style={styles.itemText}>{item.number}</Text>
                  </View>
                  <View style={{width: 5}} />
                  <View style={{flex: 1}}>
                    <Text style={styles.itemText}>{item.brand}</Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <NoList />
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: AppSettings.grayColor,
  },
  itemText: {
    fontFamily: AppSettings.fontFamily,
    fontSize: 16,
    color: AppSettings.grayColor,
    overflow: 'scroll',
  },
});
