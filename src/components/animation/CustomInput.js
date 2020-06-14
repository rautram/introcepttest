import React, {useRef} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import {interpolateColors} from './colorinterpolate';
import AppSettings from '../../utils/AppSettings';

const {Value, Extrapolate, interpolate} = Animated;

const CustomInput = (props) => {
  const top = new Value(13);
  const topRef = useRef(top);
  const color = interpolateColors(
    topRef.current,
    [-12, 13],
    [AppSettings.primaryColor, '#A5A5A5'],
  );
  const width = interpolate(topRef.current, {
    inputRange: [-20, 12],
    outputRange: [2, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  function startAnim() {
    Animated.timing(topRef.current, {
      toValue: -12,
      duration: 100,
      easing: Easing.linear,
    }).start();
  }
  function reverseAnim() {
    if (props.value == '') {
      Animated.timing(topRef.current, {
        toValue: 13,
        duration: 100,
        easing: Easing.linear,
      }).start();
    }
  }

  return (
    <Animated.View
      style={[
        styles.box,
        {
          borderWidth: width,
          borderColor: color,
        },
      ]}>
      <Animated.Text
        style={[
          styles.placeHolder,
          {
            top: topRef.current,
            fontSize: 16,
            color: color,
            alignSelf: 'flex-end',
          },
        ]}>
        {props.title}
      </Animated.Text>
      <TextInput
        {...props}
        placeholder=""
        onFocus={startAnim}
        fontSize={16}
        fontFamily={AppSettings.fontFamily}
        onBlur={reverseAnim}
        underlineColorAndroid="transparent"
        textAlignVertical="bottom"
        padding={0}
      />
    </Animated.View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  base: {
    borderTopWidth: 0.5,
  },
  placeHolder: {
    position: 'absolute',
    left: 15,
    fontSize: 16,
    fontFamily: AppSettings.primaryFont,
    backgroundColor: AppSettings.white,
    paddingHorizontal: 5,
  },
  box: {
    borderWidth: 0.5,
    borderColor: AppSettings.black,
    padding: 10,
    borderRadius: 10,
  },
});
