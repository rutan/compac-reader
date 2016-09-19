import * as ServiceClient from '../../../lib/service-client';

export function fetchOrLoad(publisherType, publisherCode, episodeId) {
    return new Promise((resolve, _reject) => {
        ServiceClient.fetchEpisode(publisherType, publisherCode, episodeId)
            .then((episode) => {
                resolve(episode);
            });
    });
}
