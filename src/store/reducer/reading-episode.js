import * as ReadingEpisodeAction from '../../action/reading-episode';

export default function readingEpisode(state, action) {
    switch (action.type) {
        case ReadingEpisodeAction.LOAD:
            return action.payload;
        case ReadingEpisodeAction.CLEAR:
            return Object.assign({}, emptyState);
        default:
            return (state || Object.assign({}, emptyState));
    }
}

const emptyState = {
    title: '',
    body: ''
};