import React from 'react';
import {
    StyleSheet
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';

import Base64 from '../../../lib/base64';
import color from '../../../config/color';

export default class ReaderBrowser extends React.Component {
    static propTypes = {
        body: React.PropTypes.string.isRequired,
        pageRate: React.PropTypes.number.isRequired,
        onTap: React.PropTypes.func.isRequired,
        onPullPrev: React.PropTypes.func.isRequired,
        onPullNext: React.PropTypes.func.isRequired,
        onUpdatePageMax: React.PropTypes.func.isRequired,
        onChangePage: React.PropTypes.func.isRequired
    };

    static defaultProps = {
        color: color.theme,
        size: 'medium'
    };

    constructor(props) {
        super(props);
        this.caches = Object.assign({}, props);
    }

    shouldComponentUpdate(nextProps) {
        if (this.caches.page !== nextProps.page) {
            this.sendMessage('page', nextProps.page);
        }
        return false;
    }

    render() {
        return (
            <WebViewBridge
                ref='webViewBridge'
                style={styles.container}
                source={{uri: 'file:///android_asset/reader/index.html'}}
                injectedJavaScript={injectedJavaScript}
                onBridgeMessage={this._onBridgeMessage.bind(this)}
            />
        );
    }

    sendMessage(type, data) {
        const { webViewBridge } = this.refs;
        webViewBridge.sendToBridge(Base64.encode(JSON.stringify({type, data})));
    }

    _startRenderHTML() {
        const { body, pageRate } = this.props;
        this.sendMessage('load', {
            body,
            pageRate
        });
    }

    _onBridgeMessage(message) {
        const {type, data} = JSON.parse(message);
        switch (type) {
            case 'loaded':
                this._startRenderHTML();
                break;
            case 'drawn':
                this.caches.pageMax = data.pageMax;
                this.props.onUpdatePageMax(data.pageMax);
                break;
            case 'changePage':
                this.caches.page = data.page;
                this.props.onChangePage(data.page);
                break;
            case 'tap':
                this.props.onTap();
                break;
            case 'pullPrev':
                this.props.onPullPrev();
                break;
            case 'pullNext':
                this.props.onPullNext();
                break;
            case 'debug':
                console.log(data);
                break;
            default:
                console.error(data);
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

const injectedJavaScript = 'window.initBridge();';
