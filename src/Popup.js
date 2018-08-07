import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

class Popup extends Component {
    constructor(props){
        super(props);
        this.state = {
            books: []
        };
        this.getBooks = this.getBooks.bind(this);
    }

    getBooks(){
        let country = this.props.country;
        axios.get(`http://localhost:4000/books/${country}`)
            .then(res => {
                this.setState({ books: res.data});
            })
            .catch( err => {
                console.error(err);
            })
    }

    componentDidMount(){
        this.getBooks();
    }

    renderBooks() {
        return _.map(this.state.books.books, book => {
            return (
                    <li className="jumbotron">
                        <article className="popupContainer" key={book.id}>
                            <p className="bookTitle">{book.title}</p>
                            <p className="bookAuthor">{book.authorFirstName} {book.authorLastName}</p>
                        </article>
                    </li>
            );
        });
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
                        {this.renderBooks()}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Popup;
