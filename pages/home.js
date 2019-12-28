import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,View,Text, } from "react-native";
import Api from "../until/Adres";
import axios from "axios";
import ToastLoad from "../until/TostLoad";
class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      souceList:[],
    }
  }
  //获取列表数据接口
  getData = async (type)  => { 
    let res = await Api.articleTopList();
    let res1 = await Api.articleList();
    if(res && res1){
      let _TopList = res.data;
      let _artList = res1.data.datas
      console.log(_TopList,_artList) 
      const _concatList = _TopList.concat(_artList); 
      this.setState({
        souceList:_concatList,
      })
      console.log(_concatList)
    } 
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
          <Text onPress={()=> { this.getData() }}>121212323232312</Text>
          <View> 
          </View>
        </SafeAreaView>
      </View>
    )
  }
}
export default HomePage;