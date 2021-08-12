import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button } from "react-native";
import Container from "../components/contanter";
import {login} from "../../until/Adres";
export default class MyPage extends Component{
  render () {
    return (
      <Container statusBarBackgroundColor={"#3498db"} barStyle={"light-content"} style={{paddingTop:0}}> 
        <View style={{flex:1}}>
          <StatusBar backgroundColor="blue" barStyle="dark-content" /> 
          <View style={[styles.m_head_top,{backgroundColor:"#3498db"}]}>
            <View style={styles.m_user_img}></View>
            <View style={styles.m_user_info}>
              <Text style={styles.m_user_name}>用户名称</Text>
              <View style={{backgroundColor:'red',}}>
                <Text style={styles.m_user_info_dea}>id:用户id</Text>
                <Text style={styles.m_user_info_dea}>排名:用户排名</Text>
              </View>
            </View>
          </View>
          <Text>这是我的主页面</Text>
        </View>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  m_head_top:{ 
    flexDirection:'row',
    paddingHorizontal:10,
    paddingVertical:10,  
    justifyContent:'flex-start',
    alignItems:'center'
  },
  m_user_img:{ 
    backgroundColor:'red',
    width:80,
    height:80,
    borderRadius:50,
    marginRight:15
  },

  m_user_name:{
    fontSize:14,
  },
  m_user_info_dea:{
    fontSize:14,
    paddingRight:10,
  }
})