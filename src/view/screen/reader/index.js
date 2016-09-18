import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import StatusBarAndroid from 'react-native-android-statusbar';

import color from '../../../config/color';

import ReaderBrowser from './browser';

class ReaderScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.state = {
            isShowMenu: false,
            page: 0,
            pageMax: 1
        };
    }

    componentDidMount() {
        StatusBarAndroid.setHexColor(color.statusBar);
    }

    render() {
        const {
            readingEpisode
            } = this.props;
        const {
            page,
            pageMax
            } = this.state;

        return (
            <View style={styles.container}>
                <ReaderBrowser
                    page={page}
                    pageMax={pageMax}
                    body={readingEpisode.body}
                />
                {this.renderMenu()}
            </View>
        );
    }

    renderMenu() {
        if (!this.state.isShowMenu) return null;

        return (
            <View style={styles.bottomMenu}>
                <Text>Menu</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    bottomMenu: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 56,
        backgroundColor: '#333'
    }
});

function mapStateToProps(state) {
    return {
        readingEpisode: state.readingEpisode
    };
}

export default connect(mapStateToProps)(ReaderScreen);
