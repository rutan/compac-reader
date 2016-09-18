export default function (target, type, listener) {
    target.addEventListener(type, listener);
    return target.removeEventListener.bind(target, type, listener);
}