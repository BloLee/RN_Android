import React, {PureComponent} from 'react'
import {Image,StyleSheet,Text,Dimensions} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
//这是一个 tab切换的 导航
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack'; 
import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs'; 
import HomePage from "../pages/home"; 
import ProductPage from "../pages/product/index";  //项目
import SquarePage from "../pages/square/index";   //广场
import PublicPage from "../pages/public/index";   //公众号
import MyPage from "../pages/My/index";           //我的 
import MaterialTopTabNavigator from "./MaterialTopTabNav";
_defaultNavigationOptions = (navigation, title, option = {}) => {
  const hasHeaderRightPages = ['HomePage','Login',"Register"];
  let headerRight = "";
  // .routes[navigation.state.index]
  console.log(navigation.state)
  if (hasHeaderRightPages.indexOf(navigation.state.routeName) === -1) {
      headerRight = <View/>;
  }
  let titleAlign = "left"; 
  if( hasHeaderRightPages.indexOf(navigation.state.routeName) === -1 ){
    titleAlign= "center";
  }
  let defaultOption = {
      // headerRight: headerRight,
      headerStyle: {
          backgroundColor: "#3498db",
          borderBottomWidth: 0,
          shadowOpacity: 0,
          flex: 1,
          // alignItems: "center",
          // flexDirection: "row",
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          elevation: 0, 
          // paddingTop:20
      },
      headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
          zIndex: 1,
          flex: 1,
          fontSize:18,
          textAlign: titleAlign, 
      }, 
      headerTintColor: "#fff",
      animationEnabled: true,
      headerBackTitle: "null",
      // header: null
  };
  option = Object.assign(defaultOption, option);
  if (Platform.OS !== 'ios') {
      option.headerStyle.paddingTop = StatusBar.currentHeight;
      option.headerStyle.height = 75;
  }
  if (headerRight) {
      option.headerRight = headerRight;
  }
  if (title) { 
    const { params } = navigation.state; 
    let _title = title;
    if( params && params.title ){
      _title = params.title;
      let _title = global.HtmlMacth(params.title); 
      // console.log(_title)
    }   
    option.title = _title;
  }
  return option;
} 
// const Home = createStackNavigator({
//   HomePage:HomePage,
//   navigationOptions: ({navigation}) => { 
//     return _defaultNavigationOptions(navigation,"首页")
//   }
// },{
//   initialRouteName:"HomePage"
// }) 

const TabRootNavigator = createBottomTabNavigator({
  home:{
    screen:HomePage,
    navigationOptions: { 
      header:null,
      // return _defaultNavigationOptions(navigation,"登录")
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'首页',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'home' : 'home'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('home', {refresh: true});
      }
    }
    // navigationOptions:{  
    //   gesturesEnabled:true,
    //   tabBarPosition: 'bottom',
    //   tabBarLabel:'首页',
    //   showLabel: false,
    //   tabBarIcon: ({tintColor, focused}) => (
    //     <AntDesign name={focused ? 'home' : 'home'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
    //   ),
    //   tabBarOnPress: ({navigation}) => {
    //     navigation.navigate('home', {refresh: true});
    //   }
    // }
  },
  Product:{
    screen:ProductPage,
    navigationOptions:{
      header:null,
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'项目',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'sharealt' : 'sharealt'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('Product', {refresh: true});
      }
    }
  },
  Square:{
    screen:SquarePage,
    navigationOptions:{
      header:null,
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'广场',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'codepen' : 'codepen'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('Square', {refresh: true});
      }
    }
  },
  Public:{
    screen:PublicPage,
    navigationOptions:{
      header:null,
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'公众号',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'wechat' : 'wechat'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('Public', {refresh: true});
      }
    }
  },
  defult:{
    screen:MaterialTopTabNavigator, 
    navigationOptions:{
      header:null,
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'默认',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'user' : 'user'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('defult', {refresh: true});
      }
    }
  },
  My:{
    screen:MyPage,
    navigationOptions:{
      header:null,
      gesturesEnabled:true,
      tabBarPosition: 'bottom',
      tabBarLabel:'我的',
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
        <AntDesign name={focused ? 'user' : 'user'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('My', {refresh: true});
      }
    }
  },
},{
  //这里设置的是一般情况下Tabbar共同的属性
  tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
  swipeEnabled: true, // 是否允许在标签之间进行滑动。
  animationEnabled: true, // 是否在更改标签时显示动画。
  lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
  initialRouteName: 'Square', // 设置默认的页面组件
  backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions: {
    activeTintColor: '#3498db',
    labelStyle: {
      fontSize: 14,
    },
    style: {
      borderTopWidth: 1,
      borderTopColor: "#f2f4f6",
      backgroundColor: "#fff",
      elevation: 30
    }, 
  }
  // initialRouteName: 'defult',
  // swipeEnabled: true, // 是否允许滑动切换tabs 默认是true
  // animationEnabled: false, // 点击tab label切换tab时是否开启动画 默认为true
  // // order: ['Settings', 'Home'],
  // tabBarPosition: 'bottom', // tab bar显示的位置，默认是 'top'
  // tabBarOptions: {
  //   activeTintColor: 'orange',
  //   inactiveTintColor: 'grey',
  //   style: {
  //     backgroundColor: '#f2f2f2',
  //     borderTopWidth: 0.5,
  //     borderTopColor: 'grey',
  //   },
  //   indicatorStyle: {
  //     height: 0, // 不显示indicator
  //   },
  //   showIcon: true, // 是否显示图标, 默认为false
  //   showLabel: false, // 是否显示label
  // },
})
export default TabRootNavigator;