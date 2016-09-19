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
        episodes: React.PropTypes.array.isRequired,
        bookmark: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired,
        level: React.PropTypes.number
    };

    static defaultProps = {
        level: 0
    };

    constructor(props) {
        super(props);

        this.state = {
            ds: new ListView.DataSource({
                rowHasChanged: ((r1, r2) => r1 !== r2)
            })
        };
        this.state.dataSource = this.generateDataSource(props.episodes);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({dataSource: this.generateDataSource(nextProps.episodes)});
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
                initialListSize={5}
                pageSize={10}
            >
            </ListView>
        );
    }

    renderRow(episode) {
        const { bookmark, level, onPress } = this.props;
        switch (episode.type) {
            case 'header':
                return (
                    <EpisodeChapter
                        episode={episode}
                        level={level + 1}
                        onPress={onPress}
                    />
                );
            case 'episode':
                return (
                    <EpisodeItem
                        episode={episode}
                        bookmark={bookmark}
                        level={level}
                        onPress={onPress}
                    />
                );
            default:
                return '';
        }
    }

    generateDataSource(episodes) {
        return this.state.ds.cloneWithRows(episodes);
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