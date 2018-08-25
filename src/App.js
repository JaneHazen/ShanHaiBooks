import React, { Component } from 'react';
import './App.css';

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
            <div>
                <Header/>
               <Map/>
            </div>
        )
    }
}


export default Map;