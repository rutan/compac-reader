import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default function initStore() {
    const state = Object.assign({}, initialState);
    const store = createStore(
        reducer,
        state,
        compose(
            applyMiddleware(thunk)
        )
    );

    return store;
}

const initialState = {
    launchTime: 0,
    stories: [
        // dummy data
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '領都のあるギルドに、辺境の村から1通の依頼が届きました。\n仕事の内容は魔物退治。村の近くに住む洞窟に住む魔物を退治してほしいとのこと。\n\nですが、長年の経験を持つギルドのボスの勘が何かを訴えます。\nこの仕事……ただでは済まない、何か裏があるようです。 \nそこでボスは、ギルドの中でも腕の立つ2人の若者を村に派遣することにしました。',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
            authorName: '著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名',
            description: '領都のあるギルドに、辺境の村から1通の依頼が届きました。\n仕事の内容は魔物退治。村の近くに住む洞窟に住む魔物を退治してほしいとのこと。\n\nですが、長年の経験を持つギルドのボスの勘が何かを訴えます。\nこの仕事……ただでは済まない、何か裏があるようです。 \nそこでボスは、ギルドの中でも腕の立つ2人の若者を村に派遣することにしました。',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            description: '説明文',
            lastUpdatedAt: Date.now()
        },
    ]
};
