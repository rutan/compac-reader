import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';
import StatusBarAndroid from 'react-native-android-statusbar';

import color from '../../../config/color';

import ReaderNavigation from './navigation';
import ReaderBrowser from './browser';
import ReaderPager from './pager';

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
                    pageRate={0}
                    onTap={this._onTap.bind(this)}
                    onChangePage={this._onChangePage.bind(this)}
                    onUpdatePageMax={this._onUpdatePageMax.bind(this)}
                    onPullPrev={this._onPullPrev.bind(this)}
                    onPullNext={this._onPullNext.bind(this)}
                />
                {this._renderNavigation()}
                {this._renderPager()}
            </View>
        );
    }

    _renderNavigation() {
        const { episode } = this.props;
        if (!this.state.isShowMenu) return null;

        return (
            <ReaderNavigation
                title={episode.title}
                onPress={this._onBack.bind(this)}
                style={styles.navigation}
            />
        );
    }

    _renderPager() {
        if (!this.state.isShowMenu) return null;

        return (
            <ReaderPager
                style={styles.pager}
                page={this.state.page}
                pageMax={this.state.pageMax || 1}
                onValueChange={this._onChangePage.bind(this)}
            />
        );
    }

    _onBack() {
        this.props.navigator.pop();
    }

    _onTap() {
        this.setState({isShowMenu: !this.state.isShowMenu});
    }

    _onChangePage(page) {
        this.setState({page});
    }

    _onUpdatePageMax(pageMax) {
        this.setState({pageMax});
    }

    _onPullPrev() {
    }

    _onPullNext() {
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    navigation: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0
    },
    pager: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0
    }
});

function mapStateToProps(state) {
    return {
        readingEpisode: state.readingEpisode
    };
}

export default connect(mapStateToProps)(ReaderScreen);
