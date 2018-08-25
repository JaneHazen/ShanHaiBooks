import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';



class Logout extends Component {

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        let that = this;
        let email = this.props.currentUser;
        axios.delete('/users/sign_out', {
            email
        })
            .then(function(response){
                that.props.updateCurrentUser(null);
            })
            .catch(function(error){
                console.log(error)
            })
    }

    render() {
        console.log("THERE");

        return (
            <nav className="navbar navbar-inverse" style={{backgroundColor: "#efefef"}}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <div className="navbar-brand"><a href="/">ShanHai</a></div>
                    </div>
                    <ul className="nav navbar-nav">

                        <li><Link to="/About">About</Link></li>
                        <li><Link to="/Search">Search</Link></li>
                        <li>
                            <button className="btn navbar-btn" id="logout" onClick={this.handleLogout}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    };
}

export default Logout