import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Slider from 'react-native-slider';

import color from '../../../config/color';

export default class ReaderPager extends React.Component {
    static propTypes = {
    };

    render() {
        const { page, pageMax, style } = this.props;

        const styleContainer = StyleSheet.flatten([
            styles.container,
            (style || {})
        ]);

        return (
            <View style={styleContainer}>
                <View style={styles.count}>
                    <Text style={styles.countText}>
                        {pageMax}
                    </Text>
                </View>
                <Slider
                    value={pageMax - page - 1}
                    maximumValue={pageMax - 1}
                    step={1}
                    style={styles.slider}
                    trackStyle={styles.sliderTrack}
                    thumbStyle={styles.sliderThumb}
                    minimumTrackTintColor='#444'
                    maximumTrackTintColor={color.themeLight}
                    onValueChange={this.onValueChange.bind(this)}
                />
                <View style={styles.count}>
                    <Text style={styles.countText}>
                        {page + 1}
                    </Text>
                </View>
            </View>
        );
    }

    onValueChange(n) {
        const { pageMax, onValueChange } = this.props;
        onValueChange(pageMax - n - 1);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#33333399',
        height: 56,
        paddingLeft: 5,
        paddingRight: 5
    },
    count: {
        width: 56,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    countText: {
        color: '#fff',
        textAlign: 'center'
    },
    slider: {
        flex: 1,
        height: 56
    },
    sliderTrack: {
        height: 2,
        borderRadius: 2
    },
    sliderThumb: {
        width: 15,
        height: 15,
        borderRadius: 8,
        backgroundColor: color.themeLight
    }
});
