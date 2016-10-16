export default function (text) {
    const element = convertElement(text);
    wrappingImageNode(element);
    const textNodes = Array.prototype.concat.apply([], extractTextNode(element));
    textNodes.forEach((node) => replaceTextNode(node));
    return element.innerHTML;
};

function convertElement(text) {
    const element = document.createElement('div');
    element.innerHTML = text;
    return element;
}

function wrappingImageNode(element) {
    Array.from(element.childNodes).map((node) => {
        if (node.nodeName !== 'IMG') return;
        const wrapper = document.createElement('div');
        wrapper.classList.add('illust');
        node.parentNode.insertBefore(wrapper, node);
        node.parentNode.removeChild(node);
        wrapper.appendChild(node);
    });
}

function extractTextNode(element) {
    return Array.from(element.childNodes).map((child) => {
        switch (child.nodeName) {
            case '#text':
                return child;
            default:
                return extractTextNode(child);
        }
    });
}

function replaceTextNode(node) {
    if (!node.data) return;
    node.data = replaceText(node.data);

    const splits = node.data.split(REPLACE_REGEXP);
    if (splits.length < 2) return;
    splits.map((str) => {
        if (str.length === 0) {
            return null;
        } else if (SIDEWAYS_CHARS.includes(str)) {
            const element = document.createElement('span');
            element.classList.add('sideways');
            element.innerText = str;
            return element;
        } else if (COMBINE_CHARS.includes(str)) {
            const element = document.createElement('span');
            element.classList.add('combine');
            str = str.replace(/！/g, '!');
            str = str.replace(/？/g, '?');
            element.innerText = str;
            return element;
        } else {
            return document.createTextNode(str);
        }
    }).forEach((newNode) => {
        if (!newNode) return;
        node.parentNode.insertBefore(newNode, node);
    });
    node.parentNode.removeChild(node);
}

function replaceText(text) {
    text = text.replace(/\s?\(\s?/g, '（');
    text = text.replace(/\s?\)\s?/g, '）');
    text = text.replace(/\s?\!\s?/g, '！');
    text = text.replace(/\s?\?\s?/g, '？');
    text = text.replace(/\s?(“|❝|")\s?/g, '〝');
    text = text.replace(/\s?(”|❞)\s?/g, '〟');
    text = text.replace(/\s?:\s?/g, '：');
    text = text.replace(/\s?;\s?/g, '；');
    text = text.replace(/\s?<\s?/g, '＜');
    text = text.replace(/\s?>\s?/g, '＞');
    text = text.replace(/\s?\[\s?/g, '［');
    text = text.replace(/\s?\]\s?/g, '］');
    return text;
}

const SIDEWAYS_CHARS = ['＜', '＞', '：', '；', '-', '−'];
const COMBINE_CHARS = ['！！', '！？', '？！', '！！！', '！！？', '？？！'];
const REPLACE_REGEXP = new RegExp(`(${SIDEWAYS_CHARS.join('|')}|${COMBINE_CHARS.join('|')})`);
