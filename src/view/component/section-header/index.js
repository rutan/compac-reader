import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import color from '../../../config/color';

export default class SectionHeader extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        color: React.PropTypes.string,
        size: React.PropTypes.string
    };

    static defaultProps = {
        color: color.theme,
        size: 'medium'
    };

    render() {
        const {
            title,
            color,
            size,
            style
            } = this.props;

        const styles = styleSet[size];
        const styleContainer = StyleSheet.flatten([styles.container, (style || {})]);
        const styleText = StyleSheet.flatten([styles.text, {color}]);

        return (
            <View style={styleContainer}>
                <Text
                    style={styleText}
                    numberOfLines={1}
                >
                    {title}
                </Text>
            </View>
        );
    }
}

const styleSet = {
    medium: StyleSheet.create({
        container: {
            height: 40
        },
        text: {
            color: color.theme,
            fontSize: 16,
            margin: 10
        }
    }),
    slim: StyleSheet.create({
        container: {
            height: 30
        },
        text: {
            color: color.theme,
            fontSize: 14,
            margin: 6,
            marginLeft: 10,
            marginRight: 10
        }
    })
};
