import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button } from "react-native";
import ScrollableTab from "../components/ScrollableTab";
import FlatListAll from "../components/FlatListAll"; 
import StatusBarHead from "../components/StatusBarHead";
import Container from "../components/contanter";
export default class SquarePage extends Component{
  constructor(props){
    super(props)
    this.state = {
      headTab:[], 
    }
  }
  render () {
    return (
      <Container statusBarBackgroundColor={"#3498db"} barStyle={"light-content"} style={{paddingTop:0}}>
        <ScrollableTab name={"square"} />
      </Container>
      // <SafeAreaView style={{flex:1,}}>  
      //   <StatusBarHead />
      //   <ScrollableTab name={"square"} />
      // </SafeAreaView>
    )
  }
}