import axios from "axios";
import { Alert } from 'react-native';
import ToastLoad from "./TostLoad"; 
// let host = "https://api.github.com/";
// export const hostWeb = "https://github.com/";
// export const downloadUrl = 'https://www.pgyer.com/GSYGithubApp';
// export const graphicHost= 'https://ghchart.rshah.org/';
// let  = axios.create({
  
//   timeout: 1000,
// }) 
const instance = axios.create({
  baseURL: 'https://www.wanandroid.com/',
  timeout: 3000,
  // headers: { 'X-Custom-Header': 'foobar' }
});
var _num = 0;
//请求拦截器
instance.interceptors.request.use( (config) => {
  _num ++;
  if( _num === 0 ){
    ToastLoad.Loading.show();
  }
  return config;
},(error) =>{
  //处理错误请求
  return Promise.reject(error);
});
//返回信息拦截器
instance.interceptors.response.use( (response) =>{
  _num --;
  if(_num <= 0 ){
    ToastLoad.Loading.hidden();
  }
  return response;
},(error) =>{
  _num --;
  if(_num <= 0 ){
    ToastLoad.Loading.hidden();
  }
  return Promise.reject(error)
});
//Get 请求封装
function PostAxios(url,params){
  return new Promise((resolve,reject) => {
    ToastLoad.Loading.show();
    instance.post(url,params)
    .then( result => {
       resolve(result)
    })
    .catch( error => {
      reject(error)
    })
  }) 
}
//Get 请求封装
function GetAxios(url,params){
   return new Promise((resolve,reject) => {
    ToastLoad.Loading.show();
    instance.get(url,{params:params})
     .then( result => {
        resolve(result.data)
        // ToastLoad.Loading.hidden();
     })
     .catch( error => {
       reject(error)
      //  ToastLoad.Loading.hidden();
     })
   }) 
}
export default {PostAxios,GetAxios}