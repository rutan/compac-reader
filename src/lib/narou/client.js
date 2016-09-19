import * as httpClient from '../http-client';

const NCODE_URL_BASE = 'http://ncode.syosetu.com';

/**
 * load from `http://ncode.syosetu.com/:id/`
 * @param code
 * @returns {*|Promise.<T>}
 */
export function fetchStory(publisherCode) {
    const url = `${NCODE_URL_BASE}/${publisherCode}/`;

    return httpClient.fetchHTML(url).then(($) => {
        const storyId = `narou__${publisherCode}`;
        const title = $('.novel_title').text();
        const authorName = $('.novel_writername a').text();
        const description = $('#novel_ex').text();

        const episodes = [];
        let chapter = episodes;
        $('.chapter_title, .novel_sublist2').map((i, element) => {
            const el = $(element);
            const type = el.attr('class') === 'chapter_title' ? 'header' : 'episode';
            if (type === 'header') {
                const title = el.text();
                const newChapter = {
                    id: `narou__${publisherCode}__header-${i}`,
                    storyId,
                    type,
                    title,
                    children: []
                };
                episodes.push(newChapter);
                chapter = newChapter.children;
            } else {
                const episodeId = el.find('.subtitle a').attr('href').replace(`/${publisherCode}/`, '').replace('/', '');
                const title = el.find('.subtitle').text();
                const luContents = el.find('.long_update').contents();
                const publishedAt = parseDateFromString(luContents[0].data);
                const revisedAt = luContents.length > 1 ? parseDateFromString($(luContents[1]).attr('title')) : publishedAt;
                chapter.push({
                    id: `narou__${publisherCode}__${episodeId}`,
                    storyId,
                    type,
                    episodeId,
                    title,
                    publishedAt,
                    revisedAt
                });
            }
        }).get();

        return ({
            id: storyId,
            publisherType: 'narou',
            publisherCode,
            title,
            authorName,
            description,
            episodes
        });
    });
}

/**
 * load from `http://ncode.syosetu.com/:id/:episodeId/`
 * @param code
 * @param episodeId
 * @returns {*|Promise.<T>}
 */
export function fetchEpisode(code, episodeId) {
    const url = `${NCODE_URL_BASE}/${code}/${episodeId}/`;

    return httpClient.fetchHTML(url).then(($) => {
        const title = $('.novel_subtitle').text();
        const body = $('#novel_honbun').html();

        return ({
            title,
            body
        });
    });
}

function parseDateFromString(str) {
    const m = str.match(/(\d+)年\s*(\d+)月\s*(\d+)日/);
    if (!m) return 0;
    return Date.parse(`${m[1]}/${m[2]}/${m[3]}`) + (60 * 60 * 9);
}
