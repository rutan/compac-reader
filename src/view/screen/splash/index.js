import React from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {screenNames} from '../../../config/router';

class SplashScreen extends React.Component {
    static navigatorStyle = {
        navBarHidden: true
    };

    componentDidMount() {
        setTimeout(() => {
            this.props.navigator.resetTo({
                screen: screenNames.home,
                title: 'Compac Reader'
            });
        }, 0);
    }

    render() {
        return <View />;
    }
}

export default connect()(SplashScreen);
