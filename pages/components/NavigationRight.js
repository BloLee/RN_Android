import React,{Component} from "react";
import { View,Text,StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; 
export default class NavigationRight extends Component {
  constructor(props){
    super(props) 
  }
  _headerRight(){ 
    const {itemInfo,push} = this.props;  
    switch(itemInfo.name){
      case "home":
        return (
          <Text onPress={ () => push("Login")}>
            <AntDesign name="search1" size={20} color="#fff" /> 
          </Text>
        )
      break;
    }
  }
  render () { 
    return (
      <View style={styles.HeaderBox}>
        {this._headerRight()}
      </View>
    )
  }
} 
const styles = StyleSheet.create({
  HeaderBox:{ paddingRight:10, alignItems:'center', }
})