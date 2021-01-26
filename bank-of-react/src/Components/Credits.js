import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";
import PropTypes from 'prop-types';
import axios from 'axios';

class Credits extends Component {
    constructor() {
        super();
        this.state = {
            credits: [],
            creditTotal: 0.00,
            description: "",
            amount: 0.00,
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios.get("https://moj-api.herokuapp.com/credits")
        .then((response) => {
            const res = response.data;
            console.log(res);
            this.setState({credits: res});
            let total = 0;
            res.forEach((credit) => (total += credit.amount));
            this.setState({creditTotal: total});
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let newCredit = {
            description: this.state.description,
            amount: Number(this.state.amount),
            date: new Date().toISOString
        }

        let CreditArray = [...this.state.credits, newCredit];
        this.setState({credits: CreditArray});
        let total = 0;
        CreditArray.forEach((credit) => (total += credit.amount));
        let displayTotal = total.toFixed(2);
        this.setState({creditTotal: displayTotal});
    }

    render() {
        let display= (
            this.state.credits.map((credit) => {
                return (
                <>
                <div>Description: {credit.description}</div>
                <div>Amount: {credit.amount}</div>
                <div>Date: {credit.date}</div>
                <br></br>
                </>
                )
            })
        )
        return (
            <div className="App">
            <h1>Credits</h1>
            <Link to="/">Home</Link>
            <br /><br />
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Description: </label>
            <input type="text" name="description" onChange={this.handleChange}/><br></br>
            <label htmlFor="amount">Amount: </label>
            <input type="number" min="0" step="0.01" required name="amount" onChange={this.handleChange}/><br></br>
            <button>Add Credit</button>
        </form>
        <br />
        <AccountBalance/>
        <div>Total Credit: {this.state.creditTotal}</div>
        <div>{display}</div>
        </div>
        )
    }
}

Credits.propTypes = {
    creditTotal: PropTypes.number, 
    description: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string
};

export default Credits;