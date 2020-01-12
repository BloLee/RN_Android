//图片组件
import React,{Component} from 'react';
import {StyleSheet,View,Image,Text} from "react-native"; 
import Entypo from "react-native-vector-icons/Entypo";
export default class MyImage extends Component{
    constructor(props){
        super(props)
        this.state={
            status:0,
            uri:this.props.uri
        }
    }
    _onLoad(nextProps, nextState){
        this.setState({status: 1})
    }
    render(){
        return(
            <View style={[this.props.style, { } ]}> 
                <Image style={this.props.style}
                    resizeMode={this.props.resizeMode || 'cover'}
                    source={{uri: this.props.uri || ""}}
                    onLoad={ ()=> this._onLoad() }
                />
                {
                    this.state.status == 0 ?
                        <View style={styles.iconBox}>
                          {/* <LocalImg.EntIcon name="image" size={14} color={"#d3d3d3"} /> */}
                          <Entypo name="images" size={25} color={"#3498db"} />
                        </View>
                    : null
                }
            </View>
        )
    }
}
const styles=StyleSheet.create({
    imgWrapper: {
        flexDirection: "row",
        justifyContent: "center", 
    }, 
    iconBox: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    }
})
