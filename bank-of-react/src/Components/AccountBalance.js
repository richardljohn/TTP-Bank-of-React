import React, {Component} from 'react';

class Account extends Component {
    render(){
        return(
            <div>Balance: ${this.props.accountBalance}</div>
        )
    }
}

export default Account;