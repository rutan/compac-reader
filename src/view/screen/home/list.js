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
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
        this.state.dataSource = this.generateDataSource(props.stories);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: this.generateDataSource(nextProps.stories)
        });
    }

    render() {
        if (this.props.stories.length === 0) {
            return null;
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                initialListSize={20}
                initialListSize={10}
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

    generateDataSource(stories) {
        return this.state.ds.cloneWithRows(stories);
    }
}
