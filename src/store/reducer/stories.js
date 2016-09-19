import * as StoryAction from '../../action/story';

export default function stories(state, action) {
    switch (action.type) {
        case StoryAction.LOAD_ALL:
            return action.payload;
        case StoryAction.ADD:
            return mergeStory(state, action.payload);
        default:
            return (state || []);
    }
}

function mergeStory(stories, newStory) {
    return stories.filter((story) => {
        return !(story.publisherType === newStory.publisherType && story.publisherCode === newStory.publisherCode);
    }).concat([newStory]);
}
