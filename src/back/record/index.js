import Realm from 'realm';
import Story from './story';
import Episode from './episode';

const realm = new Realm({
    schema: [
        Story,
        Episode
    ],
    schemaVersion: 5,
    migration: (_oldRealm, newRealm) => {
        newRealm.deleteAll();
    }
});

export {
    realm,
    Story,
    Episode
};
