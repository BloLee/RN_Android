import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; 
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import App1 from "../App1";
import HomePage from "./home"; 
/**
 * 全局路由
 */
//默认头部样式
_defaultNavigationOptions = (navigation, title, option = {}) => {
  // const hasHeaderRightPages = ['Home', 'Game', 'Wallet', 'Active', 'Me', 'HG', 'GameNavigation', 'KLSF', 'KS', 'LHC', 'PCDD', 'PKS', 'SSC', 'KLSF', 'KLSF', 'KLSF', 'KLSF', 'KLSF', 'KLSF', 'KLSF', 'KLSF', 'KLSF'];
  let headerRight = <View/>;
  // if (hasHeaderRightPages.indexOf(navigation.state.routeName) === -1) {
  //     headerRight = <View/>;
  // }
  let defaultOption = {
      // headerRight: headerRight,
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
      // header: null
  };
  option = Object.assign(defaultOption, option);
  // if (Platform.OS !== 'ios') {
  //     option.headerStyle.paddingTop = StatusBar.currentHeight;
  //     option.headerStyle.height = 75;
  // }
  if (headerRight) {
      option.headerRight = headerRight;
  }
  if (title) {
      option.title = title;
  }
  return option;
}
const getRouter = createStackNavigator({
    App1:{
      screen:App1,
      navigationOptions: ({navigation}) => {
        return _defaultNavigationOptions(navigation,"兑换激活码")
      }
    },       
    HomePage:{
      screen:HomePage,
      navigationOptions: ({navigation}) => {
        return _defaultNavigationOptions(navigation,"首页")
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
  }))
  },
);
export default createAppContainer(getRouter);
