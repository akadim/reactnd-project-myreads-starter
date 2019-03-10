import React from 'react'
import { Route } from 'react-router-dom'
import  BookListing  from './BookListing'
import SearchBook from './SearchBook'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  shelves = [
    {id: 'currentlyReading', title: 'Currently Reading'},
    {id: 'wantToRead', title: 'Want to read'},
    {id: 'read', title: 'Read'}
  ];

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then( (books) => {
        this.setState({ books: books });
        console.log(this.state.books);
      } );
      
  }

  changeBookShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then( (updatedBook) => {
           book.shelf = shelf;
           this.setState( (prevState) => ({
              books: prevState.books.filter( (filterBook) => filterBook.id !== book.id ).concat(book)
           }));  
           console.log(this.state.books); 
      });
  }

  render() {
    return (
      
      <div className="app">
       <Route path='/search' render={ () => (
          <SearchBook  books={this.state.books} onBookShelfChanged={this.changeBookShelf}/>
        ) }/>
        <Route exact path='/' render={ () => (
            <BookListing shelves={this.shelves} books={this.state.books} onBookShelfChanged={this.changeBookShelf}></BookListing>
        ) }/>
      </div>
    )
  }
}

export default BooksApp
