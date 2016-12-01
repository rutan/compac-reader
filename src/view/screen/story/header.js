import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import color from '../../../config/color';

export default class StoryHeader extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired,
        onSelectImage: React.PropTypes.func.isRequired
    };

    render() {
        const {
            story
        } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this._onPressIcon.bind(this)}
                >
                    <Image
                        style={styles.image}
                        source={{uri: story.icon}}
                    />
                </TouchableOpacity>
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

    _onPressIcon() {
        const {
            onSelectImage
        } = this.props;

        ImagePicker.openPicker({
            width: 256,
            height: 256,
            cropping: true,
            includeBase64: true,
            cropperTintColor: color.theme
        }).then((image) => {
            onSelectImage(`data:${image.mime};base64,${image.data}`);
        }).catch((e) => {
            console.log(e);
        });
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
        borderRadius: 36
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
