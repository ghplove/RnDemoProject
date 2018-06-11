import { 
    AppRegistry,
    Platform,
    Text,
    View
} from 'react-native';
import CodePush from "react-native-code-push";
import React, { Component } from 'react';

import RNBridge from './src/tools/RNBridge';
import App from './App';
import MainPage from './src/views/MainPage';
import AccountPage from './src/views/AccountPage';
import ProductDetailPage from './src/views/ProductDetailPage';

import {
    StackNavigator,
} from 'react-navigation';

const MainStack = StackNavigator({

    App: {
        screen: App,
        navigationOptions:({navigation}) => ({
            title: 'RN-App',
            header: null
        }),
    },
    MainPage: {
        screen: MainPage,
        navigationOptions:({navigation}) => ({
            title: 'RN-Main'
        }),
    },
    AccountPage: {
        screen: AccountPage,
        navigationOptions:({navigation}) => ({
            title: 'RN-Account'
        }),
    },
    ProductDetailPage: {
        screen: ProductDetailPage,
        navigationOptions:({navigation}) => ({
            title: 'RN-ProductDetailPage'
        }),
    },
}, {
    initialRouteName: 'App',//设置RN启动页
    navigationOptions: {
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
);

class RnDemoApp extends Component {
    render() {
        return <MainStack screenProps={this.props} />
    }
}

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL };
LoanRNApp = CodePush(codePushOptions)(RnDemoApp);
AppRegistry.registerComponent('RnDemoProject', () => RnDemoApp);

