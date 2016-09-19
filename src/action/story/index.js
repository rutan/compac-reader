import Symbol from 'es6-symbol';
import * as loading from '../loading';
import * as StoryAPI from '../../back/api/story';

export const LOAD_ALL = Symbol('LOAD_ALL');
export const REFRESH_ALL = Symbol('REFRESH_ALL');

export function loadAll() {
    return (dispatch) => {
        dispatch(loading.start());

        StoryAPI.loadAll()
            .then((stories) => {
                dispatch({
                    type: LOAD_ALL,
                    payload: stories
                });
                dispatch(loading.finish());
            })
            .catch(() => {
                dispatch(loading.finish());
            });
    };
}

export function refreshAll() {
    return (dispatch) => {
        dispatch(loading.start());

        StoryAPI.refreshAll()
            .then((stories) => {
                dispatch({
                    type: REFRESH_ALL,
                    payload: stories
                });
                dispatch(loading.finish());
            })
            .catch(() => {
                dispatch(loading.finish());
            });
    };
}

export function fetch(publisherType, publisherCode) {
    return (dispatch) => {
        dispatch(loading.start());

        StoryAPI.fetchOrRefresh(publisherType, publisherCode)
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
