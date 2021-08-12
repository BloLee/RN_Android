import React,{Component} from "react";
import { View,Text,FlatList,RefreshControl,
  TouchableNativeFeedback,TouchableOpacity,StyleSheet } from "react-native"; 
import AntDesign from "react-native-vector-icons/AntDesign";
import global from "../../until/global";
import { storeData } from "../../until/until";
import Adres, { productList,user_article,square_tree,square_list,navi_list } from "../../until/Adres";
import NavigationService from "../../until/NavigationService";
import MyImage from "./myImage";
import LoadText from "./LoadText"; 
export default class FlatListAll extends Component{
  constructor(props){
    super(props)
    this.navigation = props.navigation; 
    this.state = {
      refreshing:true,
      id:"",
      page:0,
      dataSource:[],
      adres:"",
      pageCount:'',  //总页数 
      loadType:"",
      loadMore:false,
      onEndReachedCalledDuringMomentum:false,
    }
    this.onEndReachedCalledDuringMomentum = false;
  }
  //初始化
  UNSAFE_componentWillMount(){ 
    const { id,dataSource,adres } = this.props; 
    // console.log(this.props); 
    this.setState({
      id:id,
      page:0,
      adres:adres,
      dataSource:[],
      refreshing:true, 
    },function(){
      this.getdata();
    })
  }
  //获取数据
  getdata = async (Refresh) => { 
    const { adres} = this.props;
    let { dataSource,id, page } = this.state;
    page = Refresh ? 0 : page;
    dataSource = Refresh ? [] : dataSource;  
    let res = "";
    switch(adres) {
      case "product":
        //项目接口
        res = await productList({cid:id,page: page }); 
      break;
      case "square":
        //广场请求
        res = await user_article({page:page});
      break;
      case "system":
        //体系请求
        res = await square_tree();
      break;
      case "navigation":
        res = await navi_list();
      break;
      case "SystemItem":
        //获取体系某一个列表
        res = await square_list({cid:id,page: page });
      break;
      default:
        this.setState({refreshing:false})
      break;
    }
    // console.log(res)
    if( res.errorCode === 0 ){
      
      let _dataSource = [];
      if( adres === "system" || adres === "navigation"){
        _dataSource = dataSource.concat(res.data); 
      }else{
        _dataSource = dataSource.concat(res.data.datas); 
      }
      // console.log(_dataSource);
      
      this.setState({
        refreshing:false,
        dataSource:_dataSource,
        pageCount:res.data.pageCount,
        page: ( page + 1 ),
        loadType:1,
        loadMore:true,
      })
    }
  } 
  //上拉刷新
  _onRefresh = async () => { 
    this.getdata(true)
  }
  //加载更多
  _onEndReached(){
    const { page,pageCount,adres,onEndReachedCalledDuringMomentum } = this.state;
    //当屏幕滚动时  this.onEndReachedCalledDuringMomentum 变为true 可以进行上啦加载
    if( !this.onEndReachedCalledDuringMomentum && onEndReachedCalledDuringMomentum ){
      console.log("滚动动画开始时调用此函数。----------------------")
      return;
    }
    //请求页数大于 实际页数 不去请求 
    if( page > pageCount ){ this.setState({loadMore:true,loadType:2}); return; }
    if( adres === "navigation" || adres === "system"){
      this.setState({loadMore:true,loadType:2}); return;
    }
    this.getdata(); 
  }
  //打开详情
  /**
   * 
   * @param {*} item 当前列数据
   * @param {*} type 当前页面 类型
   * @param {*} index 当前点击列表索引
   */
  openUrl(item,type,index){
    // console.log(item);
    // this.navigation.navigate("DetailLink",{title:item.title,url:item.link})
    const _title = item.name ? item.name : item.title;
    if( type === "system" ){
      const { dataSource } = this.state;
      const _children = JSON.stringify(dataSource[index]);
      storeData("SystemChild",_children);
      console.log(_children)
      
      NavigationService.navigate("SystemItem",{title:_title,id:item.id});
      return;
    }
    NavigationService.navigate("DetailLink",{title:_title,url:item.link})
  }
  //头部
  renderHeader(){
    const { renderHeader } = this.props;
    let _renderHeader = renderHeader ?  renderHeader : null; 
    return _renderHeader;
  }
  //底部展示
  renderFooter () {
    const { renderFooter } = this.props;
    let _renderFooter = renderFooter ? renderFooter : null;
    return _renderFooter;
  }
  render () {
    const { dataSource } = this.state;
    return(
      <View style={{flex:1}}>
        {/* <Text>{JSON.stringify(this.props)}</Text> */}
        <FlatList 
          style={styles.list} 
          ListHeaderComponent={this.renderHeader.bind(this)}//头部
          ListFooterComponent={<LoadText loadMore={this.state.loadMore} loadType={this.state.loadType} />}//尾巴
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}  
            />
          }
          data={dataSource ? dataSource:[]}
          keyExtractor={(item, index) => index.toString()}
          enableEmptySections={true}//数据可以为空
          renderItem={this._renderItem.bind(this)} 
          showsVerticalScrollIndicator={false}//是否显示垂直滚动条
          showsHorizontalScrollIndicator={false}//是否显示水平滚动条
          ref={(flatList)=>this._flatList = flatList}
          onEndReachedThreshold={0.1}//执行上啦的时候10%执行
          onMomentumScrollBegin={() => { 
            this.onEndReachedCalledDuringMomentum = true; 
            this.setState({onEndReachedCalledDuringMomentum:true})    
          }}
          onEndReached={this._onEndReached.bind(this)}  
        />
      </View>
    )
  }
  //生成结构 
  _renderItem( {item,index} ){
    const { adres } = this.state;
    // console.log(adres)
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    // console.log(item);  
    switch (adres){
      case "system": 
        return (
          <TouchableOpacity activeOpacity={1}  style={styles.ListTouchable} onPress={() => this.openUrl(item,"system",index)}>
            <View style={styles.ListBox}>
              <Text style={styles.stystem_tit}>{item.name}</Text>
              <View style={styles.system_child}>
                {
                  item.children.map((child,index) => (
                    <Text style={[styles.system_child_item,{color:global.getColor()}]} key={index}>{child.name}</Text>
                  ))
                }
              </View>
            </View>
          </TouchableOpacity>
        )
      break;
      case "navigation": 
      return (
        <TouchableOpacity activeOpacity={1} style={styles.ListTouchable}>
          <View style={styles.ListBox}> 
            <Text style={styles.stystem_tit}>{item.name}</Text>
            <View style={styles.system_child}>
              {
                item.articles.map((child,index) => (
                  <Text style={[styles.system_child_item,{color:global.getColor()}]} key={index}
                   onPress={()=> this.openUrl(child)}>{child.title}</Text>
                ))
              }
            </View>
          </View>
        </TouchableOpacity>
      )
      break;
      case "square":
        return (
          //
          <TouchableOpacity style={styles.ListTouchable} activeOpacity={0.7} onPress={() => { this.openUrl(item) }} >
            <View style={styles.ListBox}>
              <View style={styles.ListHead}>
                <View style={styles.flex_1}>
                  <Text style={[styles.author]}>{item.author? item.author : item.shareUser}</Text>
                  {
                    item.is_top ? <Text style={styles.is_top}>置顶</Text> : null 
                  }
                  {
                    item.fresh ? <Text style={styles.fresh}>新</Text> : null
                  }
                  {
                    adres != "product" & item.tags ? 
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
              <View style={styles.listCenter}>
                {
                  adres === "product" ? <MyImage uri={item.envelopePic} style={styles.image} /> : null
                }
                
                <View style={styles.listImag_rigth}>
                  <Text style={styles.titleName}>{ global.HtmlMacth(item.title) }</Text>
                  <Text style={styles.desc} numberOfLines={3}>{item.desc}</Text>
                </View>
              </View>
              <View style={styles.listFoter}>
                <Text style={[styles.fontsize14,styles.flex_1]}>{item.superChapterName}·{item.chapterName}</Text>
                <Text style={styles.heart} onPress={() => this.collect(item.id)}> 
                {
                  item.zan === 0 ?
                  <AntDesign name="hearto" size={15} color="rgb(191, 191, 191)" /> :
                  <AntDesign name="heart" size={15} color="#E24234" />
                }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      break;
      default:
        return (
          //
          <TouchableOpacity activeOpacity={1} style={styles.ListTouchable} onPress={() => { this.openUrl(item) }} >
            <View style={styles.ListBox}>
              <View style={styles.ListHead}>
                <View style={styles.flex_1}>
                  <Text style={[styles.author]}>{item.author? item.author : item.shareUser}</Text>
                  {
                    item.is_top ? <Text style={styles.is_top}>置顶</Text> : null 
                  }
                  {
                    item.fresh ? <Text style={styles.fresh}>新</Text> : null
                  }
                  {
                    adres != "product" & item.tags ? 
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
              <View style={[styles.listCenter]}>
                {
                  adres === "product" ? <MyImage uri={item.envelopePic} style={styles.image} /> : null
                }
                
                <View style={styles.listImag_rigth}>
                  <Text numberOfLines={1} style={styles.titleName}>{ global.HtmlMacth(item.title) }</Text>
                  <Text numberOfLines={3} style={[styles.desc,{padding:5}]}>{item.desc}</Text>
                </View>
              </View>
              <View style={styles.listFoter}>
                <Text style={[styles.fontsize14,styles.flex_1]}>{item.superChapterName}·{item.chapterName}</Text>
                <Text style={styles.heart} onPress={() => this.collect(item.id)}> 
                {
                  item.zan === 0 ?
                  <AntDesign name="hearto" size={15} color="rgb(191, 191, 191)" /> :
                  <AntDesign name="heart" size={15} color="#E24234" />
                }
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )
      break;
    }
    
  }
}
const styles = StyleSheet.create({
  list:{ paddingHorizontal:8, backgroundColor:'#f4f4f4'},
  ListTouchable:{justifyContent:"flex-start", flexDirection:'row',},
  ListBox:{ paddingVertical:10, paddingHorizontal:10, backgroundColor:"#fff", borderRadius:5,
  marginTop:10,flex:1,},
  ListHead:{ flex:1, justifyContent:"flex-start", flexDirection:'row',},
  flex_1:{ flex:1,flexDirection:'row',alignItems:'center',}, 
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
  listCenter:{ flexDirection:'row', marginVertical:8, },
  image:{ width:100, height:100, },
  listImag_rigth:{flex:1, paddingHorizontal:5, justifyContent:"flex-start",},
  titleName:{ fontSize:15, marginBottom:5,},
  desc:{color:"#999",fontSize:13,lineHeight:25, justifyContent:"flex-start",},
  listFoter:{justifyContent:"flex-start", flexDirection:'row', alignItems:"center"},
  fontsize14:{fontSize:13,color:"#999"},
  heart:{ position:'absolute', zIndex:10, top:0,right:0, paddingVertical:5, paddingHorizontal:5},
  //体系以及导航
  stystem_tit:{fontSize:15,},
  system_child:{ flexDirection:'row', flexWrap:'wrap', },
  system_child_item:{ fontSize:13, backgroundColor:"#e2e2e2", paddingHorizontal:8, paddingVertical:7, borderRadius:3, color:'blue', marginTop:8, marginRight:7, }
})