import React,{Component} from "react";
import {Platform,Dimensions,StatusBar,AsyncStorage} from 'react-native'; 
/**
 * 存储数据方法
 * @param {*} name 
 * @param {*} data 
 */
export const storeData = async (name,data) => {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (error) {
      // Error saving data
    }
}
/**
 * 获取数据方法
 * @param {*} name
 */
export const getStorage = async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
     }
}