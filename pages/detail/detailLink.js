import React,{Component} from "react";
import { View,Text,ProgressViewIOS,StyleSheet,Linking } from "react-native";
import { WebView } from 'react-native-webview';
class DetailLink extends Component{
  constructor(props){
    super(props)
    this.state = {
      load:true,
      progress: 0,
    } 
  }   
  renderLoading(e){
    console.log(e)
    return <AntDesign name="search1" size="15" color="#fff" />
  } 
  render() {
    const { params } = this.props.navigation.state; 
    // Linking.openURL("http://gk.link/a/103Ei")
    return (   
      <WebView
        originWhitelist={['*']}    //允许运行本地代码
        originWhitelist={['http://*', 'https://*']}
        source={{uri: params.url}}  
        domStorageEnabled={true}//开启dom存贮
        javaScriptEnabled={true}//开启js
        onMessage={event => { this._onMessage(event) }}
        startInLoadingState 
        mixedContentMode={'always'} 
        onError ={() => this._onError()}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        decelerationRate='normal'
        startInLoadingState={true}
        automaticallyAdjustContentInsets={true}
        // renderLoading={() => {
        //   return <View><Text>这是自定义Loading...</Text></View>
        // }}
      />
    );
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  titleBar: {
      height: 64,
      backgroundColor: '#ffc0cb',
      justifyContent: 'center',
      alignItems: 'center'
  },
}); 
export default DetailLink;