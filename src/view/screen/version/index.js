import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Image,
    Text,
    TouchableNativeFeedback,
    Linking
} from 'react-native';
import color from '../../../config/color';
import url from '../../../config/url';

import logoImage from './img/logo.png';
import packageJSON from '../../../../package.json';

class VersionScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        statusBarColor: color.statusBar
    };

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'バージョン情報'
        });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logo}>
                    <Image
                        style={styles.image}
                        source={logoImage}
                        resizeMode="contain"
                    />
                </View>
                <View
                    style={styles.listItem}
                >
                    <Text
                        style={styles.listText}
                    >
                        バージョン v.{packageJSON.version}
                    </Text>
                </View>
                <TouchableNativeFeedback
                    onPress={this._onPressSourceCode.bind(this)}
                >
                    <View
                        style={styles.listItem}
                    >
                        <Text
                            style={styles.listText}
                        >
                            ソースコード
                        </Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={this._onPressAuthor.bind(this)}
                >
                    <View
                        style={styles.listItem}
                    >
                        <Text
                            style={styles.listText}
                        >
                            つくったひと: @ru_shalm
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </ScrollView>
        );
    }

    _onPressSourceCode() {
        Linking.openURL(url.github)
            .catch((e) => {
                console.error('An error occurred', e);
            });
    }

    _onPressAuthor() {
        Linking.openURL(url.authorPage)
            .catch((e) => {
                console.error('An error occurred', e);
            });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1'
    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    image: {
        width: 340,
        height: 148,
        marginTop: 50,
        marginBottom: 50
    },
    listItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 1
    },
    listText: {
        fontSize: 16
    }
});

export default VersionScreen;
