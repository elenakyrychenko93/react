import React, { Component } from 'react';

export class BaseRequests extends Component {
    constructor(props) {
        super(props);
    };

    getData = () =>  {
        return fetch("https://react2-718af.firebaseio.com/articles.json")
            .then(function(response){
                return response.json();
            }).then(function(data) {
                return data;
            });
    };

    addArticle = (item) => {
        return fetch('https://react2-718af.firebaseio.com/articles.json', {
            method: 'post',
            body: JSON.stringify(item),
            cache: false,
        }).then(function(response){
            return response.json();
        }).then(function(data) {
        });
    };

    deleteArticle = (articleToDeleteId) => {
        return fetch('https://react2-718af.firebaseio.com/articles/' + articleToDeleteId + '.json', {
            method: 'DELETE',
            cache: false
        }).then(function(response){
            return response.json();

        })
    };

}











