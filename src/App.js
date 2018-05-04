import React, { Component } from 'react';
// import logo from './logo.svg';
import {BaseRequests} from "./fetchRequests";
import {AddForm, OpenAddForm} from './Form';
import Article from './Article';
import './App.css';
import EventEmitter from '../node_modules/emitter-js/dist/emitter';

let ArticlesList = [];

const requests = new BaseRequests();
// let Articles = [
//     {
//         articleName: 'Саша Печкин',
//         articlePrev: 'В четверг',
//         articleText: 'В четверг, четвертого числа...'
//     },
//     {
//         articleName: 'Саша Печкин2',
//         articlePrev: 'В четверг',
//         articleText: 'В четверг, четвертого числа...'
//     },
//     {
//         articleName: 'Саша Печкин3',
//         articlePrev: 'В четверг',
//         articleText: 'В четверг, четвертого числа...'
//     }
// ];

//Emitter
let ee = require('event-emitter');
let emitter = new EventEmitter(), listener;
ee(EventEmitter.prototype);


class Articles extends Component {
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.state = {showText: false, list: []};
    };

    componentWillReceiveProps (props) {
        this.setState({list: props.data})
    }

    deleteItem(e, articleToDeleteId) {
        e.preventDefault();
        requests.deleteArticle(articleToDeleteId).then(r => {
            let List = this.state.list;
            this.setState({list: List.filter(i => i.id !== articleToDeleteId)});
        })
    };

    render () {
        return  <div className="Articles">
                    {this.state.list.map((item, index) => <Article key={index} data={item}  onDelete={this.deleteItem} />)}
                </div>
    };
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {ArticlesList: []};
    };

    componentWillMount() {
        requests.getData().then((data) => {
            for(let item in data) {
                data[item].id = item;
                ArticlesList.push(data[item]);
            }
            // ArticlesList.forEach((item,i, arr) => {
            //     item.id = i;
            // });
            this.setState({ArticlesList: data});
        });

        emitter.on('Article.add', listener = (item) => {
            this.setState({ArticlesList: ArticlesList.push(item)});
            console.log(item);
        });
    };

    componentWillUnmount() {
        emitter.off('Article.add', listener);
    }


  render() {
      return (
      <div className="App">
          <OpenAddForm />
          <Articles data={ArticlesList}/>
      </div>
    );
  }
}

export default App;
