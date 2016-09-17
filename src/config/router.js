import { Navigation } from 'react-native-navigation';
import HomeScreen from '../view/screen/home';

const prefix = 'com.toripota.compacreader';

export const screenNames = {
    home: `${prefix}.HomeScreen`
};

export function registerScreens(store, Provider) {
    Navigation.registerComponent(screenNames.home, () => HomeScreen, store, Provider);
}
