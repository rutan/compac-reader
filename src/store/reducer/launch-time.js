export default function launchTime(state, _action) {
    return (state || Date.now());
}
