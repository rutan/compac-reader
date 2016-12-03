import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import {connect} from 'react-redux';
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
            /*
             {
             id: 'settings',
             title: '設定',
             showAsAction: 'never'
             },
             */
            {
                id: 'refresh',
                title: '小説を更新',
                showAsAction: 'never'
            }
        ]
    };

    componentDidMount() {
        const {dispatch, navigator} = this.props;
        navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
        setTimeout(() => {
            dispatch(StoryAction.loadAll());
        }, 0);
    }

    render() {
        const {
            stories,
            isLoading
        } = this.props;

        return (
            <View style={styles.container}>
                <SectionHeader
                    title={`登録済みの小説 (${stories.length} 件)`}
                />
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isLoading}
                            onRefresh={this._onRefresh.bind(this)}
                            colors={[color.theme]}
                        />
                    }
                >
                    <StoryList
                        stories={stories}
                        onPress={this._onSelectStory.bind(this)}
                    />
                    <View style={styles.dummyView}/>
                </ScrollView>
                <FloatingButton
                    style={styles.floatingButton}
                    onPress={this._onPressAddButton.bind(this)}
                >
                    <Ionicon name="md-add" size={30} color="#ffffff"/>
                </FloatingButton>
            </View>
        );
    }

    _onPressAddButton() {
        this.props.navigator.push({
            screen: screenNames.browsing,
            passProps: {
                type: 'narou'
            }
        });
    }

    _onSelectStory(story) {
        this.props.navigator.push({
            screen: screenNames.story,
            passProps: {
                publisherType: story.publisherType,
                publisherCode: story.publisherCode
            }
        });
    }

    _onRefresh() {
        const {dispatch} = this.props;
        dispatch(StoryAction.refreshAll());
    }

    _onNavigatorEvent(e) {
        if (e.type !== 'NavBarButtonPress') return;
        switch (e.id) {
            case 'refresh':
                this._onRefresh();
                break;
            case 'settings':
                break;
            case 'version':
                this._onOpenVersion();
                break;
        }
    }

    _onOpenVersion() {
        this.props.navigator.push({
            screen: screenNames.version,
            passProps: {}
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    dummyView: {
        height: 60
    },
    floatingButton: {
        position: 'absolute',
        right: 15,
        bottom: 15
    }
});

function mapStateToProps(state) {
    return {
        stories: state.stories,
        isLoading: state.loading > 0
    };
}

export default connect(mapStateToProps)(HomeScreen);
