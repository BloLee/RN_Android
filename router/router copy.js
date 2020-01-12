import React,{Component} from 'react';
import { View, Text,StatusBar } from 'react-native';
import { createAppContainer,StackNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationService from "../until/NavigationService";
import global from "../until/global";
import Login from "../pages/components/Login";
import Register from "../pages/components/register";
import App1 from "../App1";
import HomePage from "../pages/home"; 
import DetailLink from "../pages/detail/detailLink";
import MyPage from "../pages/My/index";           //我的
import ProductPage from "../pages/product/index";  //项目
import SquarePage from "../pages/square/index";   //广场
import PublicPage from "../pages/public/index";   //公众号
/**
 * 全局路由
 */
//默认头部样式
_defaultNavigationOptions = (navigation, title, option = {}) => {
  const hasHeaderRightPages = ['HomePage','Login',"Register"];
  let headerRight = "";
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
const GetRouter = createStackNavigator({ 
    TabNavigator:TabNavigator,
    App1:{
      screen:App1,
      navigationOptions: ({navigation}) => {
        return _defaultNavigationOptions(navigation,"兑换激活码")
      }
    },       
    Login:{ 
      screen:Login,
      navigationOptions: ({navigation}) => { 
        return _defaultNavigationOptions(navigation,"登录")
      }
    },
    Register:{ 
      screen:Register,
      navigationOptions: ({navigation}) => { 
        return _defaultNavigationOptions(navigation,"注册")
      }
    },
    HomePage:{
      screen:HomePage,
      navigationOptions: ({navigation}) => {
        return _defaultNavigationOptions(navigation,"首页")
      }
    },
    DetailLink:{
      screen:DetailLink,
      navigationOptions: ({navigation}) => {
        const { params } = navigation.state;
        return _defaultNavigationOptions(navigation,params.title)
      }
    },
  },{
    initialRouteName: "HomePage",
    headerMode: 'float',
    mode: 'card',  
    cardStyle:({backgroundColor:'#fff'}), 
    transitionConfig:(()=>({
      //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
      //适配Android，不过，需要导入动画  
      screenInterpolator: StackViewStyleInterpolator.forHorizontal,
    })),
    navigationOptions:{
      headerStyle: {
          backgroundColor: "#3498db",
          borderBottomWidth: 0,
          shadowOpacity: 0,
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          shadowOffset: {
            height: 0,
          },
          shadowRadius: 0,
          elevation: 0, 
      },
      headerTitleStyle: {
          fontWeight: "bold",
          color: "#fff",
          zIndex: 1,
          flex: 1,
          fontSize:16,
          textAlign: 'left', 
      }, 
      headerTintColor: "#fff",
      animationEnabled: true,
      headerBackTitle: "null",
    }
  },
);
//项目 
const Product = createStackNavigator({
  ProductPage:ProductPage,
},{
  initialRouteName: "ProductPage",
  headerMode: 'float',
  mode: 'card',  
  cardStyle:({backgroundColor:'#fff'}), 
  transitionConfig:(()=>({
    //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
    //适配Android，不过，需要导入动画  
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  })), 
})
//广场 
const Square = createStackNavigator({
  SquarePage:SquarePage,
},{
  initialRouteName: "SquarePage",
  headerMode: 'float',
  mode: 'card',  
  cardStyle:({backgroundColor:'#fff'}), 
  transitionConfig:(()=>({
    //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
    //适配Android，不过，需要导入动画  
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  })), 
})
//公众号 
const Public = createStackNavigator({
  PublicPage:PublicPage,
},{
  initialRouteName: "PublicPage",
  headerMode: 'float',
  mode: 'card',  
  cardStyle:({backgroundColor:'#fff'}), 
  transitionConfig:(()=>({
    //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
    //适配Android，不过，需要导入动画  
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  })), 
})
//我的 
const My = createStackNavigator({
  MyPage:MyPage,
},{
  initialRouteName: "MyPage",
  headerMode: 'float',
  mode: 'card',  
  cardStyle:({backgroundColor:'#fff'}), 
  transitionConfig:(()=>({
    //因为ios 的导航动画默认是从左到右，所以，这里配置一下动画，使用react-navigation已经实现的从左到右的动画，
    //适配Android，不过，需要导入动画  
    screenInterpolator: StackViewStyleInterpolator.forHorizontal,
  })), 
})
const TabNavigator = createBottomTabNavigator({
  //首页
  Home:{ 
    screen:GetRouter,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel:"首页",
      // tabBarLabel: ({tintColor, focused}) => (
      //     <TabBarLabel hasFocused={focused}>首页</TabBarLabel>),
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
          <AntDesign name={focused ? 'home' : 'home'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('HomePage', {refresh: true});
      }
    }
  },
  //项目
  Product:{
    screen:Product,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel:"项目",
      // tabBarLabel: ({tintColor, focused}) => (
      //     <TabBarLabel hasFocused={focused}>项目</TabBarLabel>),
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
          <AntDesign name={focused ? 'sharealt' : 'sharealt'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('ProductPage', {refresh: true});
      }
    }
  },
  //广场
  Square:{
    screen:Square,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel:"广场",
      // tabBarLabel: ({tintColor, focused}) => (
      //     <TabBarLabel hasFocused={focused}>广场</TabBarLabel>),
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
          <AntDesign name={focused ? 'codepen' : 'codepen'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('SquarePage', {refresh: true});
      }
    }
  },
  //公众号
  Public:{
    screen:Public,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel:"公众号",
      // tabBarLabel: ({tintColor, focused}) => (
      //     <TabBarLabel hasFocused={focused}>公众号</TabBarLabel>),
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
          <AntDesign name={focused ? 'wechat' : 'wechat'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('PublicPage', {refresh: true});
      }
    }
  },
  //我的 
  My:{
    screen:My,
    navigationOptions: {
      tabBarPosition: 'bottom',
      tabBarLabel:"我的",
      // tabBarLabel: ({tintColor, focused}) => (
      //     <TabBarLabel hasFocused={focused}>公众号</TabBarLabel>),
      showLabel: false,
      tabBarIcon: ({tintColor, focused}) => (
          <AntDesign name={focused ? 'user' : 'user'} size={22} color={focused ? '#3498db' : 'rgba(0,0,0,0.3)'}/>
      ),
      tabBarOnPress: ({navigation}) => {
        navigation.navigate('MyPage', {refresh: true});
      }
    }
  },
},{
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
})
// 创建以导航器作为根组件的容器
const AppContainer = createAppContainer(TabNavigator);
export default class TabBar extends Component{
  render () {
    return(
      <AppContainer 
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);//设置顶层导航
        }}
      />
    )
  }
}
// export default createAppContainer(GetRouter);
