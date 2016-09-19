import { combineReducers } from 'redux';
import launchTime from './launch-time';
import stories from './stories';
import readingEpisode from './reading-episode';
import loading from './loading';

export default combineReducers({
    launchTime,
    stories,
    readingEpisode,
    loading
});
