import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookComponent from './BookComponent'


class SearchResultPage extends Component {
	static propTypes = {
    	searchBooks:PropTypes.func.isRequired,
    	searchLoading:PropTypes.bool.isRequired,
    	searchResults:PropTypes.array,
    	updateBook:PropTypes.func.isRequired

  	}

	state = {
    	query:''
  	}
  	
  	componentDidMount(){
    	console.log('Search page!');
	}
  	
  	updateQuery=(query)=>{
  		console.log("ANSHULIKA updateQuery : " + query)
	    this.setState({
	      query
	    })
	    this.props.searchBooks(this.state.query,5)
  	}

  	render(){

  		let searchResults = this.props.searchResults
		
		if( Object.prototype.toString.call( this.props.searchResults ) === '[object Array]' ) {
	  		return (
			  		<div className="search-books">
				        <div className="search-books-bar">
				        	<Link to='/' className="close-search">Close</Link>
				            <div className="search-books-input-wrapper">
				                {/*
				                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
				                  You can find these search terms here:
				                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

				                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
				                  you don't find a specific author or title. Every search is limited by search terms.
				                */}
										<input
						            className='search-books-input'
						            type='text'
						            placeholder='Search by title or author'
						            value={this.state.query}
						            onChange={(e) => this.updateQuery(e.target.value)}
			          			/>

				          	</div>
				       	
				        </div>
		            <div className="search-books-results">
								<ol className="books-grid">
									{searchResults.map((book, index) => (
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

export default SearchResultPage