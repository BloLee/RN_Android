import React,{Component} from "react";
import {Platform,Dimensions,StatusBar,AsyncStorage} from 'react-native';
import DeviceInfo from 'react-native-device-info'; 
//获取appid
let ID = DeviceInfo.getBundleId().split('.')[1];
const {width, height} = Dimensions.get('window');
// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;
// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

let global = {
  ID: ID,
  APP_API_URL:"https://www.wanandroid.com/",
  width:width,
  height:height, 
  color:["#eb2f96","#faad14","#722ed1","#52c41a","#13c2c2","rgb(45, 183, 245)","rgb(255, 85, 0)","rgb(135, 208, 104)"]
}

function HtmlMacth (title){
  const matchList  = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&#34;': '"',
    '&quot;': '"',
    '&#39;': "'",
    '&ldquo;':'“',
    '&rdquo;':'”',
  };
  let regStr = '(' + Object.keys(matchList).toString() + ')';
  // ↑ ------------【*提取匹配列表key值*】.【组数转字符串】      
  regStr = regStr.replace(/,/g, ')|(')
  const regExp = new RegExp(regStr, 'g'); 
  return title.replace(regExp, match => matchList[match]);
}
//是否置顶
function StickyTop(list) {
  if( list.leegth <= 0 ){return;}
  for( const item of list){
    item.is_top = 1;  
  }
  // console.log(list); 
  return list;
}
function MathFloor () {
  return Math.floor(Math.random()*9);    // 可均衡获取 0 到 8 的随机整数。
}
function getColor(){
  const _INDEX = MathFloor();
  return global.color[_INDEX];
}

//判断是否为iphoneX或Xs
export function isIphoneX() {
  return (
      Platform.OS === 'ios' && 
      ((height === X_HEIGHT && width === X_WIDTH) || 
      (height === X_WIDTH && width === X_HEIGHT)) ||
      ((height === XR_HEIGHT && width === XR_WIDTH) || 
        (height === XR_WIDTH && width === XR_HEIGHT))
  )
}

export default {global,HtmlMacth,StickyTop,MathFloor,getColor};