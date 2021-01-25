import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";
import PropTypes from 'prop-types';
import axios from 'axios';

class Credits extends Component{
    constructor () {
        super();
        this.state = {
            credits: [], amount: 0, creditTotal: 0, date: "", description: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() { 
        axios.get("https://moj-api.herokuapp.com/credits")
        .then((result) => {
            const res = result.data;
            console.log(res);
            this.setState({credits: res});
            let totalAmount = 0;
            res.forEach((credit) => (totalAmount += credit.amount));
            this.setState({totalCredit: totalAmount});
        })
    }

    handleChange = (input) => {
        const n = input.target.name;
        const v = input.target.value;
        this.setState({[n]: v});
    }

    handleSubmit = (output) => {
        output.preventDefault();
        let cred = {amount: Number(this.state.amount), date: new Date().toISOString(), description: this.state.description};
        let arrayOfCredits = [...this.state.credits, cred];
        this.setState({credits: arrayOfCredits});
        let totalAmount = 0;
        arrayOfCredits.forEach((credit) => (totalAmount += credit.amount));
        const displayTotal = totalAmount.toFixed(2);
        this.setState({creditTotal: displayTotal});
    }

    render(){
        return (
            <div>
                <h1>Credits</h1>
                <Link tp = "/">Home</Link> <br></br>
                <form obSubmit = {this.handleSubmit}>
                    <label htmlFor = "description">Description</label>
                    <input name = "description" type = "text" onChange = {this.handleChange}/><br></br>
                    <label htmlFor = "amount">Amount</label> 
                    <input type = "number" min = "0.00" step = "0.01" required name = "amount" onChange = {this.handleChange}></input><br></br>
                    <button>Add Credit</button>
                </form>
                <br></br>
                <AccountBalance/> 
            </div>
        )
    }
}

export default Credits;