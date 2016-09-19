import * as ReadingEpisodeAction from '../../action/reading-episode';

export default function readingEpisode(state, action) {
    switch (action.type) {
        case ReadingEpisodeAction.LOAD:
            return action.payload;
        default:
            return (state || {});
    }
}
