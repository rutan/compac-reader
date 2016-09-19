import * as StoryAction from '../../action/story';

export default function stories(state, action) {
    switch (action.type) {
        case StoryAction.LOAD_ALL:
            return action.payload;
        default:
            return (state || []);
    }
}
