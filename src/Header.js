import React, {Component} from 'react';
import axios from 'axios';

// components

import Login from './Login'
import Logout from './Logout'



class Header extends React.Component {

    constructor(props){
        super(props);
    }

    renderNavBar(){
        if(this.props.currentUser != null){
            return(
                <Logout updateCurrentUser={this.props.updateCurrentUser}/>
            )
        }else{
            return(
                <Login updateCurrentUser={this.props.updateCurrentUser}/>
            )
        }
    }


    render() {
        return(
            <div>
                {this.renderNavBar()}
            </div>
        )
    }
}
export default Header