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
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトルタイトル',
            authorName: '著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
        {
            title: 'タイトル',
            authorName: '著者名',
            lastUpdatedAt: Date.now()
        },
    ]
};
