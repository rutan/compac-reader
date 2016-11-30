import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableNativeFeedback
} from 'react-native';

import color from '../../../config/color';
import * as TimeFormatter from '../../../lib/time-formatter';

export default class StoryItem extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    render() {
        const {
            story
            } = this.props;

        return (
            <TouchableNativeFeedback
                onPress={this.onPress.bind(this)}
            >
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{uri: story.icon}}
                    />
                    <View style={styles.info}>
                        <Text
                            style={styles.title}
                            numberOfLines={2}
                        >
                            {story.title}
                        </Text>
                        <Text
                            style={styles.author}
                            numberOfLines={1}
                        >
                            著者: {story.authorName}
                        </Text>
                        <Text
                            style={styles.updated}
                            numberOfLines={1}
                        >
                            更新日: {TimeFormatter.toDate(story.lastUpdatedAt)}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    onPress() {
        const {
            story,
            onPress
            } = this.props;

        onPress(story);
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.back,
        flexDirection: 'row',
        padding: 5
    },
    image: {
        width: 72,
        height: 72,
        borderRadius: 4
    },
    info: {
        flex: 1,
        marginLeft: 5
    },
    title: {
        color: color.text,
        fontSize: 17,
        lineHeight: 25
    },
    author: {
        color: color.textLight,
        fontSize: 13
    },
    updated: {
        color: color.textLight,
        fontSize: 13
    }
});
