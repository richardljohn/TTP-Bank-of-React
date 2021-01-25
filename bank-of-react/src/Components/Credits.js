import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Credit extends Component { 
    constructor(){
        super();
        this.state = {
            info: {
                amount: 0,
                description: "",
                date: ""
            },
            redirect: false
        };
    }

    handleChange = (e) => {
        const updatedCredit = {...this.state.info};
        const inputField = e.target.name;
        const inputValue = e.target.value;
        updatedCredit[inputField] = inputValue;
        this.setState({info: updatedCredit});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCredit(this.state.info);
        this.setState({redirect: true});
    }

    render(){
        if(this.state.redirect){
            return <Redirect to = "/"/>;
        }
        return (
            <div>
                <h1>Add a Credit</h1>
                <form onSubmit = {this.handleSubmit}>
                    <div>
                        <label htmlFor = "amount">Amount for Credit</label>
                        <input type = "number" name = "amount" value = {this.state.info.amount} onChange = {this.handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor = "description">Amount for Credit</label>
                        <input type = "text" name = "description" value = {this.state.info.amount} onChange = {this.handleChange}></input>
                    </div>
                    <button>Submit Request</button>
                </form>
                <h2>Credits</h2>
                <ul>
                    {this.props.credits.map((credit,idx)=> <li key={credit.id}>{credit.description + "\t$" + credit.amount + "\t" + credit.date.substring(0,10)}</li>)}
                </ul>
                <Link to="/">Home</Link>
            </div>
        )
    }
}

export default Credit;