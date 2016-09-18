import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import StatusBarAndroid from 'react-native-android-statusbar';

import color from '../../../config/color';

import FloatingButton from '../../component/floating-button';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light'
    };

    componentDidMount() {
        StatusBarAndroid.setHexColor(color.statusBar);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <FloatingButton
                    style={styles.floatingButton}
                >
                    <Icon name="md-add" size={30} color="#ffffff"/>
                </FloatingButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    floatingButton: {
        position: 'absolute',
        right: 15,
        bottom: 15
    }
});

function mapStateToProps(_state) {
    return {};
}

export default connect(mapStateToProps)(HomeScreen);
