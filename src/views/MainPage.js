/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
} from 'react-native';

const circleSize = 8;
const circleMargin = 5;

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 != r2
});

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      currentPage: 0,
      dataSource: ds.cloneWithRows([
        {
          iamge: require('../images/advertisement_img_01.jpg'),
          title: '商品1', 
          subTitle: '描述1'
        },
        
        {
          iamge: require('../images/advertisement_img_02.jpg'),
          title: '商品2', 
          subTitle: '描述2'
        },
        
        {
          iamge: require('../images/advertisement_img_03.jpg'),
          title: '商品3', 
          subTitle: '描述3'
        },
        
        {
          iamge: require('../images/advertisement_img_01.jpg'),
          title: '商品4', 
          subTitle: '描述4'
        },
        
        {
          iamge: require('../images/advertisement_img_02.jpg'),
          title: '商品5', 
          subTitle: '描述5'
        }
      ]),
      advertisements: [
        {
          image: require('../images/advertisement_img_01.jpg')
        },
        {
          image: require('../images/advertisement_img_02.jpg')
        },
        {
          image: require('../images/advertisement_img_03.jpg')
        },
      ]
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const advertisementCount = this.state.advertisements.length;
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2;
    const left = (Dimensions.get('window').width -indicatorWidth) / 2;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'blue'} barStyle={'default'} networkActivityIndicatorVisible={true}/>
        {/* 搜索 */}
        <View style={styles.searchbar}>
          <TextInput style={styles.input} placeholder='搜索商品' onChangeText={(text) => {
            this.setState({searchText: text});
          }}/>
          <Button style={styles.button} title='搜索' onPress={() =>{
            console.log('输入的内容：' + this.state.searchText)
            Alert.alert('click 搜索按钮' + this.state.searchText, null, null)
          }}/>
        </View>

        {/* banner */}
        <View style={styles.advertisement}>
          <ScrollView ref="scrollView" horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled={true}>
            {this.state.advertisements.map((advertisement, index) => {
                  return (
                    <TouchableHighlight onPress={() => Alert.alert('click banner', null, null)}>
                      <Image style={styles.advertisementContent} source={advertisement.image}/>
                    </TouchableHighlight>
                  );
              })
            }
          </ScrollView>
          <View style={[styles.indicator,{left: left}]}>
            {this.state.advertisements.map((advertisement, index) => {
              return (
                <View key={index} style={(index === this.state.currentPage)? styles.circleSelected : styles.circle} />
              );
            })}
          </View>
        </View>

        {/* 商品 */}
        <View style={styles.product}>
          <ListView dataSource={this.state.dataSource} renderRow={this._renderRow} renderSeparator={this._renderSeperator}/>
        </View>
      </View>
    );
  }

  componentDidMount() {
    this._startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  
  _startTimer() {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if(nextPage >= 3) {
        nextPage = 0;
      }
      this.setState({currentPage: nextPage});
      const offSetX = nextPage * Dimensions.get('window').width;
      this.refs.scrollView.scrollResponderScrollTo({x:offSetX, y:0, animated:true});
    }, 2000);
  }

  _renderRow = ((rowData, sectionID, rowID)=> {
    return (
      <TouchableHighlight onPress={() => Alert.alert('click product', null, null)}>
        <View style={styles.row}>
          <Image source={rowData.iamge} style={styles.productImage}/> 
          <View style={styles.productText}>
            <Text style={styles.productTitle}>{rowData.title}</Text>
            <Text style={styles.productSubTitle}>{rowData.subTitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  });
  goMainPage(){
    this.props.navigation.navigate()
  }

  _renderSeperator(sectionID, rowID, adjacentRowHighlighted){
    return(
      <View key={rowID} style={styles.divider} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    marginTop: Platform.OS === 'ios' ? 20 : 0 ,
    height:50,
    flexDirection:'row',
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#f3f6fa',
    margin: 5,
  },
  button: {
    flex: 1,
    margin: 5,
    alignItems: 'center'
  },
  advertisement: {
    height: 180,
  },
  product: {
    flex: 1,
  },
  row: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  },
  indicator: {
    position: 'absolute', 
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  },
  productImage: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    alignSelf:'center'
  },
  productText:{
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  productTitle:{
    flex: 3,
    fontSize: 16
  },
  productSubTitle:{
    flex: 2,
    fontSize: 14,
    color: 'gray'
  },
  divider: {
    height: 1,
    width: Dimensions.get('window').width -5,
    marginLeft: 5,
    backgroundColor:'lightgray'
  }
});
