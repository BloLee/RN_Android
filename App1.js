/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Adres from "./until/Adres";
import ToastLoad from "./until/TostLoad";
import { useNavigation } from '@react-navigation/native'; 
// dologin = () => async () => {
//   alert("12121")
//   let res = await getAuthorization();
//   console.log(res)
// } 
async function dologin(){
  // alert("!231231231") 
  const res = await Adres.getAuthorization();
  console.log("1231231231231231------");
  
  console.log(JSON.stringify(res) +"--------------------------")
  if( res ){
    ToastLoad.Loading.hidden();
  } 
} 
function toast(type) {
  switch (type) {
    case 'show':
      ToastLoad.Toast.show('这是show类型')
      break
    case 'showLong':
      ToastLoad.Toast.showLong('这是showLong类型')
      break
    case 'showSuccess':
      ToastLoad.Toast.showSuccess('这是showSuccess类型')
      break
    case 'showSuccessCallback':
      ToastLoad.Toast.showSuccess('这是showSuccessCallback类型', () => alert('回调成功！'))
      break
    case 'showLongSuccess':
      ToastLoad.Toast.showLongSuccess('这是showLongSuccess类型')
      break
    case 'showLongSuccessCallback':
      ToastLoad.Toast.showLongSuccess('这是showLongSuccessCallback类型', () => alert('回调成功！'))
      break
    case 'showWarning':
      ToastLoad.Toast.showWarning('这是showWarning类型')
      break
    case 'showError':
      ToastLoad.Toast.showError('这是showError类型')
      break
  }
}

function hud(type) {
 if (type === 'show') {
  ToastLoad.Loading.show()
   setTimeout(function () {
    ToastLoad.Loading.hidden()
   }, 5000)
 } else {
  ToastLoad.Loading.hidden()
 }
} 
function onPress1(navigation){
  navigation.navigate('Details')
}
export default class App1 extends React.Component{
  constructor(props){
      super(props)
  }
  render() {
    return (
      <View>
        <StatusBar
          hidden={false}
          translucent={ true } 
          backgroundColor={'blue'} 
          barStyle={'blue'}
        />
        <SafeAreaView> 
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <Text onPress={ () => dologin() }>12312312</Text>
              <Text style={styles.welcome}>Toast</Text>
          <TouchableOpacity
            style={styles.text}
            onPress={() => toast('show')}
          >
            <Text>show</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showLong')}
          >
            <Text>showLong</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showSuccess')}
          >
            <Text>showSuccess</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showSuccessCallback')}
          >
            <Text>showSuccess带函数回调</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showLongSuccess')}
          >
            <Text>showLongSuccess</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showLongSuccessCallback')}
          >
            <Text>showLongSuccess带函数回调</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showWarning')}
          >
            <Text>showWarning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  toast('showError')}
          >
            <Text>showError</Text>
          </TouchableOpacity>
          <Text style={styles.welcome}>HUD</Text>
          <TouchableOpacity
            style={styles.text}
            onPress={() =>  hud('show')}
          >
            <Text>showHud</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.text}
            onPress={() =>  hud('hidden')}
          >
            <Text>hiddenHud</Text>
          </TouchableOpacity>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle} onPress={()=> this.props.navigation.navigate("HomePage") }>跳转页面</Text>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change this
                  screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
}); 
