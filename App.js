import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store from './Store';
import NetInfo from '@react-native-community/netinfo';
import Dialog from 'react-native-dialog';
import {View, Text} from 'react-native';
import Home from './pages/Home';
// import PropTypes from 'prop-types';
const App = () => {
  // const [isConnected, setIsConnected] = useState(false);
  // const [isInternetReachable, setIsInternetReacchable] = useState(false);
  // const checkInternet = () => {
  //   NetInfo.fetch().then(state => {
  //     console.log('Connection type', state.type);
  //     console.log('Is connected?', state.isConnected);
  //     //setIsConnected(state.isConnected);
  //     setIsInternetReacchable(state.isInternetReachable);
  //   });
  // };
  useEffect(() => {
    // checkInternet();
  });
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
  // if (isInternetReachable) {
  //   return (
  //     <Provider store={store}>
  //       <Text>Hello this is app</Text>
  //       {/* <Navigation /> */}
  //     </Provider>
  //   );
  // } else {
  //   return (
  //     <View>
  //       <Dialog.Container>
  //         <Dialog.Title>No Internet connection</Dialog.Title>
  //         <Dialog.Description>
  //           Check your internet connection!
  //         </Dialog.Description>
  //       </Dialog.Container>
  //     </View>
  //   );
  // }
};

export default App;
