import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { connect } from 'react-redux';

import color from '../../../config/color';

import * as StoryAction from '../../../action/story';
import * as ReadingEpisodeAction from '../../../action/reading-episode';

import ReaderNavigation from './navigation';
import ReaderBrowser from './browser';
import ReaderPager from './pager';

class ReaderScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        statusBarColor: color.statusBar,
        navBarHidden: true
    };

    constructor(props) {
        super(props);

        this.state = {
            isShowMenu: false,
            page: 0,
            pageMax: 1,
            pageRate: props.initialPageRate || 0
        };
    }

    componentDidMount() {
        const {
            dispatch,
            publisherType,
            publisherCode,
            episodeId
            } = this.props;

        dispatch(ReadingEpisodeAction.fetch(publisherType, publisherCode, episodeId));
    }

    componentDidUpdate(prevProps) {
        const {
            dispatch,
            publisherType,
            publisherCode,
            episodeId
            } = this.props;

        if (publisherType !== prevProps.publisherType ||
            publisherCode !== prevProps.publisherCode ||
            episodeId !== prevProps.episodeId) {
            dispatch(ReadingEpisodeAction.fetch(publisherType, publisherCode, episodeId));
        }
    }

    componentWillMount() {
        this._updateBookmark();
    }

    render() {
        const {
            readingEpisode
            } = this.props;
        const {
            page,
            pageMax,
            pageRate
            } = this.state;

        return (
            <View style={styles.container}>
                <ReaderBrowser
                    page={page}
                    pageMax={pageMax}
                    body={readingEpisode.body}
                    pageRate={pageRate}
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

    _updateBookmark(wait = 1000) {
        if (this._bookmarkUpdator) clearTimeout(this._bookmarkUpdator);
        this._bookmarkUpdator = setTimeout(() => {
            console.log('update bookmark');
            const {dispatch, publisherType, publisherCode, episodeId} = this.props;
            const pageRate = this.state.page / this.state.pageMax;
            dispatch(StoryAction.updateBookmark(publisherType, publisherCode, episodeId, pageRate));
        }, wait);
    }

    _renderNavigation() {
        const { readingEpisode } = this.props;
        if (!this.state.isShowMenu) return null;

        return (
            <ReaderNavigation
                title={readingEpisode.title}
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
        this._updateBookmark();
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
        stories: state.stories,
        readingEpisode: state.readingEpisode
    };
}

export default connect(mapStateToProps)(ReaderScreen);
