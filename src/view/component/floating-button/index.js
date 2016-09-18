import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import color from '../../../config/color';

export default class FloatingButton extends React.Component {
    static propTypes = {
        size: React.PropTypes.string,
        color: React.PropTypes.string,
        elevation: React.PropTypes.number,
        disabled: React.PropTypes.bool,
        onPress: React.PropTypes.func
    };

    static defaultProps = {
        size: 'large',
        color: color.theme,
        elevation: 20,
        disabled: false,
        onPress: () => {
        }
    };

    componentDidMount() {
    }

    render() {
        const {
            size,
            color,
            elevation,
            disabled,
            onPress,
            style,
            children
            } = this.props;

        const container = StyleSheet.flatten([{
            width: (size === 'large') ? 56 : 48,
            height: (size === 'large') ? 56 : 48,
            borderRadius: ((size === 'large') ? 56 : 48) / 2,
            backgroundColor: '#ffffff'
        }, (style || {})]);

        const innerContainer = {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: ((size === 'large') ? 56 : 48) / 2,
            backgroundColor: color
        };

        return (
            <View
                style={container}
                elevation={elevation}
            >
                <TouchableOpacity
                    style={innerContainer}
                    disabled={disabled}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>
            </View>
        );
    }
}
