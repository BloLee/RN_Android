import React,{Component} from "react";
import { View, Text } from "react-native";
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';
// import global from "../../until/global";
import FlatListAll from "../components/FlatListAll";
import Container from "../components/contanter";
import { square_list } from "../../until/Adres";
export default class SystemItem extends Component{
  constructor(props){
    super(props)
    this.sate ={

    }
  }
  componentWillMount(){

  }
  getData = async () => {

    let res = await square_list();
  }
  render () {
    const { params } = this.props.navigation.state;
    console.log(params); 
    return (
      // <SafeAreaView style={{flex:1,}}>  
      //   <StatusBarHead />
      //   <ScrollableTab name={"square"} />
      // </SafeAreaView>
      <Container>
        <FlatListAll
          {...this.props} 
          adres={'SystemItem'}
        />  
      </Container>
    )
  }
}