import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Credit extends Component{
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

    handleChange = (input) => {
        const creditU = {...this.state.info};
        const nameIn = input.target.name;
        const valueIn = input.target.value;
        creditU[nameIn] = valueIn;
        this.setState({info: creditU});
    };

    handleSubmit = (output) => {
        output.preventDefault();
        this.props.addCredit(this.state.info);
        this.setState({redirect: true});
    };

    render() {
        if(this.state.redirect){
            return <Redirect to = "/"/>
        }
        return(
            <div>
                <h1>Add Credit</h1>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label htmlFor = "amount">Amount of Credit</label>
                        <input type = "number" name = "amount" value = {this.state.info.amount} onChange = {this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor = "description">Description</label>
                        <input type = "text" name = "description" value = {this.state.info.description} onChange = {this.handleChange}></input>
                    </div>
                    <button>Add</button>
                </form>
                <h3>Your Credits</h3>
                <ul>{this.props.credits.map((credit,idx)=> <li key={credit.id}>{credit.description + "\t$" + credit.amount + "\t" + credit.date.substring(0,10)}</li>)}</ul>
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default Credit;