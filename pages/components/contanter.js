/**
 * 所有页面的统一容器
 */
 import React from 'react';
import StatusBarHead from './StatusBarHead';
import PropTypes from 'prop-types';
import {PanResponder, Text, Keyboard, KeyboardAvoidingView, Platform} from 'react-native';
import {withNavigation} from 'react-navigation'; 
class Container extends React.PureComponent {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
        barStyle: this.props.barStyle,
        statusBarBackgroundColor: this.props.statusBarBackgroundColor
    };

    this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => {
            // alert(JSON.stringify(gesture));
            return !!this.props.onPress;
        },
        onShouldBlockNativeResponder: () => {
            // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
            return false;
        },
        onPanResponderGrant: (e, gesture) => {
            Keyboard.dismiss();
            this.props.onPress && this.props.onPress();
        }
    });
  }
  static propTypes = {
    title: PropTypes.string,
    style: Text.propTypes.style,
    headerStyle: Text.propTypes.style,
    showBackButton: PropTypes.bool,
    showRightButton: PropTypes.bool,
    rightButtonIcon: PropTypes.string,
    rightButtonIconSize: PropTypes.number,
    rightButtonIconColor: PropTypes.string,
    rightButtonIconOnPress: PropTypes.func,
    hideHeader: PropTypes.bool,
    barStyle: PropTypes.string,
    statusBarBackgroundColor: PropTypes.string,
    onPress: PropTypes.func
  };
  render() {
    return (

        <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled={Platform.OS === "ios"}>
            <SafeAreaView style={{flex:1,}}>  
            {/* <View style={[styles.container]}> */}
                <StatusBarHead barStyle={this.props.barStyle} backgroundColor={this.props.statusBarBackgroundColor}/>
                <View {...this.panResponder.panHandlers} style={[styles.body, this.props.style]}>
                    {this.props.children}
                </View>
            {/* </View> */}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
  }
}
const styles = createStyle({
  container: {
      flex: 1,
  },
  body: {
      flex: 1,
      // backgroundColor: "#f5f7f9"
  }
});
export default withNavigation(Container)