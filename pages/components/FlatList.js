import React,{Component} from "react";
import { FlatList,View,Text,ActivityIndicator,
  RefreshControl,SafeAreaView,StyleSheet, TouchableNativeFeedback,TouchableWithoutFeedback } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationService from "../../until/NavigationService";
import global from "../../until/global";
import Api from "../../until/Adres";
class FlatListPage extends Component{
  constructor(props){
    super(props)
    this.navigation = props.navigation; 
    this.state={ }
    this.onEndReachedCalledDuringMomentum = false;
  }
  //打开详情
  openUrl(item){
    // console.log(item);
    this.navigation.navigate("DetailLink",{title:item.title,url:item.link})
    // NavigationService.navigate("Login",{title:item.title,url:item.link})
  }
  //点击收藏
  collect = async (id) =>{
    console.log(id)
    let res =await Api.collectItem({id:id})
    console.log(res)  
  }
  //生成结构 
  _renderItem( {item} ){
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    // console.log(item); 
    return (
      //
      <TouchableNativeFeedback style={styles.ListTouchable} onPress={() => { this.openUrl(item) }} >
        <View style={styles.ListBox}>
          <View style={styles.ListTopInfoBox}>
            <View style={styles.flex_1}>
              <Text style={styles.author}>{item.author? item.author : item.shareUser}</Text> 
              {
                item.is_top ? <Text style={styles.is_top}>置顶</Text> : null 
              }
              {
                item.fresh ? <Text style={styles.fresh}>新</Text> : null
              }
              {
                item.tags ? 
                <View>
                  {
                  item.tags.map((item,index) => 
                    <Text key={index} style={styles.tags}>{item.name}</Text>
                  ) 
                  }
                </View> : null
              }
            </View>
            <Text style={styles.niceDate}>{item.niceDate}</Text>
          </View>
          <Text style={styles.titleName}>{ global.HtmlMacth(item.title) }</Text>
          <View style={styles.flex_1}> 
            <Text style={[styles.fontsize14,styles.flex_1]}>{item.superChapterName}·{item.chapterName}</Text>
            <Text style={styles.heart} onPress={() => this.collect(item.id)}> 
              {
                item.collect == false ?
                <AntDesign name="hearto" size={15} color="rgb(191, 191, 191)" /> :
                <AntDesign name="heart" size={15} color="#E24234" />
              }
              
            </Text> 
          </View> 
        </View>
      </TouchableNativeFeedback>
    )
  }
  //加载更多
  _onEndReached(){
    // console.log(this.props)
    // if( this.props._onEndReached ){
    //   console.log("123123----------------")
    // }
    // console.log("this.props._onEndReached ----------------")
  }
  render () {
    return (  
      // ItemSeparatorComponent  行与行之间的分割线
      // ListEmptyComponent      列表为空时所渲染的组件
        <FlatList 
          data={this.props.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem.bind(this)}
          style={styles.list} 
          // refreshing={true}
          onMomentumScrollBegin={() => { 
            this.onEndReachedCalledDuringMomentum = true;     
          }}
          onEndReachedThreshold={0.1}
          onEndReached={this._onEndReached}
        /> 
    )
  }
}
const styles = StyleSheet.create({
  list:{ paddingHorizontal:8, backgroundColor:"#f4f4f4",},
  ListTouchable:{ position:"relative" },
  ListBox:{ paddingVertical:10, paddingHorizontal:10, backgroundColor:"#fff", borderRadius:5,
    marginTop:10,
  },
  ListTopInfoBox:{
    flexDirection:'row',
    flex:1, 
    alignItems:'center',
  },
  flex_1:{flex:1,flexDirection:'row',alignItems:'center',},
  author:{ fontSize:13,fontWeight:'500', color:"#999" },
  is_top:{ fontSize:11, borderWidth:1,color:"#E24234",borderColor:"#E24234",
    marginLeft:10,paddingHorizontal:4,
    alignItems:"center", borderRadius:2,textAlign:"center",
  },
  fresh:{
    fontSize:11,
    borderWidth:1,
    borderColor:"#E24234",
    color:"#E24234",
    paddingHorizontal:4,
    marginLeft:10,
    alignItems:"center",
    borderRadius:2,
    textAlign:"center",
  },
  tags:{ fontSize:11, borderWidth:1, borderColor:"#009a61", color:"#009a61",paddingHorizontal:3, marginLeft:10, borderRadius:2 },
  niceDate:{fontSize:12, color:'#999',},
  titleName:{ fontSize:15,marginTop:7, marginBottom:5,},
  fontsize14:{fontSize:13,color:"#999"},
  // heart:{ width:15,height:15, position:"relative", }
  heart:{ position:'absolute', zIndex:10, top:0,right:0, paddingVertical:5, paddingHorizontal:5}

})
export default FlatListPage;