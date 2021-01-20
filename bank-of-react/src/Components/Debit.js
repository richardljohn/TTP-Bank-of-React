import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Debit extends Component {
    constructor(){
        super();
        this.state = {
            info: {
                description: "",
                amount: 0,
                date: ""
            },
            redirect: false
        };
    }
    
}