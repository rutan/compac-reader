import React from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet
} from 'react-native';

import color from '../../../../config/color';

import EpisodeChapter from './chapter';
import EpisodeItem from './item';

export default class EpisodeList extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        episodes: React.PropTypes.array.isRequired,
        onPress: React.PropTypes.func.isRequired,
        level: React.PropTypes.number
    };

    static defaultProps = {
        level: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.generateDataSource()
        };
    }

    render() {
        const { episodes } = this.props;

        if (episodes.length === 0) {
            return (
                <View style={styles.missingContainer}>
                    <Text style={styles.missingText}>
                        エピソードはありません
                    </Text>
                </View>
            );
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            >
            </ListView>
        );
    }

    renderRow(episode) {
        const { story, level, onPress } = this.props;
        switch (episode.type) {
            case 'header':
                return (
                    <EpisodeChapter
                        story={story}
                        episode={episode}
                        level={level + 1}
                        onPress={onPress}
                    />
                );
            case 'episode':
                return (
                    <EpisodeItem
                        story={story}
                        episode={episode}
                        level={level}
                        onPress={onPress}
                    />
                );
            default:
                return '';
        }
    }

    generateDataSource() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(this.props.episodes);
    }
}


const styles = StyleSheet.create({
    missingContainer: {
        padding: 20
    },
    missingText: {
        color: color.textLight,
        fontSize: 14,
        textAlign: 'center'
    }
});