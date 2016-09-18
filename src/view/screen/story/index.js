import React from 'react';
import {
    StyleSheet,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import StatusBarAndroid from 'react-native-android-statusbar';

import color from '../../../config/color';

import StoryHeader from './header';
import StoryAbstract from './abstract';
import StoryEpisodes from './episodes';

class StoryScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light'
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
        const { story } = this.props;

        StatusBarAndroid.setHexColor(color.statusBar);
        this.props.navigator.setTitle({
            title: story.title
        });
    }

    render() {
        const {
            story
            } = this.props;

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
        console.log(episode);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    }
});

function mapStateToProps(_state) {
    return {};
}

export default connect(mapStateToProps)(StoryScreen);
