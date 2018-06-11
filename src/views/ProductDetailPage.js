import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Navig
} from 'react-native';

export default class ProductDetailPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._pressBackButton.bind(this)}>
                    <Text style={styles.back}>返回</Text>
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.productTitle}</Text>
            </View>
        );
    }

    _pressBackButton() {
        const {navigator} = this.props;
        if(navigator) {
            navigator.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    back: {
        fontSize: 20,
        color: 'blue'
    },
    text: {
        fontSize: 25,
        color: 'black'
    }
});