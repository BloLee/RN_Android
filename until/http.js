import axios from "axios";
import { Alert } from 'react-native';
import qs from "qs";
import ToastLoad from "./TostLoad"; 
import NavigationService from "./NavigationService";

// import { StackActions } from 'react-navigation/routers';
// let host = "https://api.github.com/";
// export const hostWeb = "https://github.com/";
// export const downloadUrl = 'https://www.pgyer.com/GSYGithubApp';
// export const graphicHost= 'https://ghchart.rshah.org/';
// let  = axios.create({
  
//   timeout: 1000,
// }) 
const instance = axios.create({
  baseURL: 'https://www.wanandroid.com/',
  timeout: 10000,
  // headers: { 'X-Custom-Header': 'foobar' }
});
var _num = 0;
//请求拦截器
instance.interceptors.request.use( (config) => {
  // _num ++;
  // if( _num === 0 ){
  //   console.log("加载中");
  //   ToastLoad.Loading.show();
  // }
  // console.log(config); 
  return config;
},(error) =>{
  //处理错误请求
  return Promise.reject(error);
});
//返回信息拦截器
instance.interceptors.response.use( (response) =>{
  // _num --;
  // if(_num === 0 ){
  //   console.log("加载结束");
  //   ToastLoad.Loading.hidden();
  // }
  // console.log(response) 
  if( response.data ){
    switch(response.data.errorCode){
      case -1001:
        NavigationService.navigate("Login");
      break;
    }
  }
  return response;
},(error) =>{
  // console.log(error) 
  // _num --;
  // if(_num === 0 ){
  //   console.log("加载结束");
  //   ToastLoad.Loading.hidden();
  // }
  return Promise.reject(error)
});
//Get 请求封装
function PostAxios(url,params){
  return new Promise((resolve,reject) => {  
    instance.post(url,qs.stringify(params))
    .then( result => { 
       resolve(result.data)
    })
    .catch( error => {
      reject(error)
    })
  }) 
}
//Get 请求封装
function GetAxios(url,params){
   return new Promise((resolve,reject) => { 
    instance.get(url,{params:params})
     .then( result => {
        resolve(result.data) 
     })
     .catch( error => {
       reject(error) 
     })
   }) 
}
export default {PostAxios,GetAxios}