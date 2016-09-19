import * as ServiceClient from '../../../lib/service-client';
import * as Record from '../../record';

export function fetch(publisherType, publisherCode, episodeId) {
    return new Promise((resolve, _reject) => {
        const id = `${publisherType}__${publisherCode}__${episodeId}`;
        const episode = Record.realm.objects('Episode').filtered('id = $0', id)[0];
        if (!episode) throw 'missing episode';

        console.log(`request: ${id}`);
        ServiceClient.fetchEpisode(publisherType, publisherCode, episodeId)
            .then((data) => {
                Record.realm.write(() => {
                    const episodeContent = Record.realm.create(
                        'EpisodeContent',
                        Object.assign({id}, data)
                    );
                    episode.isDownloaded = true;
                    resolve(episodeContent.toObject());
                });
            });
    });
}

export function loadOrFetch(publisherType, publisherCode, episodeId) {
    const id = `${publisherType}__${publisherCode}__${episodeId}`;
    const episodeContent = Record.realm.objects('EpisodeContent').filtered('id = $0', id)[0];

    if (episodeContent) {
        console.log(`cache hit: ${id}`);
        return Promise.resolve(episodeContent);
    } else {
        return fetch(publisherType, publisherCode, episodeId);
    }
}
