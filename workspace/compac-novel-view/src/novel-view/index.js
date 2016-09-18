import React from 'react';
import ReactDOM from 'react-dom';

import listener from '../lib/listener';
import Sheet from './sheet';

export default class CompacNovelView extends React.Component {
    static propTypes = {
        emitter: React.PropTypes.func.isRequired,
        body: React.PropTypes.string.isRequired,
        page: React.PropTypes.number.isRequired,
        backgroundColor: React.PropTypes.string.isRequired,
        textColor: React.PropTypes.string.isRequired,
        fontSize: React.PropTypes.number.isRequired,
        fontName: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.state = {
            pageMax: 1
        };
    }

    render() {
        const {
            emitter,
            body
            } = this.props;

        return (
            <div
                className="compac-novel-view"
                style={this.generateStyle()}
                ref="root">
                <Sheet
                    ref="sheet"
                    body={body}
                    onRefresh={this._onRefresh.bind(this)}
                />
            </div>
        );
    }

    generateStyle() {
        const {
            backgroundColor,
            textColor,
            fontSize,
            fontName
            } = this.props;

        return {
            backgroundColor,
            color: textColor,
            fontSize: `${fontSize}px`,
            fontFamily: fontName,
            lineHeight: 1.8,
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }
    }

    componentDidMount() {
        this._refreshPage();
        this._clearKeyDown = listener(document, 'keydown', this._onKeydown.bind(this));
        this._setupTouchEvent();
    }

    componentWillUnmount() {
        this._clearKeyDown();
        this._clearTouch();
    }

    shouldComponentUpdate(nextProps) {
        return (
            this.props.page !== nextProps.page ||
            this.props.body !== nextProps.body ||
            this.props.version !== nextProps.version
        );
    }

    componentDidUpdate(_prevProps, _prevState) {
        this._refreshPage();
        this._setupTouchEvent();
    }

    _setupTouchEvent() {
        this._clearTouch();

        const element = ReactDOM.findDOMNode(this.refs.root);
        const sheet = ReactDOM.findDOMNode(this.refs.sheet);

        let dragging = false;
        let startTime = 0;
        let startX = 0;
        let lastX = 0;

        this._clearTouchStart = listener(element, 'touchstart', (e) => {
            if (e.which !== 0) return;

            dragging = true;
            startTime = Date.now();
            sheet.classList.add('book-sheet--no-animation');
            startX = lastX = e.touches[0].screenX;
        });

        this._clearTouchMove = listener(element, 'touchmove', (e) => {
            if (e.which !== 0) return;
            if (!dragging) return;

            const x = e.touches[0].screenX;
            sheet.style.left = `${parseInt(sheet.style.left) + (x - lastX)}px`;
            lastX = x;
        });

        this._clearTouchEnd = listener(element, 'touchend', (e) => {
            if (!dragging) return;
            if (e.which !== 0) return;

            dragging = false;
            sheet.classList.remove('book-sheet--no-animation');

            const threshold = sheet.querySelectorAll('div')[0].getBoundingClientRect().width / 10;
            const n = lastX - startX;
            if (n > threshold) {
                if (this.props.page < this.state.pageMax - 1) {
                    this.props.emitter('changePage', {page: this.props.page + 1});
                } else {
                    this.props.emitter('pullNext');
                    this._refreshPage();
                }
            } else if (n < -threshold) {
                if (this.props.page > 0) {
                    this.props.emitter('changePage', {page: this.props.page - 1});
                } else {
                    this.props.emitter('pullPrev');
                    this._refreshPage();
                }
            } else {
                if (Date.now() - startTime <= 100) {
                    this.props.emitter('tap');
                }
                this._refreshPage();
            }
        });
    }

    _clearTouch() {
        if (this._clearTouchStart) {
            this._clearTouchStart();
            this._clearTouchMove();
            this._clearTouchEnd();
            this._clearTouchStart = this._clearTouchMove = this._clearTouchEnd = null;
        }
    }

    _refreshPage() {
        console.log('refreshPage');
        const sheet = ReactDOM.findDOMNode(this.refs.sheet);
        const pageWidth = sheet.querySelectorAll('div')[0].getBoundingClientRect().width;
        sheet.style.left = `${-pageWidth * (this.state.pageMax - this.props.page - 1)}px`;
    }

    _onKeydown(e) {
        switch (e.keyCode) {
            case 37: // left
                this.props.emitter('changePage', {page: this.props.page + 1});
                break;
            case 39: // right
                this.props.emitter('changePage', {page: this.props.page - 1});
                break;
        }
    }

    _onRefresh(e) {
        console.log('onRefresh');
        console.log(e);
        this.setState({
            pageMax: e.pageMax
        });
        this.props.emitter('drawn', e);
    }
}
