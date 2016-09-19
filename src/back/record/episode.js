export default class Episode {
    static schema = {
        name: 'Episode',
        primaryKey: 'id',
        properties: {
            id: 'string',
            storyId: 'string',
            type: 'string',
            title: 'string',
            publishedAt: {type: 'int', indexed: true, optional: true},
            revisedAt: {type: 'int', indexed: true, optional: true},
            children: {type: 'list', objectType: 'Episode'}
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
            episodeId: this.episodeId,
            type: this.type,
            title: this.title,
            publishedAt: this.publishedAt,
            revisedAt: this.revisedAt,
            children: this.children.map(episode => episode.toObject())
        };
    }
}
