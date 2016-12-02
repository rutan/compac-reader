import * as ServiceClient from '../../../lib/service-client';
import * as Record from '../../record';

export function loadAll() {
    return new Promise((resolve, _reject) => {
        const stories = Record.realm.objects('Story').sorted('lastUpdatedAt', true);
        resolve(stories.map(story => story.toObject()));
    });
}

export function refreshAll() {
    return loadAll().then((stories) => {
        const list = stories.map((story) => fetch(story.publisherType, story.publisherCode));
        return Promise.all(list);
    });
}

export function fetch(publisherType, publisherCode) {
    return new Promise((resolve, _reject) => {
        const id = `${publisherType}__${publisherCode}`;
        const oldStory = Record.realm.objects('Story').filtered('id == $0', id)[0];
        const oldData = (() => {
            if (oldStory) {
                return {
                    icon: oldStory.icon
                };
            } else {
                return {};
            }
        })();

        ServiceClient.fetchStory(publisherType, publisherCode)
            .then((data) => {
                Record.realm.write(() => {
                    const oldHeader = Record.realm.objects('Episode').filtered('storyId == $0 AND type != "episode"', `${publisherType}__${publisherCode}`);
                    Record.realm.delete(oldHeader);

                    const story = Record.realm.create('Story', Object.assign({
                        id
                    }, data, oldData), true);

                    const newestEpisode = story.episodes.sorted('revisedAt', true)[0];
                    if (newestEpisode) story.lastUpdatedAt = newestEpisode.revisedAt;

                    resolve(story.toObject());
                });
            });
    });
}

export function updateBookmark(publisherType, publisherCode, episodeId, pageRate) {
    const id = `${publisherType}__${publisherCode}`;
    return new Promise((resolve) => {
        const story = Record.realm.objects('Story').filtered('id == $0', id)[0];
        const episode = story.episodes.filtered('id == $0', `${id}__${episodeId}`)[0];

        Record.realm.write(() => {
            if (story.bookmark) {
                story.bookmark.episodeId = episodeId;
                story.bookmark.pageRate = pageRate;
                if (!episode.isRead) episode.isRead = true;
            } else {
                story.bookmark = Record.realm.create('Bookmark', {
                    episodeId, pageRate
                });
            }
            resolve(story.toObject());
        });
    });
}

export function attachIcon(publisherType, publisherCode, base64Image) {
    const id = `${publisherType}__${publisherCode}`;
    return new Promise((resolve) => {
        const story = Record.realm.objects('Story').filtered('id == $0', id)[0];
        Record.realm.write(() => {
            story.icon = base64Image;
            resolve(story.toObject());
        });
    });
}

export function remove(publisherType, publisherCode) {
    const id = `${publisherType}__${publisherCode}`;
    return new Promise((resolve) => {
        const story = Record.realm.objects('Story').filtered('id == $0', id)[0];

        if (story) {
            Record.realm.write(() => {
                const episodeContents =
                    Array.from(story.episodes)
                        .filter((episode) => episode.downloadedAt > 0)
                        .map((episode) => {
                            return Record.realm.objects('EpisodeContent').filtered('id == $0', episode.id)[0];
                        });
                Record.realm.delete(episodeContents);
                Record.realm.delete(story.episodes);
                Record.realm.delete(story);
                resolve();
            });
        } else {
            resolve();
        }
    });
}
