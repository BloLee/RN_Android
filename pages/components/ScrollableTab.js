import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button,TouchableOpacity } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
import global from "../../until/global";
import FlatListAll from "../components/FlatListAll";
const _headTab = [
  {name:"广场",adres:'square'},
  {name:"体系",adres:'system'},
  {name:"导航",adres:'navigation'}
]
export default class ScrollableTab extends Component {
  constructor(props){
    super(props)
    this.state ={
      headTab:[],
      name:'',
    }
  }
  componentWillMount() {
    const {name} = this.props;
    let _headTabList =  name === "square" ? _headTab : [];
    this.setState({name:name,headTab:_headTabList},()=>{

    });
    // console.log(this.props)
  }
  render () {
    const { headTab } = this.state;
    console.log(headTab)
    return ( 
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
            <FlatListAll
              tabLabel={item.name} key={index} id={item.id}
              adres={item.adres}
            />
          ))
        }
      </ScrollableTabView>
    )
  }
}