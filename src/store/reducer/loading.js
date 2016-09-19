import * as LoadingAction from '../../action/loading';

export default function loading(state, action) {
    switch (action.type) {
        case LoadingAction.START:
            return ++state;
        case LoadingAction.FINISH:
            return (state > 0 ? --state : 0);
        default:
            return (state || 0);
    }
}
