import { Navigation } from 'react-native-navigation';
import SplashSceren from '../view/screen/splash';
import HomeScreen from '../view/screen/home';
import StoryScreen from '../view/screen/story';
import ReaderScreen from '../view/screen/reader';
import BrowsingScreen from '../view/screen/browsing';
import VersionScreen from '../view/screen/version';

const prefix = 'com.toripota.compacreader';

export const screenNames = {
    splash: `${prefix}.SplashScreen`,
    home: `${prefix}.HomeScreen`,
    story: `${prefix}.StoryScreen`,
    reader: `${prefix}.ReaderScreen`,
    browsing: `${prefix}.BrowsingScreen`,
    version: `${prefix}.VersionScreen`
};

export function registerScreens(store, Provider) {
    Navigation.registerComponent(screenNames.splash, () => SplashSceren, store, Provider);
    Navigation.registerComponent(screenNames.home, () => HomeScreen, store, Provider);
    Navigation.registerComponent(screenNames.story, () => StoryScreen, store, Provider);
    Navigation.registerComponent(screenNames.reader, () => ReaderScreen, store, Provider);
    Navigation.registerComponent(screenNames.browsing, () => BrowsingScreen, store, Provider);
    Navigation.registerComponent(screenNames.version, () => VersionScreen, store, Provider);
}
