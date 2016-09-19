import * as NarouClient from './narou/client';

export function fetchStory(publisherType, publisherCode) {
    switch (publisherType) {
        case 'narou':
            return NarouClient.fetchStory(publisherCode);
        default:
            throw 'unknown publisher';
    }
}

export function fetchEpisode(publisherType, publisherCode, episodeId) {
    switch (publisherType) {
        case 'narou':
            return NarouClient.fetchEpisode(publisherCode, episodeId);
        default:
            throw 'unknown publisher';
    }
}
