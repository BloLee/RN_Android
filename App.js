/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'; 
import TabBar from "./router/router";  
import { Provider } from 'react-redux';
import store from './redux/index'
// export default getRouter;
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      color: '#f4511E'
    };
    console.log(store);
    
  }
  render() {
    return (
      // 将store作为prop传入，即可使应用中的所有组件使用store 
      <Provider store={store}>
        <TabBar screenProps={{
          themeColor: this.state.color
        }} />
      </Provider>
    )
  }
}
