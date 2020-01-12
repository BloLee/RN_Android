import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button,TouchableOpacity } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import CustomTabBar from "../components/CustomTabBar";
// import ViewPager from '@react-native-community/viewpager';
import { productTree,productList } from "../../until/Adres";
import ProductList from "./productList";
import FlatListAll from "../components/FlatListAll";
export default class ProductPage extends Component{
  static navigationOptions = ({ navigation }) => {
    // title: navigation.getParam('count'),
    return {
      header:null,
    }
  };
  constructor(props){
    super(props)
    this.state = {
      headTab:[], 
    }
  }
  UNSAFE_componentWillMount(){
    this.getTabName();
  }
  //获取 项目 tab
  getTabName = async () => {
    let res = await productTree();
    if( res.errorCode === 0 ){
      this.setState({headTab:res.data})
    }
  }
  getData = async () => {
    let res = await productList();
    console.log(res);
  }
  //获取列表数据
  getData(){ 

  } 
  //刷新当前数据
  onRefresh(){
    console.log("---------刷新--------")
  }
  //滑动切换展示获取 id
  onChangeTab(obj){
    let { headTab } = this.state;
    if( headTab.length > 0 ){
      console.log(headTab[obj.i].id)
    }
    
  }
  render () {
    const { headTab } = this.state;
    console.log(headTab)
    return ( 
      <SafeAreaView style={{flex:1,}}>
        <StatusBar
          hidden={false}
          translucent={ true } 
          backgroundColor={'blue'} 
          barStyle={'blue'}
        />
        <ScrollableTabView
          scrollWithoutAnimation={true}
          renderTabBar={() => (<ScrollableTabBar someProp={'here'}  backgroundColor='#3498db' />)}
          tabBarTextStyle={{fontSize:16}}
          tabBarInactiveTextColor="#fff"
          tabBarActiveTextColor='#fff'  
          tabBarUnderlineStyle ={{ backgroundColor:'#fff', bottom:2, }}
          // onChangeTab={(obj) => { this.onChangeTab(obj) }}
        >
              {
                headTab.map((item,index) => (
                  // <Text tabLabel={item.name} key={index} id={item.id}>{item.name}</Text>
                  <FlatListAll {...this.props} 
                    tabLabel={item.name} key={index} id={item.id}
                    adres={'product'}
                    onRefresh = { this.onRefresh.bind(this) }
                    dataSource = {[]}
                  />
                ))
              }
          
        </ScrollableTabView> 
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  
})