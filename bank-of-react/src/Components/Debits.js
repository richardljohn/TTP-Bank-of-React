import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import PropTypes from 'prop-types';
import axios from 'axios';

class Debits extends Component {
    constructor(){
        super();
        this.state = {
            debits: [],
            debitTotal: 0.00,
            description: "",
            amount: 0.00,
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios
        .get("https://moj-api.herokuapp.com/debits")
        .then((response) => {
            const res = response.data;
            console.log(res);
            this.setState({debits: res});
            let total = 0;
            res.forEach((debit) => (total += debit.amount));
            this.setState({debitTotal: total});
        })
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let newDebit = {
            description: this.state.description,
            amount: Number(this.state.amount),
            date: new Date().toISOString()
        }
        let DebitArray = [...this.state.debits, newDebit];
        this.setState({debits: DebitArray});
        let total = 0; 
        DebitArray.forEach((debit) => (total += debit.amount));
        let displayTotal = total.toFixed(2);
        this.setState({debitTotal: displayTotal});
    }

    render() {
        let display = (
            this.state.debits.map((debit) => {
                return (
                    <>
                    <div>Description: {debit.description}</div>
                    <div>Amount: {debit.amount}</div>
                    <div>Date: {debit.date}</div> <br></br>
                    </>
                )
            })
        )
        return (
            <div className="App">
            <h1>Debits</h1>
            <Link to="/">Home</Link>
            <br /><br />
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="description">Description: </label>
                <input type="text" name="description" onChange={this.handleChange}/><br></br>
                <label htmlFor="amount">Amount: </label>
                <input type="number" min="0" step="0.01" required name="amount" onChange={this.handleChange}/><br></br>
                <button>Add Debit</button>
            </form>
            <br></br>
            <AccountBalance/>
            <div>Total Debits: {this.state.totalDebit}</div>
            <div>{display}</div>
            </div>
        )
    }
}

Debits.propTypes = {
    debitTotal: PropTypes.number,
    description: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string
};

export default Debits;