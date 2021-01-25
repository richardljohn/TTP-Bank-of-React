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

    handleChange = (e) =>  {
        const debitU = {...this.state.info};
        const nameIn = e.state.name;
        const valueIn = e.state.value;
        debitU[nameIn] = valueIn;
        this.setState({info: debitU});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addDebit(this.state.info);
        this.setState({redirect: true});
    };

    render(){
        if(this.state.redirect){
            return <Redirect to = "/"/>;
        }
        return (
            <div>
                <h1>Add Debit</h1>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label htmlFor = "amount">Amount of Debit</label>
                        <input type = "number" name = "amount" value = {this.state.info.amount} onChange = {this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor = "description">Description</label>
                        <input type = "text" name = "description" value = {this.state.info.description} onChange = {this.handleChange}></input>
                    </div>
                    <button>Add</button>
                </form>
                <h3>Your Debits</h3>
                <ul>{this.props.debits.map((debit,idx)=> <li key={debit.id}>{debit.description + " $" + debit.amount + " " + debit.date.substring(0,10)}</li>)}</ul>
                <Link to = "/">Home</Link>
            </div>
        )
    }
}

export default Debit;