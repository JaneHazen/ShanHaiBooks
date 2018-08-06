import React, { Component } from 'react';
import  {geoMercator, geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import './App.css';

import Popup from './Popup';

class App extends Component {


    constructor(props){
        super(props);
        this.state = {
            worldData: [],
            showPopup: false,
            targetCountry: undefined
        };
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup,
        })
    }

    componentDidMount(){
        fetch("../world-countries.json")
            .then(response => {
                if (response.status !== 200) {
                    console.log(response.status, "ERROR");
                    return
                }
                response.json().then(worldData => {
                    this.setState({
                        worldData:feature(worldData, worldData.objects.countries1).features
                    })
                })
            })
    }

    projection(){
        return geoMercator()
            .scale(100)
            .translate([800/2, 450/2])
    }

    handleCountryClick(countryIndex) {
        let targetCountry = this.state.worldData[countryIndex].properties.name;
        this.setState({
            targetCountry,
            showPopup: !this.state.showPopup
        });
    }

    render(){
        return(
            <div>
                <svg width={800} height={450} viewBox="0 0 800 450" id="map">
                    <g className="countries">
                        {
                            this.state.worldData.map((d, i)=> (
                                <path
                                    key = {`path-${i}`}
                                    d = { geoPath().projection(this.projection())(d) }
                                    className="country"
                                    onClick = { () => this.handleCountryClick(i)}
                                    stroke= "#FFFFFF"
                                    strokeWidth= {0.5}
                                />
                            ))
                        }
                    </g>

                </svg>
                {this.state.showPopup ?
                    <Popup
                        text='Close Me'
                        country = {this.state.targetCountry}
                        closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                }
            </div>
        )
    }
}


export default App;
