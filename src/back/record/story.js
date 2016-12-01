import * as Image from '../../config/image.js';

export default class Story {
    static schema = {
        name: 'Story',
        primaryKey: 'id',
        properties: {
            id: 'string',
            title: 'string',
            authorName: 'string',
            description: 'string',
            icon: 'string',
            lastUpdatedAt: {type: 'int', indexed: true, default: 0},
            episodes: {type: 'list', objectType: 'Episode'},
            bookmark: 'Bookmark'
        }
    };

    get publisherType() {
        return this.parseId()[0];
    }

    get publisherCode() {
        return this.parseId()[1];
    }

    getIcon() {
        return this.icon && this.icon.length > 0 ? this.icon : Image.defaultIcon;
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
            icon: this.getIcon(),
            lastUpdatedAt: this.lastUpdatedAt,
            episodes: this.episodes
                .sorted('index', false)
                .map(episode => episode.toObject()),
            bookmark: (this.bookmark ? this.bookmark.toObject() : {})
        };
    }
}
