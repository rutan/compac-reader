import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import initStore from './store';
import { screenNames, registerScreens } from './config/router.js';

export default function () {
    const store = initStore();
    registerScreens(store, Provider);

    Navigation.startSingleScreenApp({
        screen: {
            screen: screenNames.splash,
            navigatorStyle: {}
        }
    });
}
