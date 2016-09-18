import { Navigation } from 'react-native-navigation';
import HomeScreen from '../view/screen/home';
import StoryScreen from '../view/screen/story';

const prefix = 'com.toripota.compacreader';

export const screenNames = {
    home: `${prefix}.HomeScreen`,
    story: `${prefix}.StoryScreen`
};

export function registerScreens(store, Provider) {
    Navigation.registerComponent(screenNames.home, () => HomeScreen, store, Provider);
    Navigation.registerComponent(screenNames.story, () => StoryScreen, store, Provider);
}
