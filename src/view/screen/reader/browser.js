import React from 'react';
import {
    StyleSheet
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';

import color from '../../../config/color';

export default class ReaderBrowser extends React.Component {
    static propTypes = {
        title: React.PropTypes.string,
        color: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        color: color.theme,
        size: 'medium'
    };

    shouldComponentUpdate(_nextProps) {
        return false;
    }

    render() {
        return (
            <WebViewBridge
                ref='webViewBridge'
                style={styles.container}
                source={{uri: 'http://toripota.com'}}
                injectedJavaScript={injectedJavaScript}
                onBridgeMessage={this.onBridgeMessage.bind(this)}
            />
        );
    }

    send() {
    }

    onBridgeMessage(message) {
        const { webViewBridge } = this.refs;

        switch (message) {
            case 'hello from webview':
                webViewBridge.sendToBridge('hello from react-native');
                break;
            case 'got the message inside webview':
                console.log('we have got a message from webview! yeah');
                break;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
    }
});

const injectedJavaScript = `
(function () {
    if (WebViewBridge) {
        WebViewBridge.onMessage = function (message) {
            if (message === "hello from react-native") {
                WebViewBridge.send("got the message inside webview");
            }
        };
        WebViewBridge.send("hello from webview");
    }
}());
`;
