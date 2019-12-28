import React, {Component} from 'react';
import {View, Text, Platform, StyleSheet,ActivityIndicator,Dimensions} from 'react-native';
import RootToast from 'react-native-root-toast';
import RootSiblings from 'react-native-root-siblings';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
let sibling = undefined
//提示 Toast 组件
const Toast = { 
  toast: null, 
  show: msg => {
    RootToast.show(msg, {
      position: 0,
      duration: 500 
    })
  }, 
  showLong: msg => {
    RootToast.show(msg, {
      position: 0,
      duration: 2000
    })
  }, 
  showSuccess: (msg, options) => {
    let toast = RootToast.show(
      Platform.OS === 'ios' ?
        <View style={styles.container}>
          <Icon name='check' size={50} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View> : msg, {
        duration: 1500,
        position: RootToast.positions.CENTER,
        ...options,
      })
    setTimeout(function () {
      RootToast.hide(toast)
      typeof options === 'function' ? options && options(): null
    }, 2000)
  }, 
  showLongSuccess: (msg, options) => {
    let toast = RootToast.show(
      Platform.OS === 'ios' ?
        <View style={styles.container}>
          <Icon name='check' size={50} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View> : msg, {
        duration: 2000,
        position: RootToast.positions.CENTER,
        ...options,
      })
    setTimeout(function () {
      RootToast.hide(toast)
      typeof options === 'function' ? options && options(): null
    }, 2500)
  }, 
  showWarning: (msg, options) => {
    let toast = RootToast.show(
      Platform.OS === 'ios' ?
        <View style={styles.container}>
          <Icon name='warning' size={40} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View> : msg, {
        duration: RootToast.durations.SHORT,
        position: RootToast.positions.CENTER,
        ...options,
      })
    setTimeout(function () {
      RootToast.hide(toast)
    }, RootToast.durations.SHORT + 500)
  },

  showError: (msg, options) => {
    let toast = RootToast.show(
      Platform.OS === 'ios' ?
        <View style={styles.container}>
          <Icon name='close' size={40} color={'#fff'}/>
          <Text style={styles.message}>{msg}</Text>
        </View> : msg, {
        duration: RootToast.durations.SHORT,
        position: RootToast.positions.CENTER,
        ...options,
      })
    setTimeout(function () {
      RootToast.hide(toast)
    }, RootToast.durations.SHORT + 500)
  }

};
//loading 组件
const Loading = { 
  show: (msg) => {
    sibling = new RootSiblings(
      <View style={styles.maskStyle}>
        <View style={styles.backViewStyle}>
          <ActivityIndicator size="large" color="white" />
          <Text style={styles.Text}>{ msg ? msg : "加載中" }</Text>
        </View>
      </View>
    )
  }, 
  hidden: ()=> {
    // if (sibling instanceof RootSiblings) {
    //   sibling.destroy()
    // }
    sibling.destroy()
  }
};
var styles = StyleSheet.create({
  container: {
    width: 140,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  maskStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  backViewStyle: {
    backgroundColor: '#111',
    width: 120,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  }, 
  Text:{
    fontSize:16,
    color:"#fff",
    marginTop:15,
  }
})

export default {Toast,Loading}