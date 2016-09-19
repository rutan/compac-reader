export default class EpisodeContent {
    static schema = {
        name: 'EpisodeContent',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            body: 'string'
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

    parseId() {
        const [publisherType, publisherCode, episodeId] = this.id.split('__');
        return [publisherType, publisherCode, episodeId];
    }

    toObject() {
        return {
            id: this.id,
            publisherType: this.publisherType,
            publisherCode: this.publisherCode,
            title: this.title,
            body: this.body
        };
    }
}
