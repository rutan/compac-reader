import React from 'react';
import ReactDOM from 'react-dom';
import CompacNovelView from './novel-view';

class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
            page: 0,
            pageMax: 1,
            pageRate: 0,
            backgroundColor: '#fffff1',
            textColor: '#333333',
            fontSize: 18,
            fontName: 'CompacFont',
            version: 0
        };
        this.handler = () => {
        };
    }

    render() {
        return (
            <CompacNovelView
                emitter={this.emitter.bind(this)}
                body={this.state.body}
                page={this.state.page}
                backgroundColor={this.state.backgroundColor}
                textColor={this.state.textColor}
                fontSize={this.state.fontSize}
                fontName={this.state.fontName}
                version={this.state.version}
            />
        );
    }

    emitter(type, data) {
        switch (type) {
            case 'drawn':
                this._refresh(data);
                break;
            case 'changePage':
                this.setPage(data.page);
                break;
        }
        this.handler(type, data);
    }

    _refresh(data) {
        const { pageMax } = data;
        const newPage = Math.floor(this.state.pageRate * pageMax);
        this.setState({
            pageMax,
            page: newPage,
            version: this.state.version + 1
        });
    }

    setBody(body) {
        this.setState({body});
    }

    getBody() {
        return this.state.body;
    }

    setPage(page) {
        if (page < 0) page = 0;
        if (page >= this.state.pageMax) page = this.state.pageMax - 1;
        this.setState({
            page,
            pageRate: page / this.state.pageMax
        });
    }

    getPage() {
        return this.state.page;
    }

    getPageMax() {
        return this.state.pageMax;
    }

    getPageRate() {
        return this.state.pageRate;
    }

    setPageRate(pageRate) {
        if (pageRate < 0) pageRate = 0;
        if (pageRate >= 1) pageRate = 0.99999;
        this.setState({pageRate});
    }

    getFontSize() {
        return this.state.fontSize;
    }

    setFontSize(fontSize) {
        this.setState({fontSize});
    }

    getTextColor() {
        return this.state.textColor;
    }

    setTextColor(textColor) {
        this.setState({textColor});
    }

    getBackgroundColor() {
        return this.state.backgroundColor;
    }

    setBackgroundCOlor(backgroundColor) {
        this.setState({backgroundColor});
    }

    setHandler(handler) {
        this.handler = handler;
    }
}

export default function renderWrapper(element) {
    return ReactDOM.render(
        <Wrapper
            refs='wrapper'
        />,
        element
    );
}
