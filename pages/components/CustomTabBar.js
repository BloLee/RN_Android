import React,{Component} from 'react'
import {StyleSheet, Text, View, Animated, Dimensions,
  TouchableNativeFeedback, TouchableOpacity,  
  Platform,ScrollView} from 'react-native'
const WINDOW_WIDTH = Dimensions.get('window').width;

export default class CustomTabBar extends Component {
    constructor(props: TabBarProps) {
        super(props);

        this.state = {
            activeDefaultColor: '#08086b',
            inactiveDefaultColor: '#666666',
            _containerWidth:"",
        }
    }
    
    _renderTab(name, page, isTabActive, onPressHandler) {
        const { textStyle } = this.props;
        const textColor = isTabActive ? this.props.activeColor : this.props.inactiveColor;
        
        const fontWeight = isTabActive ? 'bold' : 'normal';

        const Button = Platform.OS == 'ios' ? ButtonIos : ButtonAndroid;
        
        return (<Button
                    style={{flex: 1}}
                    key={name}
                    accessible={true}
                    accessibilityLabel={name}
                    accessibilityTraits='button'
                    onPress={() => onPressHandler(page)}
                >
                    <View style={styles.tab}>
                        <Text style={[{color: textColor, fontWeight } ]}>
                            {name}
                        </Text>
                    </View>
                </Button>);
      }

      _renderUnderline() {
        const containerWidth = this.props.containerWidth;
        const numberOfTabs = this.props.tabs.length;
        const underlineWidth = this.props.tabUnderlineDefaultWidth ? this.props.tabUnderlineDefaultWidth : containerWidth / (numberOfTabs * 2);
        const scale = this.props.tabUnderlineScaleX ? this.props.tabUnderlineScaleX : 3;
        const deLen = (containerWidth / numberOfTabs - underlineWidth ) / 2;
        console.log(deLen)
        const tabUnderlineStyle = {
            position: 'absolute',
            width: underlineWidth/2,
            height: 2,
            borderRadius: 2,
            backgroundColor: this.props.activeColor,
            bottom: 0,
            left: deLen
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0,  containerWidth / numberOfTabs],
        });

        const scaleValue = (defaultScale) => {
            let arr = new Array(numberOfTabs * 2);
            return arr.fill(0).reduce(function(pre, cur, idx){
                idx == 0 ? pre.inputRange.push(cur) : pre.inputRange.push(pre.inputRange[idx-1] + 0.5);
                idx%2 ? pre.outputRange.push(defaultScale) : pre.outputRange.push(1)
                return pre
                }, {inputRange: [], outputRange: []})
        }

        const scaleX = this.props.scrollValue.interpolate(scaleValue(scale));

        return(
            <Animated.View
              style={[
                tabUnderlineStyle,
                {
                    transform: [
                        { translateX },
                        { scaleX }
                    ],
                },
                this.props.underlineStyle,
              ]}
            />
        )
      }
      onTabContainerLayout(e) {
        debugger
        this._tabContainerMeasurements = e.nativeEvent.layout;
        let width = this._tabContainerMeasurements.width;
        if (width < WINDOW_WIDTH) {
          width = WINDOW_WIDTH;
        }
        this.setState({ _containerWidth: width, });
        // this.updateView({value: this.props.scrollValue.__getValue(), });
      }
      updateView(offset) {
        const position = Math.floor(offset.value);
        const pageOffset = offset.value % 1;
        const tabCount = this.props.tabs.length;
        const lastTabPosition = tabCount - 1;
    
        if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
          return;
        }
    
        if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
          this.updateTabPanel(position, pageOffset);
          this.updateTabUnderline(position, pageOffset, tabCount);
        }
      }
      render() {
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor}, this.props.style]}>
              <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled={true}
                bounces={false}
                scrollsToTop={false} 
                scrollEventThrottle={16}
              > 
                <View ref={'tabContainer'} style={[styles.tabs_view,{ width:540, backgroundColor:"red" }]}
                onLayout={this.onTabContainerLayout.bind(this)}>
                    {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    return this._renderTab(name, page, isTabActive, this.props.goToPage)
                    })}
                    {
                        this._renderUnderline()
                    } 
                  </View>
                </ScrollView>
            </View>
        );
    };
}



const ButtonAndroid = (props) => (
        <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.SelectableBackground()}
            {...props}
        >
            {props.children}
        </TouchableNativeFeedback>);

const ButtonIos = (props) => (<TouchableOpacity {...props}>
      {props.children}
    </TouchableOpacity>);


const styles = StyleSheet.create({
  tab: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#f4f4f4',
  },
  tabs_view: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});