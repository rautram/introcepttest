import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Toolbar from '../components/Toolbar';
import CustomInput from '../components/animation/CustomInput';
import FormComponent from '../components/form/FormComponent';
import AppSettings from '../utils/AppSettings';
import Selection from '../components/common/Selection';

const FormScreen = () => {
  const [overlay, setOverlay] = useState(false);
  const [id, setId] = useState(1);
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  const [brand, setBrand] = useState('');
  function showOverlay(data, id) {
    setOverlay(true);
    setId(id);
    setData(data);
  }
  function hideOverlay() {
    setOverlay(false);
  }
  function getCountry(name) {
    setOverlay(false);
    if (id == 1) {
      setCountry(name);
    } else {
      setBrand(name);
    }
  }
  return (
    <View style={styles.main}>
      {overlay && (
        <Selection
          data={data}
          hideOverlay={hideOverlay}
          getCountry={getCountry}
        />
      )}
      <Toolbar />
      <FormComponent
        showOverlay={showOverlay}
        country={country}
        brand={brand}
      />
    </View>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: AppSettings.white,
  },
});
