import * as ServiceClient from '../../../lib/service-client';

export function loadAll() {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve(generateDummyData());
        }, 1000);
    });
}

export function refreshAll() {
    return loadAll();
}

export function fetchOrRefresh(publisherType, publisherCode) {
    return new Promise((resolve, _reject) => {
        ServiceClient.fetchStory(publisherType, publisherCode)
            .then((story) => {
                resolve(story);
            });
    });
}

function generateDummyData() {
    return [
        {
            publisherType: 'narou',
            publisherCode: 'n1',
            title: 'タイトル',
            authorName: '著者名',
            description: '領都のあるギルドに、辺境の村から1通の依頼が届きました。\n仕事の内容は魔物退治。村の近くに住む洞窟に住む魔物を退治してほしいとのこと。\n\nですが、長年の経験を持つギルドのボスの勘が何かを訴えます。\nこの仕事……ただでは済まない、何か裏があるようです。 \nそこでボスは、ギルドの中でも腕の立つ2人の若者を村に派遣することにしました。',
            lastUpdatedAt: Date.now(),
            bookmark: {
                episodeId: 'abc'
            },
            episodes: [
                {
                    type: 'episode',
                    title: 'プロローグ',
                    publishedAt: Date.now()
                },
                {
                    type: 'header',
                    title: '第一章 たびだち',
                    children: [
                        {
                            type: 'header',
                            title: '第一部 るたん編',
                            children: [
                                {
                                    episodeId: 'abc',
                                    type: 'episode',
                                    title: '第一話 出発',
                                    publishedAt: Date.now(),
                                    revisedAt: Date.now()
                                },
                                {
                                    type: 'episode',
                                    title: '第ニ話 終点'
                                }
                            ]
                        },
                        {
                            type: 'episode',
                            title: '第一章あとがき'
                        }
                    ]
                },
                {
                    type: 'header',
                    title: '第ニ章 決戦',
                    children: [
                        {
                            type: 'episode',
                            title: '最終話'
                        }
                    ]
                },
                {
                    type: 'episode',
                    title: 'エピローグ'
                }
            ]
        },
        {
            publisherType: 'narou',
            publisherCode: 'n2',
            title: 'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
            authorName: '著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名',
            description: '領都のあるギルドに、辺境の村から1通の依頼が届きました。\n仕事の内容は魔物退治。村の近くに住む洞窟に住む魔物を退治してほしいとのこと。\n\nですが、長年の経験を持つギルドのボスの勘が何かを訴えます。\nこの仕事……ただでは済まない、何か裏があるようです。 \nそこでボスは、ギルドの中でも腕の立つ2人の若者を村に派遣することにしました。',
            lastUpdatedAt: Date.now(),
            bookmark: {
                episodeId: 'def'
            },
            episodes: [
                {
                    type: 'episode',
                    episodeId: 'def',
                    title: '第一話'
                },
                {
                    type: 'episode',
                    episodeId: 'def2',
                    title: '長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル'
                }
            ]
        },
        {
            publisherType: 'narou',
            publisherCode: 'n3',
            title: 'タイトル',
            authorName: '著者名',
            description: '',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n4',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n5',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n6',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n7',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n8',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n9',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            publisherType: 'narou',
            publisherCode: 'n10',
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        }
    ];
}
