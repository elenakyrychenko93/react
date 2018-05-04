import React, { Component } from 'react';
import {BaseRequests} from "./fetchRequests";
import EventEmitter from "emitter-js/dist/emitter";

const requests = new BaseRequests();
let ee = require('event-emitter');
let emitter = new EventEmitter(), listener;

export class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleName: '',
            articlePrev: '',
            articleText: '',
        };
    };

    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value});
    };

    onBtnClickHandler = (e) => {
        let item = {
            articleName: this.state.articleName,
            articlePrev: this.state.articlePrev,
            articleText: this.state.articleText
        };

        e.preventDefault();

        requests.addArticle(item).then(r => {
            emitter.emit('Article.add', item);
        })
    };

    render () {
        return (
            <form className='addForm'>
                <input
                    name='articleName'
                    type='text'
                    className='add__author'
                    value={this.state.articleName}
                    onChange={this.handleUserInput}
                    placeholder='Заголовок'
                />
                <textarea
                    name='articlePrev'
                    className='add__text'
                    value={this.state.articlePrev}
                    onChange={this.handleUserInput}
                    placeholder='Превью текст'
                ></textarea>
                <textarea
                    name='articleText'
                    className='add__bigText'
                    value={this.state.articleText}
                    onChange={this.handleUserInput}
                    placeholder='Текст новости'
                ></textarea>

                <button
                    type='submit'
                    className='add__btn'
                    onClick={this.onBtnClickHandler}
                    >
                    Add
                </button>
            </form>

        )
    }
}

export class OpenAddForm extends Component {
    constructor(props) {
        super(props);
        this.toggleForm = this.toggleForm.bind(this);
        this.state = { formIsOpened: false };
    };

    toggleForm (e) {
        e.preventDefault();
        if (this.state.formIsOpened) {
            this.setState({formIsOpened: false})
        } else
            this.setState({formIsOpened: true})
    }

    render() {
        let formIsOpened = this.state.formIsOpened,
            buttonText,
            form,
            button;

        if (formIsOpened) {
            form = <AddForm />
            buttonText = "Close Form"
        } else {
            form = null
            buttonText = "Open Form"
        }

        return (
            <div>
                <button onClick={this.toggleForm}
                        className='open__form '
                >{buttonText}</button>
                {form}
            </div>
        )
    }
}

