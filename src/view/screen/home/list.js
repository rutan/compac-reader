import React from 'react';
import {
    ListView
} from 'react-native';

import StoryItem from './item';

export default class StoryList extends React.Component {
    static propTypes = {
        stories: React.PropTypes.array.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: this.generateDataSource()
        };
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
            >
            </ListView>
        );
    }

    renderRow(rowData) {
        return (
            <StoryItem
                story={rowData}
                onPress={this.props.onPress}
            />
        );
    }

    generateDataSource() {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(this.props.stories);
    }
}
