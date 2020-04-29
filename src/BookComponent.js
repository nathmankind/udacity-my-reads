import React, { Component } from 'react';
import PropTypes from 'prop-types'

class BookComponent extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired,
        updateBook: PropTypes.func.isRequired
    }
    render() {
        const placeholder = "http://via.placeholder.com/128x193?text=" + this.props.book.title;
        // console.log("ANSHULIKA : palce holder image URL : " + placeholder );
        return (
            <li key={this.props.book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : placeholder})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf} onChange={(e)=>{this.props.updateBook(this.props.book, e.target.value);}} >
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookComponent