import React,{Component} from "react";
import { FlatList,View,Text,TextInput,Button,TouchableOpacity,ActivityIndicator,StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { regist } from "../../until/Adres";
import ToastLoad from "../../until/TostLoad"; 
import NavigationService from "../../until/NavigationService";
export default class Register extends Component{
  constructor(props){
    super(props)
    this.state = {
      endBtn:false,
      params:{
        username:"",
        password:"",
        repassword:"",
      }
    }
  }
  _login = async () => { 
    const { params } = this.state;
    // console.log(params)
    if( !params.username || params.username.length < 2 ){
      ToastLoad.Toast.show("用户名最少3位");
      return;
    } 
    if( !params.password || params.password.length < 6){
      ToastLoad.Toast.show("密码至少 6 位");
      return;
    }
    if( params.password != params.repassword ){
      ToastLoad.Toast.show("确认密码与密码不符");
      return;
    }
    this.setState({endBtn: true});
    let res = await regist(params); 
    // console.log(res)
    if( res ){ 
      this.setState({endBtn: false});
      if( res.errorCode != 0 ){
        ToastLoad.Toast.show(res.errorMsg);
        return; 
      } 
      // NavigationService.navigate("HomePage");
      NavigationService.goBack();
    } 
  }
  _checkForm = (data) => {
    this.setState(Object.assign(this.state.params, data));
  }
  render () {
    return (
      <View style={styles.Login_box}>
        <View style={styles.Logo}>
          {/* android1 */}
          <MaterialCommunityIcons name="android-head" size={80} color="#3498db" /> 
        </View> 
        <View>
          <TextInput placeholder="请输入账号" onChangeText={(text) => this._checkForm({username: text})}
          style={styles.Input} />
          <TextInput placeholder="请输入密码" secureTextEntry={true} textContentType={'password'} onChangeText={(text) => this._checkForm({password: text})}
          style={styles.Input} />
          <TextInput placeholder="请确认密码" secureTextEntry={true} textContentType={'password'} onChangeText={(text) => this._checkForm({repassword: text})}
          style={styles.Input}  />
          <TouchableOpacity onPress={() => this._login() } style={styles.btnText}>
            {
              this.state.endBtn ?
              <ActivityIndicator size={'small'} color={"#fff"} animating={true} style={{width:20,height:20,marginRight:10}} /> : null
            } 
            <Text style={styles.btnText_text}>注册</Text>
          </TouchableOpacity>   
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  Login_box:{ flex:1, padding:25, },
  Logo:{ padding:15, justifyContent:'center', alignItems:'center', marginBottom:10,},
  Input:{ borderStyle:"solid", borderWidth:1, borderColor:"#adadad", borderRadius:3, textAlign: "left",fontSize: 15,
    height:40, paddingVertical:0, paddingHorizontal:10, marginBottom:20,
  },
  btnText:{ flexDirection:'row', justifyContent:'center', paddingVertical:10, backgroundColor:'#3498db', borderRadius:3,},
  btnText_text:{ fontSize:16, textAlign:'center', color:"#fff", alignItems:"center", },
  flex_center:{ flexDirection:'row', alignItems:'center', },
  flex_1:{ flex:1, },
  regsiter_txt:{ fontSize:16, color:'#3498db', marginTop:15, },

})