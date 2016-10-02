import React from 'react';
import ReactDOM from 'react-dom';
import listener from '../lib/listener';

export default class Sheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageMax: 1
        };
    }

    componentDidMount() {
        this._refresh();

        let clear = null;
        this._clearResize = listener(window, 'resize', () => {
            if (clear) clearTimeout(clear);
            clear = setTimeout(() => {
                clear = null;
                this._refresh();
            }, 100);
        });
    }

    componentWillUnmount() {
        this._clearResize();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.body !== nextProps.body;
    }

    componentDidUpdate() {
        this._refresh();
    }

    render() {
        return (
            <div className="book-sheet" ref="root">
            </div>
        );
    }

    _refresh() {
        console.log('generate sheets');

        const element = ReactDOM.findDOMNode(this.refs.root);
        const nodes = Array.prototype.slice.call(this._convertHTMLToNodes(this.props.body));
        element.style.width = 'auto';
        element.innerHTML = '';

        let pageNum = 0;
        let [page, content] = this._createPage(element, pageNum);
        const pageWidth = page.getBoundingClientRect().width;
        element.style.width = `${pageWidth * (pageNum + 1)}px`;

        let node = null;
        while (node || nodes.length > 0) {
            if (!node) node = nodes.shift();
            content.appendChild(node);
            if (content.getBoundingClientRect().width >= pageWidth) {
                content.removeChild(content.lastChild);

                const oldContent = content;
                [page, content] = this._createPage(element, ++pageNum);

                // ここでnodeの分割挿入
                if (node.nodeName === '#text') {
                    const backupHTML = oldContent.innerHTML;
                    const str = node.data;
                    let min = 0;
                    let max = str.length;
                    let n = Math.round(str.length / 2);

                    while (true) {
                        oldContent.innerHTML = backupHTML + str.substr(0, n);
                        if (oldContent.getBoundingClientRect().width >= pageWidth) {
                            max = n - 1;
                        } else {
                            min = n;
                        }

                        if (max - min <= 1) {
                            const nextChar = str.substr(min, 1);
                            if (nextChar.match(/[、。！？]/)) --min;
                            oldContent.innerHTML = backupHTML + str.substr(0, min);
                            node = document.createTextNode(str.substr(min, str.length - min));
                            break;
                        } else {
                            n = min + Math.round((max - min) / 2);
                        }
                    }
                } else {
                    // FIXME
                    content.appendChild(node);
                    node = null;
                }

                element.style.width = `${pageWidth * (pageNum + 1)}px`;
            } else {
                node = null;
            }
        }

        // [メモ] この実装の問題
        // - 1nodeでページを突破する場合即死

        this.props.onRefresh({pageMax: (pageNum + 1)});
    }

    _convertHTMLToNodes(html) {
        const t = document.createElement('div');
        t.innerHTML = html;
        window.n = t.childNodes;
        return t.childNodes;
    }

    _createPage(element, pageNum) {
        const page = document.createElement('div');
        page.className = 'book-sheet__page';
        page.setAttribute('data-page', pageNum);
        element.appendChild(page);
        const content = document.createElement('div');
        content.className = 'book-sheet__content';
        page.appendChild(content);
        return [page, content];
    }
}
