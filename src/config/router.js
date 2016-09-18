import { Navigation } from 'react-native-navigation';
import HomeScreen from '../view/screen/home';
import StoryScreen from '../view/screen/story';
import ReaderScreen from '../view/screen/reader';

const prefix = 'com.toripota.compacreader';

export const screenNames = {
    home: `${prefix}.HomeScreen`,
    story: `${prefix}.StoryScreen`,
    reader: `${prefix}.ReaderScreen`,
};

export function registerScreens(store, Provider) {
    Navigation.registerComponent(screenNames.home, () => HomeScreen, store, Provider);
    Navigation.registerComponent(screenNames.story, () => StoryScreen, store, Provider);
    Navigation.registerComponent(screenNames.reader, () => ReaderScreen, store, Provider);
}
