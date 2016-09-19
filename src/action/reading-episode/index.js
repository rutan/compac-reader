import Symbol from 'es6-symbol';
import * as loading from '../loading';
import * as EpisodeAPI from '../../back/api/episode';

export const LOAD = Symbol('LOAD');
export const CLEAR = Symbol('CLEAR');

export function fetch(publisherType, publisherCode, episodeId) {
    return (dispatch) => {
        dispatch(loading.start());

        EpisodeAPI.loadOrFetch(publisherType, publisherCode, episodeId)
            .then((episode) => {
                dispatch({
                    type: LOAD,
                    payload: episode
                });
                dispatch(loading.finish());
            })
            .catch((e) => {
                dispatch(loading.finish());
                console.error(e);
            });
    };
}

export function clear() {
    return {
        type: CLEAR
    };
}
