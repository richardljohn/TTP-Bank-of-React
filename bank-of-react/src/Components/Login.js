import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component{
    constructor(){
        super()
        this.state = {
            user: {
                name: "",
                password: ""
            },
            redirect: false
        }
    }

    handleChange = (input) => {
        const userU = {...this.state.user};
        const nameIn = input.target.name;
        const valueIn = input.target.value; 
        userU[nameIn] = valueIn;
        this.setState({user: userU});
    }

    handleSubmit = (output) => {
        output.preventDefault();
        this.props.mockLogin(this.state.user);
        this.setState({redirect: true});
    }

    render(){
        if(this.state.redirect){
            return (<Redirect to = "/user"/>);
        }
        return(
            <div>
                <form onSubmit = {this.handleSubmit}>
                <div>
                    <label htmlFor = "name">Username</label>
                    <input type = "text" name = "user" onChange = {this.handleChange} value = {this.state.user.name}></input>
                </div>
                <div>
                    <label htmlFor = "password">Password</label>
                    <input type = "password" name = "password"></input>
                </div>
                <button>Log in</button>
                </form>
            </div>
        );
    }
}

export default Login;