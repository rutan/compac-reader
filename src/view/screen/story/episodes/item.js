import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback
} from 'react-native';

import color from '../../../../config/color';
import * as TimeFormatter from '../../../../lib/time-formatter';

export default class EpisodeItem extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        episode: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    render() {
        const {
            episode
            } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={this.onPress.bind(this)}
            >
                <View style={styles.container}>
                    {this.renderBookmark()}
                    <Text
                        style={styles.title}
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
                </View>
            </TouchableNativeFeedback>
        );
    }

    renderBookmark() {
        const {
            story,
            episode
            } = this.props;

        // FIXME
        if (story.bookmark && story.bookmark.episodeId !== episode.episodeId) return null;

        return (
            <View style={styles.bookmark}/>
        );
    }

    onPress() {
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
    }
});
