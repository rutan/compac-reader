import Symbol from 'es6-symbol';
import * as loading from '../loading';
import * as StoryAPI from '../../back/api/story';

export const LOAD_ALL = Symbol('LOAD_ALL');

export function loadAll() {
    return (dispatch) => {
        StoryAPI.loadAll()
            .then((stories) => {
                dispatch({
                    type: LOAD_ALL,
                    payload: stories
                });
            });
    };
}

export function refreshAll() {
    return (dispatch) => {
        dispatch(loading.start());

        StoryAPI.refreshAll()
            .then(() => {
                StoryAPI.loadAll()
                    .then((stories) => {
                        dispatch({
                            type: LOAD_ALL,
                            payload: stories
                        });
                        dispatch(loading.finish());
                    });
            })
            .catch(() => {
                dispatch(loading.finish());
            });
    };
}

export function fetch(publisherType, publisherCode) {
    return (dispatch) => {
        dispatch(loading.start());

        StoryAPI.fetch(publisherType, publisherCode)
            .then((story) => {
                if (!story.bookmark) {
                    story.bookmark = {};
                }
                dispatch(loadAll());
                dispatch(loading.finish());
            })
            .catch((e) => {
                dispatch(loading.finish());
                console.error(e);
            });
    };
}

export function updateBookmark(publisherType, publisherCode, episodeId, pageRate) {
    return (dispatch) => {
        StoryAPI.updateBookmark(
            publisherType, publisherCode, episodeId, pageRate)
            .then(() => {
                dispatch(loadAll());
            });
    };
}

export function attachIcon(publisherType, publisherCode, base64Image) {
    return (dispatch) => {
        StoryAPI.attachIcon(publisherType, publisherCode, base64Image)
            .then(() => {
                dispatch(loadAll());
            });
    };
}

export function remove(publisherType, publisherCode) {
    return (dispatch) => {
        StoryAPI.remove(publisherType, publisherCode)
            .then(() => {
                dispatch(loadAll());
            });
    };
}
