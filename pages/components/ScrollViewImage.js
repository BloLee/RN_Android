
import React, {Component} from 'react';
import { AppRegistry,StyleSheet,Text,View,Image,
TouchableOpacity,ScrollView,Dimensions,Platform } from 'react-native';

var {width} = Dimensions.get('window');
const ios = Platform.OS;
class ScrollViewImage extends Component{
    constructor(props){
        super(props)
        this.state = {
            duration:3000,  //滚动间隔时间
            currentPage:0,  //默认 原点
        }
    }
    /**
     * 一般在此方法中处理一些耗时操作
    */ 
    componentDidMount() {
      this._startTimer(); 
    } 
    UNSAFE_componentWillMount() {
        // clearInterval(this.interval);
    } 
    //演染图片
    _renderAllImage() {
        let imgArr = [];
        let imgData = this.props.imgData;
        for (let i=0; i<imgData.length;i++) {
            imgArr.push(
                <TouchableOpacity key={i} activeOpacity={1}
                onPress={() => this._openUrl(imgData[i])} >
                    <Image source={{uri: imgData[i].imagePath}}
                        style={{width: width, height:200}} />
                </TouchableOpacity>
            )
        }
        return imgArr;
    }
    //渲染 小圆点
    _renderPageCircle(){
        let allCircle = [];
        let imgData = this.props.imgData;
        const { currentPage } = this.state;
        for(let i=0;i<imgData.length;i++){
            allCircle.push(
                <View key={i} style={[styles.instructions, i==currentPage?styles.activeInstruct:"" ]}></View>
            )
        }
        return allCircle;
    }
    //点击跳转页面
    _openUrl(data){
        console.log(data)
    } 
    //滑动结束 一帧
    onAnimationEnd(e){ 
        //求出偏移量
        let offsetX = e.nativeEvent.contentOffset.x;
        //计算 当前页数 第几个原点
        let pageIndex = Math.floor(offsetX/width); 
        // console.log(pageIndex)
        this.setState({currentPage:pageIndex})
    }
    //开始拖动 清除定时器
    onScrollBeginDrag(e){
        this.timer && clearTimeout(this.timer);
    }
    //停止滑动 开始自动滑动
    onScrollEndDrag(){
        // console.log(this.state.currentPage)
        this.timer && this._startTimer(); 
    }
    //自动滑动
    _startTimer(){
        let scrollView = this.refs.scrollView;
        const { imgData } = this.props;
        const { currentPage,duration } = this.state; 
        // console.log(currentPage +"--------------------------"); 
        //4.1 设置圆点
        let activePage = currentPage;
        this.timer = setTimeout( () => {
            //判断圆点
            if( activePage >= imgData.length-1 ){
                activePage = 0
            }else{
                activePage = activePage+1;
            }
            //更新选中圆点
            this.setState({currentPage:activePage});
            //设置图片滑动
            let offsetX = activePage * width;
            // console.log(offsetX)
            scrollView.scrollResponderScrollTo({x:offsetX,y:0,animated:true});
            this._startTimer();
        },duration)
    }
    render () { 
        return (  
            <View style={styles.container}> 
                <ScrollView ref="scrollView"
                    horizontal={true}  //设置滚动方向水平 默认 垂直
                    showsHorizontalScrollIndicator={false} //用来控制在滑动时是否显示滚动条
                    pagingEnabled={true} //水平滑动时，可以出现分页效果
                    onMomentumScrollEnd={(scrollView)=>this.onAnimationEnd(scrollView)}  //手动滑动结束
                    onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}    //开始滑动 
                    onScrollEndDrag={this.onScrollEndDrag.bind(this)}        //停止滑动  
                >
                    {this._renderAllImage()} 
                </ScrollView>
                <View style={styles.circleContainer}>
                    {this._renderPageCircle()}
                </View> 
            </View>
        )
    }
}
const styles = StyleSheet.create({
  container: {
    // marginTop: ios == 'ios' ? 25 : 0
  },
  circleContainer: {
    width: width,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
  },
  instructions: { 
    borderWidth:2,
    borderColor:"#999",
    // backgroundColor:"#fff",
    marginRight:15,
    width:10,
    height:10,
    borderRadius:50,
  },
  activeInstruct:{
      backgroundColor:"#FFF",
      borderWidth:2,
      borderColor:"#FFF",
      borderRadius:50,
  }
});
module.exports = ScrollViewImage;
// RNScrollViewDemo;