import Realm from 'realm';
import Story from './story';
import Episode from './episode';
import EpisodeContent from './episode-content';

const realm = new Realm({
    schema: [
        Story,
        Episode,
        EpisodeContent
    ],
    schemaVersion: 6,
    migration: (_oldRealm, newRealm) => {
        newRealm.deleteAll();
    }
});

export {
    realm,
    Story,
    Episode,
    EpisodeContent
};
