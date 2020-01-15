import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button } from "react-native";
import PropTypes from 'prop-types';
export default class StatusBarHead extends Component {
  // 构造
  constructor(props) {
    super(props);
  }
  static propTypes = {
    backgroundColor: PropTypes.string,
    barStyle: PropTypes.string
  };
  static defaultProps = {};
  render () {
    return (
      // {/* barStyle 设置状态栏文本的颜色 dark-content = 黑色  light-content = 白色*/}
      //   {/* translucent 指定状态栏是否透明 true = 背景透明 Android */}
      // <StatusBar style={{backgroundColor: this.props.backgroundColor}} hidden={false} translucent={ true } backgroundColor={'blue'} barStyle={'blue'} />
      <StatusBar
        animated={true}
        barStyle={this.props.barStyle ? this.props.barStyle : "dark-content"}    //light-content
        backgroundColor={ this.props.backgroundColor? this.props.backgroundColor :"transparent" } 
        translucent={true}
        showHideTransition={'fade'}
        networkActivityIndicatorVisible={true}
      />
    )
  }
}