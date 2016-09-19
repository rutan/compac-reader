import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

import {screenNames} from '../../../config/router';
import color from '../../../config/color';

import * as StoryAction from '../../../action/story';

import SectionHeader from '../../component/section-header';
import FloatingButton from '../../component/floating-button';
import StoryList from './list';

class HomeScreen extends React.Component {
    static navigatorStyle = {
        navBarTextColor: color.textForTheme,
        navBarButtonColor: color.textForTheme,
        navBarBackgroundColor: color.theme,
        statusBarTextColorScheme: 'light',
        statusBarColor: color.statusBar
    };

    static navigatorButtons = {
        rightButtons: [
            {
                id: 'version',
                title: 'バージョン情報',
                showAsAction: 'never'
            },
            {
                id: 'settings',
                title: '設定',
                showAsAction: 'never'
            },
            {
                id: 'refresh',
                title: '小説を更新',
                showAsAction: 'never'
            }
        ]
    };

    componentDidMount() {
        const { dispatch, navigator } = this.props;
        dispatch(StoryAction.loadAll());
        navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    render() {
        const {
            stories
            } = this.props;

        return (
            <View style={styles.container}>
                <SectionHeader
                    title={`登録済みの小説 (${stories.length} 件)`}
                />
                <ScrollView>
                    <StoryList
                        stories={stories}
                        onPress={this._onSelectStory.bind(this)}
                    />
                </ScrollView>
                <FloatingButton
                    style={styles.floatingButton}
                >
                    <Ionicon name="md-add" size={30} color="#ffffff"/>
                </FloatingButton>
            </View>
        );
    }

    _onSelectStory(story) {
        this.props.navigator.push({
            screen: screenNames.story,
            passProps: {
                story
            }
        });
    }

    _onNavigatorEvent(e) {
        const { dispatch } = this.props;

        if (e.type !== 'NavBarButtonPress') return;
        switch (e.id) {
            case 'refresh':
                dispatch(StoryAction.refreshAll());
                break;
            case 'settings':
                break;
            case 'version':
                break;
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    floatingButton: {
        position: 'absolute',
        right: 15,
        bottom: 15
    }
});

function mapStateToProps(state) {
    return {
        stories: state.stories
    };
}

export default connect(mapStateToProps)(HomeScreen);
