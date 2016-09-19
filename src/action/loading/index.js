import Symbol from 'es6-symbol';

export const START = Symbol('START');
export const FINISH = Symbol('FINISH');

export function start() {
    return {
        type: START
    };
}

export function finish() {
    return {
        type: FINISH
    };
}
