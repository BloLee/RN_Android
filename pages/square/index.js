import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button } from "react-native";
import ScrollableTab from "../components/ScrollableTab";
import FlatListAll from "../components/FlatListAll"; 
import StatusBarHead from "../components/StatusBarHead";
export default class SquarePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      headTab:[], 
    }
  }
  render () {
    return (
      <SafeAreaView style={{flex:1,}}>  
        <StatusBarHead />
        <ScrollableTab name={"square"} />
      </SafeAreaView>
    )
  }
}