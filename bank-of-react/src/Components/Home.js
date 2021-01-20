import React, {Component} from 'react';
import Account from "./AccountBalance";
import {Link} from "react-router-dom";

class Home extends Component{
    render(){
        return(
            <div>
                <img src = "https://letstalkpayments.com/wp-content/uploads/2016/04/Bank.png" alt="bank"></img>
                <h1>Bank of React</h1>
                <Link to = "/User">User</Link><div></div><br></br>
                <Link to = "/login">Login</Link><div></div><br></br>
                <Link to = "/debit">Debit</Link>
                <Link to = "/credit">Credit</Link>
                <Account account = {Math.ceil(this.props.account*100)/100}></Account>
            </div>
        );
    }
}

export default Home;