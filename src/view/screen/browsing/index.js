import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import WebViewBridge from 'react-native-webview-bridge';

import {screenNames} from '../../../config/router';
import color from '../../../config/color';

import FloatingButton from '../../component/floating-button';

class BrowsingScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        statusBarColor: color.statusBar
    };

    constructor(props) {
        super(props);
        this.state = {
            isDownloadable: false,
            publisherCode: ''
        };
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: '小説を探す'
        });
    }

    render() {
        const {type} = this.props;
        const settings = SETTINGS[type];

        return (
            <View style={styles.container}>
                <WebViewBridge
                    source={{uri: settings.uri}}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                />
                <FloatingButton
                    style={styles.floatingButton}
                    onPress={this._onPressDownloadButton.bind(this)}
                    disabled={!this.state.isDownloadable}
                >
                    <Ionicon name="md-download" size={30} color="#ffffff"/>
                </FloatingButton>
            </View>
        );
    }

    _onPressDownloadButton() {
        const {type, navigator} = this.props;
        navigator.pop();
        navigator.push({
            screen: screenNames.story,
            passProps: {
                publisherType: type,
                publisherCode: this.state.publisherCode
            }
        });
    }

    _onNavigationStateChange(e) {
        const {type} = this.props;
        const settings = SETTINGS[type];
        const match = e.url.match(settings.downloadable);
        this.setState({
            isDownloadable: !!match,
            publisherCode: match ? match[1] : ''
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
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

const SETTINGS = {
    narou: {
        uri: 'http://yomou.syosetu.com/',
        downloadable: /^(?:https?:\/\/ncode\.syosetu\.com\/(n[^\/]+)\/|https?:\/\/ncode\.syosetu\.com\/novelview\/infotop\/ncode\/(n[^\/]+))(?:\?.+)?$/
    }
};

export default connect()(BrowsingScreen);
