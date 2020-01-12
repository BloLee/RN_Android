import React,{Component} from "react";
import { View, Text } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import global from "../../until/global";
import FlatListAll from "../components/FlatListAll";
import Container from "../components/contanter";
export default class SystemItem extends Component{
  render () {
    return (
      // <SafeAreaView style={{flex:1,}}>  
      //   <StatusBarHead />
      //   <ScrollableTab name={"square"} />
      // </SafeAreaView>
      <Container>
        <View>
          <Text>12312312123123</Text>
        </View>
      </Container>
    )
  }
}