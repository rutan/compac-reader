import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import color from '../../../../config/color';
import * as TimeFormatter from '../../../../lib/time-formatter';

export default class EpisodeItem extends React.Component {
    static propTypes = {
        episode: React.PropTypes.object.isRequired,
        bookmark: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps) {
        const {episode, bookmark} = this.props;
        const {episode: nextEpisode, bookmark: nextBookmark} = nextProps;

        const changeEpisodeFlag =
            episode.title !== nextEpisode.title ||
            episode.index !== nextEpisode.index ||
            episode.revisedAt !== nextEpisode.revisedAt ||
            episode.isDownload !== nextEpisode.isDownload ||
            episode.isRead !== nextEpisode.isRead;

        const changeBookmarkFlag =
            bookmark.episodeId !== nextBookmark.episodeId &&
            (nextEpisode.episodeId === bookmark.episodeId ||
            nextEpisode.episodeId === nextBookmark.episodeId);

        return changeEpisodeFlag || changeBookmarkFlag;
    }

    render() {
        const {episode} = this.props;

        return (
            <TouchableNativeFeedback
                onPress={this._onPress.bind(this)}
            >
                <View style={styles.container}>
                    {this._renderBookmark()}
                    <Text
                        style={(episode.isRead || episode.isDownload) ? styles.title : styles.titleGray}
                        numberOfLines={1}
                    >
                        {episode.title}
                    </Text>
                    <View style={styles.info}>
                        <Text style={styles.publishedAt}>
                            公開日: {TimeFormatter.toDate(episode.publishedAt)}
                        </Text>
                        {
                            (() => {
                                if (!episode.revisedAt || episode.revisedAt <= episode.publishedAt) return null;
                                return (
                                    <Text style={styles.revisedAt}>
                                        更新日: {TimeFormatter.toDate(episode.revisedAt)}
                                    </Text>
                                );
                            })()
                        }
                    </View>
                    <View style={styles.mark}>
                        {this._renderMark()}
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _renderBookmark() {
        const {
            bookmark,
            episode
            } = this.props;

        if (bookmark.episodeId !== episode.episodeId) return null;
        return (
            <View style={styles.bookmark}/>
        );
    }

    _renderMark() {
        const {episode} = this.props;

        if (episode.isRead) {
            return <Ionicon name='md-checkmark' size={14} color={color.theme} />;
        } else if (episode.isDownload) {
            return <Ionicon name='md-book' size={14} color={color.textLight} />;
        } else {
            return null;
        }
    }

    _onPress() {
        const {
            episode,
            onPress
            } = this.props;

        onPress(episode);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.back,
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    bookmark: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 5,
        backgroundColor: color.theme
    },
    title: {
        color: color.text,
        fontSize: 17,
        lineHeight: 25,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    titleGray: {
        color: color.textLight,
        fontSize: 17,
        lineHeight: 25,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
    info: {
        flexDirection: 'row',
        marginTop: 5,
        marginLeft: 20,
        marginRight: 20
    },
    publishedAt: {
        color: color.textLight,
        fontSize: 13
    },
    revisedAt: {
        marginLeft: 15,
        color: color.textLight,
        fontSize: 13
    },
    mark: {
        position: 'absolute',
        bottom: 10,
        right: 10
    }
});
