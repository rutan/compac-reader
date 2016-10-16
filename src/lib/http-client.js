import cheerio from 'cheerio';
import RNFetchBlob from 'react-native-fetch-blob'

const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 CompacReaderClient/0.0.0'
};

export function fetchRaw(url, options = {}) {
    return fetch(url, Object.assign({}, {
        headers: defaultHeaders
    }, options));
}

export function fetchRawBlob(url, _options = {}) {
    return RNFetchBlob.fetch('GET', url, defaultHeaders);
}

export function fetchHTML(url, options = {}) {
    return fetchRaw(url, options)
        .then((resp) => resp.text())
        .then((html) => cheerio.load(html));
}

export function fetchJSON(url, options = {}) {
    return fetchRaw(url, options)
        .then((resp) => resp.json());
}

export function fetchBlobBase64(url, options = {}) {
    return fetchRawBlob(url, options)
        .then((resp) => resp.base64());
}
