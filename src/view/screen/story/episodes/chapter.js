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

    constructor(props) {
        super(props);
        this.state = {
            isShowList: false
        };
    }

    componentDidMount() {
        const {
            level,
            } = this.props;

        // 重いので一瞬遅れて描画させてみる
        setTimeout(() => {
            this.setState({isShowList: true});
        }, (level + 1) * Math.random());
    }

    render() {
        const {
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
                {this.state.isShowList ? this._renderList() : null}
            </View>
        );
    }

    _renderList() {
        const {
            story,
            episode,
            level,
            onPress
            } = this.props;

        return (
            <EpisodeList
                story={story}
                episodes={episode.children}
                level={level}
                onPress={onPress}
            />
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
