import React,{Component} from 'react';
import { View, Text,StatusBar } from 'react-native';
import { createAppContainer,StackNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator, } from 'react-navigation-stack'; 
import { createBottomTabNavigator } from 'react-navigation-tabs';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationService from "../until/NavigationService";
import global from "../until/global";
import NavigationRight from "../pages/components/NavigationRight";
import Login from "../pages/components/Login";
import Register from "../pages/components/register";
import App1 from "../App1";
import HomePage from "../pages/home"; 
import DetailLink from "../pages/detail/detailLink";
import ProductPage from "../pages/product/index";  //项目
import SquarePage from "../pages/square/index";   //广场
import PublicPage from "../pages/public/index";   //公众号
import MyPage from "../pages/My/index";           //我的
import TabRootNavigator from "./tabrouter";
/**
 * 全局路由
 */
//默认头部样式
_defaultNavigationOptions = (navigation, title, option = {}) => {
  const hasHeaderRightPages = ['HomePage','Login',"Register","TabRootNavigator"];
  let headerRight = "";
  // .routes[navigation.state.index]
  console.log(navigation.state)
  let titleAlign = "left"; 
  if (hasHeaderRightPages.indexOf(navigation.state.routeName) === -1) {
    headerRight = <View/>;
    titleAlign= "center";
  }
  if( navigation.state.routeName === "TabRootNavigator" ){
    const _eq = navigation.state.index;
    const _routes = navigation.state.routes;
    const _name = _routes[_eq].routeName;
    switch( _name ){
      case "home":
        title = "首页"
        headerRight = <NavigationRight {...navigation} itemInfo={{name:'home'}} />
      break;
      default:
      break;
    }
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
  TabRootNavigator:{
      screen:TabRootNavigator,
      navigationOptions: ({navigation}) => { 
        return _defaultNavigationOptions(navigation)
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
    DetailLink:{
      screen:DetailLink,
      navigationOptions: ({navigation}) => {
        const { params } = navigation.state;
        return _defaultNavigationOptions(navigation,params.title)
      }
    },
  },{
    // initialRouteName: "TabRootNavigator",
    headerMode: 'float',
    mode: 'card',  
    cardStyle:({backgroundColor:'#f4f4f4'}), 
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
// 创建以导航器作为根组件的容器
const AppContainer = createAppContainer(GetRouter);
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
