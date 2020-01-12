import React,{Component} from "react";
import { View,ProgressViewIOS,StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
class DetailLink extends Component{
  constructor(props){
    super(props)
    this.state = {
      load:true,
      progress: 0,
    } 
  }  
  _onLoad(){
    this.setState({
      load:false, 
    })
  }
  render() {
    const { params } = this.props.navigation.state;
    console.log(params); 
    return (
        <View style={styles.container}>
          <View style={styles.titleBar}/>

          {/* {this.state.progress !== 1 && <ProgressViewIOS
              //这是进度条颜色
              progressTintColor="red"
              progress={this.state.progress}/>} */}

          <WebView
              source={{uri: 'https://www.jianshu.com/u/df38c1b1414a'}}
              renderLoading={true}
              //设置进度 progress值为0～1
              // onLoadProgress={({nativeEvent}) => this.setState(
              //     {progress: nativeEvent.progress}
              // )}
          />
        </View>  
      // <WebView
      //   source={{uri: params.url}} 
      //   onLoad={ ()=> this._onLoad() }
      // />
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