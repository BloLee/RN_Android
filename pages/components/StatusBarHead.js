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
      <StatusBar style={{backgroundColor: this.props.backgroundColor}} hidden={false} translucent={ true } backgroundColor={'blue'} barStyle={'blue'} />
    )
  }
}