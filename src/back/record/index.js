import Realm from 'realm';
import Story from './story';
import Episode from './episode';
import EpisodeContent from './episode-content';
import Bookmark from './bookmark';

const realm = new Realm({
    schema: [
        Story,
        Episode,
        EpisodeContent,
        Bookmark
    ],
    schemaVersion: 9,
    migration: (_oldRealm, newRealm) => {
        newRealm.deleteAll();
    }
});

export {
    realm,
    Story,
    Episode,
    EpisodeContent,
    Bookmark
};
