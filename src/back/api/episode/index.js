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
                        Object.assign({id}, data),
                        true
                    );
                    episode.downloadedAt = Date.now();
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

export function downloadAll(publisherType, publisherCode) {
    const downloader = (episode) => {
        return () => {
            return fetch(episode.publisherType, episode.publisherCode, episode.episodeId);
        };
    };

    return new Promise((resolve) => {
        const id = `${publisherType}__${publisherCode}`;
        const story = Record.realm.objects('Story').filtered('id == $0', id)[0];

        const promises = Array.from(story.episodes).filter((episode) => {
            return episode.revisedAt > episode.downloadedAt;
        }).map((episode) => downloader(episode));
        promises.push(() => {
            return new Promise((r) => {
                r();
                resolve();
            });
        });

        promises.reduce((prev, curr) => {
            return prev.then(curr);
        }, Promise.resolve());
    });
}
