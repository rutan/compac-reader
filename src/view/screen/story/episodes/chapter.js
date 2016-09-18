import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

import color from '../../../../config/color';

import SectionHeader from '../../../component/section-header';
import EpisodeList from './list';

export default class EpisodeChapter extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        episode: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired,
        level: React.PropTypes.number
    };

    static defaultProps = {
        level: 0
    };

    render() {
        const {
            story,
            episode,
            level
            } = this.props;

        const isSlim = (level >= 2);

        return (
            <View style={styles.container}>
                <SectionHeader
                    title={episode.title}
                    style={styles.header}
                    size={isSlim ? 'slim' : 'medium'}
                    color={isSlim ? color.sub : color.theme}
                />
                <EpisodeList
                    story={story}
                    episodes={episode.children}
                    level={level}
                    onPress={this.props.onPress}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.back
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    }
});
