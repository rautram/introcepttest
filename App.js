import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CircularButton from './src/components/CircularButton';
import NoList from './src/components/NoList';
import List from './src/components/List';
import Selection from './src/components/common/Selection';
import FilterBy from './src/components/filter/FilterBy';
import {filter} from './src/redux/actions/dataAction';

const App = () => {
  const [data, setData] = useState([]);
  const [isFiltered, setFiltered] = useState(false);
  const [id, setId] = useState(1);
  const [country, setCountry] = useState('');
  const [brand, setBrand] = useState('');
  const [overlay, showOverlay] = useState(false);
  const lists = useSelector((state) => state.data.lists);
  const filteredList = useSelector((state) => state.data.filteredList);
  const dispatch = useDispatch();
  function displayOverlay(data, id) {
    showOverlay(true);
    setData(data);
    setId(id);
  }

  function getCountry(name) {
    showOverlay(false);
    setFiltered(true);
    if (name !== '') {
      if (id === 1) {
        setCountry(name);
        dispatch(filter(name, brand));
      } else {
        setBrand(name);
        dispatch(filter(country, name));
      }
    }
  }

  function clear() {
    setCountry('');
    setBrand('');
    setFiltered(false);
  }

  console.log(filteredList);

  return (
    <View style={{flex: 1}}>
      <FilterBy
        country={country}
        getCountry={getCountry}
        brand={brand}
        displayOverlay={displayOverlay}
        clear={clear}
      />
      {overlay && <Selection data={data} getCountry={getCountry} />}
      <List data={isFiltered ? filteredList : lists} />
      <View style={styles.button}>
        <CircularButton />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
