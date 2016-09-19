import cheerio from 'cheerio';

export function fetchRaw(url, options = {}) {
    return fetch(url, Object.assign({
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36 CompacReaderClient/0.0.0'
        }
    }, options));
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
