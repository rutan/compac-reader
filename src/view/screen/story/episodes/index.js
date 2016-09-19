import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import SectionHeader from '../../../component/section-header';
import EpisodeList from './list';

export default class StoryEpisodes extends React.Component {
    static propTypes = {
        episodes: React.PropTypes.array.isRequired,
        bookmark: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps) {
        return this.props.episodes !== nextProps.episodes ||
            this.props.bookmark !== nextProps.bookmark ||
            this.props.onPress !== nextProps.onPress;
    }

    render() {
        const {
            episodes,
            bookmark,
            onPress
            } = this.props;

        return (
            <View style={styles.container}>
                <SectionHeader
                    title="エピソード一覧"
                    style={styles.header}
                />
                <EpisodeList
                    episodes={episodes}
                    bookmark={bookmark}
                    onPress={onPress}
                    level={0}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});
