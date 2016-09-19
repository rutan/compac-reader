export default class Episode {
    static schema = {
        name: 'Episode',
        primaryKey: 'id',
        properties: {
            id: 'string',
            storyId: {type: 'string', indexed: true},
            type: 'string',
            title: 'string',
            index: {type: 'int', indexed: true, default: 0},
            publishedAt: {type: 'int', optional: true},
            revisedAt: {type: 'int', indexed: true, optional: true},
            downloadedAt: {type: 'int', default: 0, optional: true},
            isRead: {type: 'bool', default: false}
        }
    };

    get publisherType() {
        return this.parseId()[0];
    }

    get publisherCode() {
        return this.parseId()[1];
    }

    get episodeId() {
        return this.parseId()[2];
    }

    get isDownloaded() {
        return this.downloadedAt > 0;
    }

    parseId() {
        const [publisherType, publisherCode, episodeId] = this.id.split('__');
        return [publisherType, publisherCode, episodeId];
    }

    toObject() {
        return {
            id: this.id,
            storyId: this.storyId,
            publisherType: this.publisherType,
            publisherCode: this.publisherCode,
            episodeId: this.episodeId,
            type: this.type,
            title: this.title,
            index: this.index,
            publishedAt: this.publishedAt,
            revisedAt: this.revisedAt,
            isDownload: this.isDownloaded,
            isRead: this.isRead,
            downloadedAt: this.downloadedAt
        };
    }
}
