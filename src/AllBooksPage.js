import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class AllBooksPage extends Component {
	static propTypes = {
    	updateBook:PropTypes.func.isRequired,
			allBooks:PropTypes.array.isRequired,
			setSearchResultsEmpty:PropTypes.func.isRequired
  	}

  	componentDidMount(){
			console.log('All types of books!');
			this.props.setSearchResultsEmpty()
	}
	render(){
		const shelves = [
			{
				id: 'currentlyReading',
			  title: 'Currently Reading',
			 	books: this.props.allBooks.filter(book => book.shelf === "currentlyReading")
			},
			{
				id: 'wantToRead',
			  title: 'Want to Read',
			 	books: this.props.allBooks.filter(book => book.shelf === "wantToRead")
			},
			{
				id: 'read',
			  title: 'Read',
			 	books: this.props.allBooks.filter(book => book.shelf === "read")
			}
		]
		
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{shelves.map((bookCategory, index) => (
								<BookShelf key={index}
									curBooks={bookCategory.books}
									updateBook={this.props.updateBook}
									title={bookCategory.title}
									id={bookCategory.id}
								/>
							))} 
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
		  </div>
		)
	}

}
export default AllBooksPage