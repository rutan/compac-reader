export default class Bookmark {
    static schema = {
        name: 'Bookmark',
        properties: {
            episodeId: {type: 'string', default: ''},
            pageRate: {type: 'double', default: 0}
        }
    };

    toObject() {
        return {
            episodeId: this.episodeId,
            pageRate: this.pageRate
        };
    }
}
