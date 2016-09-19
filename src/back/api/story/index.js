import * as ServiceClient from '../../../lib/service-client';
import * as Record from '../../record';

export function loadAll() {
    return new Promise((resolve, _reject) => {
        const stories = Record.realm.objects('Story').sorted('lastUpdatedAt', true);
        resolve(stories.map(story => story.toObject()));
    });
}

export function refreshAll() {
    return loadAll();
}

export function fetch(publisherType, publisherCode) {
    return new Promise((resolve, _reject) => {
        ServiceClient.fetchStory(publisherType, publisherCode)
            .then((data) => {
                Record.realm.write(() => {
                    const oldHeader = Record.realm.objects('Episode').filtered('storyId == $0 AND type != "episode"', `${publisherType}__${publisherCode}`);
                    Record.realm.delete(oldHeader);

                    const story = Record.realm.create('Story', Object.assign({
                        id: `${publisherType}__${publisherCode}`
                    }, data), true);

                    const newestEpisode = story.episodes.sorted('revisedAt', true)[0];
                    if (newestEpisode) story.lastUpdatedAt = newestEpisode.revisedAt;

                    resolve(story.toObject());
                });
            });
    });
}
