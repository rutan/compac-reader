import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import color from '../../../config/color';

import SectionHeader from '../../component/section-header';

export default class StoryAbstract extends React.Component {
    static propTypes = {
        story: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    render() {
        const {story} = this.props;
        const {isOpen} = this.state;

        if (!story.description || story.description.length === 0) return null;

        return (
            <View style={styles.container}>
                <SectionHeader
                    title="あらすじ"
                />
                <View
                    style={isOpen ? styles.bodyWithOpen : styles.bodyWithClose}
                    onLayout={this.onLayoutBody.bind(this)}
                >
                    <Text
                        style={styles.bodyText}
                    >
                        {story.description}
                    </Text>
                    {this.renderOpenButton()}
                </View>
            </View>
        );
    }

    renderOpenButton() {
        if (this.state.isOpen) return null;

        return (
            <LinearGradient style={styles.open} colors={['#ffffff00', '#ffffff99', '#ffffffff', '#ffffffff']}>
                <TouchableOpacity
                    style={styles.openInner}
                    onPress={this.onPress.bind(this)}
                >
                    <Text style={styles.openText}>
                        すべて表示
                    </Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }

    onLayoutBody(e) {
        const {isOpen} = this.state;
        const {height} = e.nativeEvent.layout;
        if (isOpen) return;

        if (height < bodyMaxHeight) {
            this.setState({isOpen: true});
        }
    }

    onPress() {
        this.setState({
            isOpen: true
        });
    }
}

const bodyMaxHeight = 80;

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.back,
        paddingBottom: 15
    },
    bodyWithOpen: {},
    bodyWithClose: {
        maxHeight: bodyMaxHeight
    },
    bodyText: {
        color: color.text,
        fontSize: 15,
        lineHeight: 26,
        marginLeft: 10,
        marginRight: 10
    },
    open: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50
    },
    openInner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50
    },
    openText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        color: color.theme,
        fontSize: 16,
        textAlign: 'center'
    }
});
