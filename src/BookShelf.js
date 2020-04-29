import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookComponent from './BookComponent'


class BookShelf extends Component {
	static propTypes = {
        curBooks: PropTypes.array.isRequired,
        updateBook: PropTypes.func.isRequired,
				title: PropTypes.string.isRequired,
				id:PropTypes.string.isRequired
  }

	render() {
	if (!this.props.curBooks[0]) {
		return <div/>
  } else {
		return (
				<div className="bookshelf">
					<h2 className="bookshelf-title">{this.props.title}</h2>
					<div className="bookshelf-books">
						<ol className="books-grid">

							{this.props.curBooks.map((book, index) => (
								<BookComponent key={index}
									book={book}
									updateBook={this.props.updateBook}
								/>
							))}

						</ol>
					</div>
				</div>
			)
		}	
	}
}

export default BookShelf;