import { combineReducers } from 'redux';
import launchTime from './launch-time';
import stories from './stories';

export default combineReducers({
    launchTime,
    stories
});
