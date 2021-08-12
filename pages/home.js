import React,{Component } from "react";
import { StatusBar,SafeAreaView,ScrollView,RefreshControl,View,Text,
  TouchableNativeFeedback,ActivityIndicator,StyleSheet,Button } from "react-native";
import Api from "../until/Adres";
import global from "../until/global";
import Orientation from 'react-native-orientation';
import ScrollViewImage from "./components/ScrollViewImage";
import FlatListPage from "./components/FlatList";
import LoadText from "./components/LoadText";
import NavigationRight from "./components/NavigationRight";
import AntDesign from "react-native-vector-icons/AntDesign";
import Container from "./components/contanter"; 
class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      refreshing: false,
      dataType:1,   //数据状态
      page:0,
      banner:[],
      souceList:[],
      loadMore:false,  //加载状态
      loadType:"",     //加载显示的类型
    }
  } 
  // static navigationOptions = ({navigation}) => { 
  //   console.log(navigation); 
  //   return {  
  //     headerRight: <NavigationRight {...navigation} itemInfo={{name:'home'}} />
  //   };
  // }; 
  UNSAFE_componentWillMount = () => {
    //强制竖屏
    Orientation.lockToPortrait();
  }
  //初始話數據
  componentDidMount(){
    this.getData();
  }
  //获取列表数据接口
  getData = async (type)  => { 
    let { page, } = this.state; 
    let banner = await Api.banner();
    let res = await Api.articleTopList();
    let res1 = await Api.articleList({page:page});
    if(res && res1 && banner){
      let _TopList = global.StickyTop(res.data); 
      let _artList = res1.data.datas;  
      let _banner = banner.data; 
      const _concatList = _TopList.concat(_artList);  
      this.setState({
        page:(page+1),
        souceList:_concatList,
        banner:_banner,
        refreshing:false,
        loadMore:false, 
      })  
    } 
  };
  //获取列表数据接口
  getIndexList = async () => {
    let { page, souceList } = this.state;
    let res = await Api.articleList({page:page}); 
    if(res){
      let _concatList = souceList.concat(res.data.datas); 
      let _loadType = res.data.datas.length > 0 ? 1 : 2;
      this.setState({
        page:(page+1),
        souceList:_concatList, 
        loadMore:false,
        loadType:_loadType,
      })   
    }
  }
  //生成结构 
  _renderItem( dataList ){  
    return ( 
      dataList.map( (item,index) => 
        <TouchableNativeFeedback key={index}>
          <View style={styles.ListBox}>
            <View style={styles.ListTopInfoBox}>
              <View style={styles.flex_1}>
                <Text style={styles.author}>{item.author? item.author : item.shareUser}</Text> 
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
              <Text styles={styles.niceDate}>{item.niceDate}</Text>
            </View>
            <Text style={styles.titleName}>{item.title}</Text>
            <Text style={styles.fontsize14}>{item.superChapterName}·{item.chapterName}</Text>
          </View>
        </TouchableNativeFeedback>
        
      )
    )
  }
  //下拉刷新
  _onRefresh = () => {
    this.setState({refreshing: true}); 
    this.getData();
  } 
  //滑动时加载更多
  _onScroll(event){
    const {loadMore} = this.state;
    if(loadMore){return;}
    let offsetY = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    if( (offsetY+height) >= (contentHeight-30)){
      this.setState({loadMore:true,loadType:1})
      this.getIndexList();
    } 
  }
  /**
   * 上拉触底
   */
  _contentViewScroll(e){
    const {loadMore} = this.state;
    if(loadMore){return;}
    let offsetY = e.nativeEvent.contentOffset.y; //滑动距离
    let contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
    let oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
    
    if (offsetY + oriageScrollHeight >= (contentSizeHeight-30)){
      // this.setState({loadMore:true}) 
    }
  }
  render() {
    return (
      // <Container statusBarBackgroundColor={"transparent"} barStyle={"dark-content"}>   
        <ScrollView  style={{flex:1,backgroundColor:"#f4f4f4",}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              title="加载中..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#fff"         
            />
          }
          scrollsToTop={true}
          scrollEventThrottle={100}
          onScroll={this._onScroll.bind(this)}
          onMomentumScrollEnd = {this._contentViewScroll.bind(this)} 
        >
          <ScrollViewImage imgData={this.state.banner} /> 
          <FlatListPage {...this.props} data={this.state.souceList} />
          {/* 加载中以及加载完成 */}
          {/* <LoadText dataInfo={type:this.state.dataType;loadMore:this.state.loadMore} />  */}
          <LoadText loadMore={this.state.loadMore} loadType={this.state.loadType} />
        </ScrollView> 
      // </Container>
    )
  }
}
const styles = StyleSheet.create({ 
  ListContainer:{ paddingHorizontal:8, 
    backgroundColor:"#f4f4f4", 
  },
  ListBox:{ paddingVertical:10, paddingHorizontal:10, backgroundColor:"#fff", borderRadius:5,
    marginTop:10,
  },
  ListTopInfoBox:{
    flexDirection:'row',
    flex:1, 
    alignItems:'center',
  },
  flex_1:{flex:1,flexDirection:'row',},
  author:{ fontSize:15,fontWeight:"500", },
  fresh:{
    fontSize:13,
    borderWidth:1,
    borderColor:"#E24234",
    color:"#E24234",
    paddingHorizontal:5,
    marginLeft:15,
  },
  tags:{ fontSize:13, borderWidth:1, borderColor:"#009a61", color:"#009a61",paddingHorizontal:5, marginLeft:15, },
  niceDate:{fontSize:15,},
  titleName:{ fontSize:17,marginVertical:10,},
  fontsize14:{fontSize:13}
})
export default HomePage;