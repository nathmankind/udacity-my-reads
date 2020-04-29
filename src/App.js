import React from 'react'
import {Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchResultPage from './SearchResultPage'
import AllBooksPage from './AllBooksPage'

class BooksApp extends React.Component {
	constructor(props) {
	    super(props);
	    // Manually bind this method to the component instance...
	    this.fetchAllBooks = this.fetchAllBooks.bind(this);
  	}
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: [],
    searchResults:[],
    searchLoading:false
  }


	componentDidMount() {
		console.log("ANSHULIKA BooksApp componentDidMount")
		this.fetchAllBooks()
  	}

  	fetchAllBooks=()=>{
  		console.log("ANSHULIKA BooksApp fetchAllBooks called " )
  		BooksAPI.getAll().then((allBooks) => {


				let hashTable = {}
				allBooks.forEach(function(book){
					hashTable[book.id] = book.shelf
				});
				let updatedShelfForSearchedBooks = this.state.searchResults
				updatedShelfForSearchedBooks.forEach(
					(book) => book.shelf = hashTable[book.id]  || 'none'
				)

				this.setState({ 
					allBooks:allBooks,
					searchResults:updatedShelfForSearchedBooks
				})
		  
		})
  	}

	updateBook=(book,shelf)=> {
		
		console.log("ANSHULIKA updateBook : "  + book.title + "  " + shelf)
		BooksAPI.update(book,shelf).then(()=>{
      		this.fetchAllBooks()
    	})
		}
		setSearchResultsEmpty=()=>{
			this.setState({
				searchLoading:true,
				searchResults: []
	    })
		}
  	searchBooks=(query,maxResults)=>{
	    this.setState({
				searchLoading:true,
				searchResults: []
	    })
	    console.log("ANSHULIKA searchBooks : " + query + "  maxResults : "+ maxResults)
	    BooksAPI.search(query,maxResults).then(results=>{

		    if (results) {
						if (results.error) {
								return;
						}
						
						let hashTable = {}
						this.state.allBooks.forEach(function(book){
							hashTable[book.id] = book.shelf
						});
						results.forEach(
							(book) => book.shelf = hashTable[book.id]  || 'none'
						)
						// results.forEach(function(item){
						// 	console.log("ANSHULIKA after search : " + item.title + " " + item.shelf)
						// });
						this.setState({
								searchResults: results,
								searchLoading: false
						})
        }
      });
  	}
  render() {


    return (
      <div className="app">
 
		<Route
			path='/search'
			render={()=>(
				<SearchResultPage
					searchBooks={this.searchBooks}
					searchLoading={this.state.searchLoading}
					searchResults={this.state.searchResults}
					updateBook={this.updateBook}
				/>
			)}
		/>
   
        <Route
          exact path='/'
          render={()=>(
            <AllBooksPage
        			allBooks={this.state.allBooks}
							updateBook={this.updateBook}
							setSearchResultsEmpty={this.setSearchResultsEmpty}
        	/>
          )}
        />
     
      </div>
    )
  }
}

export default BooksApp