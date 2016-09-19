export default class Story {
    static schema = {
        name: 'Story',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            authorName: 'string',
            description: 'string',
            lastUpdatedAt: { type: 'int', indexed: true, default: 0 },
            episodes: {type: 'list', objectType: 'Episode'}
        }
    };

    get publisherType() {
        return this.parseId()[0];
    }

    get publisherCode() {
        return this.parseId()[1];
    }

    parseId() {
        const [publisherType, publisherCode] = this.id.split('__');
        return [publisherType, publisherCode];
    }

    toObject() {
        return {
            id: this.id,
            publisherType: this.publisherType,
            publisherCode: this.publisherCode,
            title: this.title,
            authorName: this.authorName,
            description: this.description,
            lastUpdatedAt: this.lastUpdatedAt,
            episodes: this.episodes.map(episode => episode.toObject())
        };
    }
}
