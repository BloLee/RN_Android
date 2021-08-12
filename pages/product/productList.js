import React,{Component} from "react";
import { View,Text,FlatList,RefreshControl,
  TouchableNativeFeedback,StyleSheet } from "react-native"; 
import AntDesign from "react-native-vector-icons/AntDesign";
import global from "../../until/global";
import { productList } from "../../until/Adres";
import NavigationService from "../../until/NavigationService";
import MyImage from "../components/myImage";
import LoadText from "../components/LoadText";
export default class ProductList extends Component{
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
      loadMore:false,
      loadType:"",
    }
  }
  UNSAFE_componentWillMount(){ 
    const { id,dataSource,adres } = this.props; 
    this.setState({
      id:id,
      page:0,
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
    switch(adres) {
      case "product":
        let res = await productList({cid:id,page: page });
        if( res.errorCode === 0 ){
          let _dataSource = dataSource.concat(res.data.datas); 
          this.setState({
            refreshing:false,
            dataSource:_dataSource,
            pageCount:res.data.pageCount,
            page: ( page + 1 ),
            loadType:1,
            loadMore:true,
          })
        }
      break;
    }
  } 
  //上拉刷新
  _onRefresh = async () => { 
    this.getdata(true)
  }
  //加载更多
  _onEndReached(){
    const { page,pageCount } = this.state;
    //请求页数大于 实际页数 不去请求 
    if( page > pageCount ){ this.setState({loadMore:true,loadType:2}); return; }
    this.getdata(); 
  }
  //打开详情
  openUrl(item){
    // console.log(item);
    // this.navigation.navigate("DetailLink",{title:item.title,url:item.link})
    NavigationService.navigate("DetailLink",{title:item.title,url:item.link})
  }
  //头部
  renderHeader(){
      const { renderHeader } = this.props;
      let _renderHeader = renderHeader ?  renderHeader : null; 
      return _renderHeader;
  }
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
            this.onEndReachedCalledDuringMomentum = false;     
          }}
          onEndReached={this._onEndReached.bind(this)}
        />
      </View>
    )
  }
  //生成结构 
  _renderItem( {item} ){
    const { adres } = this.state;
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    // console.log(item); 
    return (
      //
      <TouchableNativeFeedback style={styles.ListTouchable} onPress={() => { this.openUrl(item) }} >
        <View style={styles.ListBox}>
          <View style={styles.ListHead}>
            <Text style={[styles.flex_1,styles.author]}>{item.author}</Text>
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
            <Text style={styles.niceDate}>{item.niceDate}</Text>
          </View>
          <View style={styles.listCenter}>
            <MyImage uri={item.envelopePic} style={styles.image} />
            <View style={[styles.flex_1]}>
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
      </TouchableNativeFeedback>
    )
  }
}
const styles = StyleSheet.create({
  list:{ paddingHorizontal:8, },
  ListTouchable:{justifyContent:"flex-start", flexDirection:'row',},
  ListBox:{ paddingVertical:10, paddingHorizontal:10, backgroundColor:"#fff", borderRadius:5,
  marginTop:10,},
  ListHead:{ flex:1, justifyContent:"flex-start", flexDirection:'row',},
  flex_1:{ flex:1},
  author:{ fontSize:13,fontWeight:'500', color:"#999" },
  niceDate:{fontSize:12, color:'#999',},
  listCenter:{ flexDirection:'row', marginVertical:8, },
  image:{ width:100, height:100, marginRight:10 },
  titleName:{ fontSize:15,marginTop:7, marginBottom:5,},
  desc:{color:"#999",fontSize:13,lineHeight:25},
  listFoter:{justifyContent:"flex-start", flexDirection:'row', alignItems:"center"},
  fontsize14:{fontSize:13,color:"#999"},
  heart:{ position:'absolute', zIndex:10, top:0,right:0, paddingVertical:5, paddingHorizontal:5}
})