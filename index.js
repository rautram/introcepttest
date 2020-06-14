/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {PersistGate} from 'redux-persist/lib/integration/react';
import FSStorage from 'redux-persist-fs-storage';
import reducers from './src/redux/reducers';
import FormScreen from './src/screens/FormScreen';

console.disableYellowBox = true;

const middleware = [thunk];

const persistConfig = {
  key: 'root',
  storage: FSStorage(),
  keyPrefix: '',
  timeout: 0,
  stateReconciler: autoMergeLevel2,
};

const preducer = persistReducer(persistConfig, reducers);
const store = createStore(preducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

function ReduxProvider(Component) {
  return (props) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent('main', () =>
  gestureHandlerRootHOC(ReduxProvider(App)),
);
AppRegistry.registerComponent('form', () =>
  gestureHandlerRootHOC(ReduxProvider(FormScreen)),
);
