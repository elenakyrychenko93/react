import React, { Component } from 'react';

export default class Article extends Component {
    constructor(props) {
        super(props);
        this.toogleText = this.toogleText.bind(this);
        this.state = {showText: false};
    }

    toogleText(e) {
        e.preventDefault();
        this.setState({showText: !this.state.showText});
    }

    render() {
        return <div className="Article">
            <article>
                <h1 className="article_name">{this.props.data.articleName}</h1>
                <p className="article_prev">{this.props.data.articlePrev}</p>

                {/*<div className={'article_text ' + (showText ? '' : 'none')}>{this.props.data.articleText}</div>*/}
                <div className={'article_text ' + (this.state.showText ? '' : 'none')}>{this.props.data.articleText}</div>

                <div className="Buttons">
                    {/*<button className="open_more" onClick={this.openMore}>{buttonText}</button>*/}
                    <button className="open_more" onClick={this.toogleText}>{this.state.showText? "Hide Text":"Show Text"}</button>
                    {/*<button className="delete" onClick={this.delete}>Delete</button>*/}
                    <button className="delete" onClick={(e) => this.props.onDelete(e, this.props.data.id)}>Delete</button>
                </div>
                {/*<Buttons />*/}
            </article>
        </div>
    }
}