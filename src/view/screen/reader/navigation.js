import React from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default class ReaderNavigation extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func.isRequired
    };

    render() {
        const { title, onPress, style } = this.props;

        const styleContainer = StyleSheet.flatten([
            styles.container,
            (style || {})
        ]);

        return (
            <View style={styleContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Ionicon name="md-close" size={30} color="#fff"/>
                </TouchableOpacity>
                <View style={styles.title}>
                    <Text
                        style={styles.titleText}
                        numberOfLines={1}
                    >
                        {title}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#33333399',
        height: 56,
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 16,
        paddingRight: 16
    },
    title: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 52
    },
    titleText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center'
    }
});
