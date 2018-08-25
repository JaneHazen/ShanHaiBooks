import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Components
import Map from './Map';
import Header from './Header';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount(){

    }


    render(){
        return(
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/signup" render={(props) => (
                            <Signup {...props}
                                    component={Signup}
                                    currentUser={this.state.currentUser}
                                    updateCurrentUser={this.updateCurrentUser}
                            />
                        )}/>
                        <Route path="/about" render={(props) => (
                            <About {...props}
                                   component={About}
                                   currentUser={this.state.currentUser}
                                   updateCurrentUser={this.updateCurrentUser}
                            />
                        )}/>
                        <Route path="/search" render={(props) => (
                            <Search {...props}
                                    component={Search}
                                    currentUser={this.state.currentUser}
                                    updateCurrentUser={this.updateCurrentUser}
                            />
                        )}/>
                        <Route path="/books/:id" render = {(props) =>(
                            <Book {...props}
                                  component={Book}
                                  currentUser={this.state.currentUser}
                                  updateCurrentUser={this.updateCurrentUser}
                            />
                        )}/>
                        <Route path="/" render={(props) => (
                            <Main {...props}
                                  component={Main}
                                  currentUser={this.state.currentUser}
                                  updateCurrentUser={this.updateCurrentUser}
                            />
                        )}/>
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}


export default App;