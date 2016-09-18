import { combineReducers } from 'redux';
import launchTime from './launch-time';
import stories from './stories';
import readingEpisode from './reading-episode';

export default combineReducers({
    launchTime,
    stories,
    readingEpisode
});
