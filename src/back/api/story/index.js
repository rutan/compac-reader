import * as ServiceClient from '../../../lib/service-client';
import * as Record from '../../record';

export function loadAll() {
    return new Promise((resolve, _reject) => {
        const stories = Record.realm.objects('Story').sorted('lastUpdatedAt', {ascending: false});
        resolve(stories.map(story => story.toObject()));
    });
}

export function refreshAll() {
    return loadAll();
}

export function fetchOrRefresh(publisherType, publisherCode) {
    return new Promise((resolve, _reject) => {
        ServiceClient.fetchStory(publisherType, publisherCode)
            .then((data) => {
                Record.realm.write(() => {
                    console.log(data);

                    const story = Record.realm.create('Story', Object.assign({
                        id: `${publisherType}__${publisherCode}`
                    }, data), true);

                    const newestEpisode = Record.realm.objects('Episode')
                        .filtered('storyId == $0', story.id)
                        .sorted('revisedAt', {ascending: false})[0];
                    if (newestEpisode) story.lastUpdatedAt = newestEpisode.revisedAt;

                    resolve(story.toObject());
                });
            });
    });
}
