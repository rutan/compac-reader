import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

import color from '../../../config/color';

export default class StoryHeader extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired
    };

    render() {
        const {
            story
            } = this.props;

        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                />
                <View style={styles.info}>
                    <Text
                        style={styles.title}
                    >
                        {story.title}
                    </Text>
                    <Text
                        style={styles.author}
                    >
                        著者: {story.authorName}
                    </Text>
                </View>
            </View>
        );
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
    }
});
