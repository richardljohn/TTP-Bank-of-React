import React, {Component} from 'react';

class Account extends Component {
    render(){
        return(
            <div>Balance: ${this.props.account}</div>
        )
    }
}

export default Account;