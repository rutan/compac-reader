import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import { connect } from 'react-redux';

import {screenNames} from '../../../config/router';
import color from '../../../config/color';

import * as StoryAction from '../../../action/story';
import * as ReadingEpisodeAction from '../../../action/reading-episode';

import StoryHeader from './header';
import StoryAbstract from './abstract';
import StoryEpisodes from './episodes';

class StoryScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        statusBarColor: color.statusBar
    };

    static navigatorButtons = {
        rightButtons: [
            {
                id: 'remove',
                title: '削除',
                showAsAction: 'never'
            },
            {
                id: 'download',
                title: 'すべてダウンロード',
                showAsAction: 'never'
            }
        ]
    };

    componentDidMount() {
        const {navigator, dispatch, publisherType, publisherCode} = this.props;
        navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));

        if (this._getStory()) {
            this._updateTitle();
        } else {
            dispatch(StoryAction.fetch(publisherType, publisherCode));
        }
    }

    componentDidUpdate() {
        this._updateTitle();
    }

    render() {
        const {isLoading} = this.props;
        const story = this._getStory();

        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={this._onRefresh.bind(this)}
                        colors={[color.theme]}
                    />
                }
            >
                { story ? this._renderContent(story) : null }
            </ScrollView>
        );
    }

    _renderContent(story) {
        return (
            <View>
                <StoryHeader story={story}/>
                <StoryAbstract story={story}/>
                <StoryEpisodes
                    episodes={story.episodes || []}
                    bookmark={story.bookmark}
                    onPress={this._onSelectEpisode.bind(this)}
                />
            </View>
        );
    }

    _onRefresh() {
        const {dispatch, publisherType, publisherCode} = this.props;
        dispatch(StoryAction.fetch(publisherType, publisherCode));
    }

    _onSelectEpisode(episode) {
        const story = this._getStory();
        if (!story) return;

        const pageRate = (story.bookmark && story.bookmark.episodeId === episode.episodeId) ? story.bookmark.pageRate : 0;

        this.props.navigator.push({
            screen: screenNames.reader,
            passProps: {
                publisherType: story.publisherType,
                publisherCode: story.publisherCode,
                episodeId: episode.episodeId,
                initialPageRate: pageRate
            }
        });
    }

    _getStory() {
        const {stories, publisherType, publisherCode} = this.props;
        return stories.filter((story) => {
            return story.publisherType === publisherType &&
                story.publisherCode === publisherCode;
        })[0];
    }

    _updateTitle() {
        const story = this._getStory();
        if (!story) return;
        this.props.navigator.setTitle({
            title: story.title
        });
    }

    _onNavigatorEvent(e) {
        const {dispatch, publisherType, publisherCode} = this.props;

        if (e.type !== 'NavBarButtonPress') return;
        switch (e.id) {
            case 'download':
                dispatch(ReadingEpisodeAction.downloadAll(publisherType, publisherCode));
                break;
            case 'remove':
                break;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

function mapStateToProps(state) {
    return {
        stories: state.stories,
        isLoading: state.loading > 0
    };
}

export default connect(mapStateToProps)(StoryScreen);
