import React, { Component } from 'react';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';

class BookListing extends Component {
    
    onBookShelfChanged = (book, shelf) => {
        this.props.onBookShelfChanged(book, shelf);
    }

    render()  {
        const { shelves, books, onBookShelfChanged } = this.props;

        return (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelves.map( (shelf) => (
                     <div className="bookshelf" key={shelf.id}>
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                        <ol className="books-grid">
                            { books.filter( (book) => book.shelf === shelf.id ).map( (book) => (
                                <BookItem book={book} onBookShelfChanged={this.onBookShelfChanged } key={book.id}/>
                            ))}
                            
                        </ol>
                        </div>
                    </div>
                ) )}
                
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
      );
    }
}

export default BookListing;