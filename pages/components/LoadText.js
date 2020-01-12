import React,{Component} from "react";
import {View,Text,ActivityIndicator,StyleSheet} from "react-native";
// connect方法的作用：将额外的props传递给组件，并返回新的组件，组件在该过程中不会受到影响
import { connect } from 'react-redux'; 
// import { setPageTitle } from "../../redux/actions";
class LoadText extends Component{
  constructor(props){
    super(props)
    // this.state = {
    //   loadMore:true
    // }
  }
  componentDidMount(){
    let { setPageTitle, loadMore } = this.props; 
  }
  Footer(){
    let { pageTitle, loadMore, loadType } = this.props;
    switch( loadType ){
      case 1:
      case "1":
        //加载中的状态
        return(
          <View style={styles.loadbox}>
            <ActivityIndicator
              size={'small'}
              color={"#3498db"}
              animating={true}
              style={{width:20,height:20}}
            /> 
            <Text style={styles.loadtext}>正在努力加载,请稍后</Text> 
          </View>
        )
      break;
      case 2:
      case "2":
        return(
          <View style={styles.loadbox}> 
            <Text style={styles.loadtrue_text}>--------我是有底线的--------</Text> 
          </View>
        )
      default: 
      break;
    }
  }
  render () {
    // 从props中解构store
    let { pageTitle, loadMore } = this.props; 
    return (
      <View style={{flex:1}}> 
      {
        loadMore ?  <View>{this.Footer()}</View> : null
      } 
      </View>
    )
  }
}
const styles = StyleSheet.create({
  loadbox:{
    flexDirection:'row',alignSelf:'center',alignItems:'center',padding:15 
  },
  loadtext:{ color:"#3498db",fontSize:16,marginLeft:15 },
  loadtrue_text:{ color:'#999',fontSize:16, }
})
export default LoadText;