import React, { Component } from 'react';

class Popup extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='popup'>
                <div className='popupInner' >
                    <button className="close" aria-label="Close" onClick={this.props.closePopup}><span aria-hidden="true">&times;</span></button>
                    <div className="container-fluid">
                        <h2 className="countryName">{this.props.country}</h2>
                    </div>
                    <ul className="booksUl">
                    </ul>
                </div>
            </div>
        )
    }

}

export default Popup;
