import React from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';

import {screenNames} from '../../../config/router';
import color from '../../../config/color';

import * as StoryAction from '../../../action/story';

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
        if (this._getStory()) {
            this._updateTitle();
        } else {
            const { dispatch, publisherType, publisherCode } = this.props;
            dispatch(StoryAction.fetch(publisherType, publisherCode));
        }
    }

    componentDidUpdate() {
        this._updateTitle();
    }

    render() {
        const story = this._getStory();

        if (!story) {
            // Loading表示
            return <ScrollView></ScrollView>;
        }

        return (
            <ScrollView style={styles.container}>
                <StoryHeader story={story}/>
                <StoryAbstract story={story}/>
                <StoryEpisodes
                    story={story}
                    episodes={story.episodes || []}
                    onPress={this.onSelectEpisode.bind(this)}
                />
            </ScrollView>
        );
    }

    onSelectEpisode(episode) {
        const story = this._getStory();
        if (!story) return;

        this.props.navigator.push({
            screen: screenNames.reader,
            passProps: {
                story,
                episode
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

function mapStateToProps(state) {
    return {
        stories: state.stories
    };
}

export default connect(mapStateToProps)(StoryScreen);
