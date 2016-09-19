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

    constructor(props) {
        super(props);
        this.state = {
            isShowList: false
        };
    }

    componentDidMount() {
        // 重いので一瞬遅れて描画させてみる
        setTimeout(() => {
            this.setState({isShowList: true});
        }, 0);
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionHeader
                    title="エピソード一覧"
                    style={styles.header}
                />
                {this.state.isShowList ? this._renderList() : null}
            </View>
        );
    }

    _renderList() {
        const {
            episodes,
            bookmark,
            onPress
            } = this.props;

        return (
            <EpisodeList
                episodes={episodes}
                bookmark={bookmark}
                onPress={onPress}
                level={0}
            />
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
