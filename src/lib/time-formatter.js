export function toDate(timestamp) {
    const date = new Date(timestamp || 0);
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
