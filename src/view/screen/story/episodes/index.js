import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import SectionHeader from '../../../component/section-header';
import EpisodeList from './list';

export default class StoryEpisodes extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        episodes: React.PropTypes.array.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    render() {
        const {
            story,
            episodes,
            onPress
            } = this.props;

        return (
            <View style={styles.container}>
                <SectionHeader
                    title="エピソード一覧"
                    style={styles.header}
                />
                <EpisodeList
                    story={story}
                    episodes={episodes}
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
