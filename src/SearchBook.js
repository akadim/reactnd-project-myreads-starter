import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookItem from './BookItem'
import escapeRegExp from 'escape-string-regexp'

class SearchBook extends Component {

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query})
    }

    onBookShelfChanged = (book, shelf) => {
        console.log(this.props);
        this.props.onBookShelfChanged(book, shelf);
    }

    render() {

        const { books, onBookShelfChanged } = this.props;
        const { query } = this.state;

        let showinBooks

        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showinBooks = books.filter((book) => match.test(book.title) || match.test(book.authors.join(', ')));
        } else {
            showinBooks = [];
        }

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
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    { showinBooks.map( (book) => (
                        <BookItem book={book} onBookShelfChanged={this.onBookShelfChanged } key={book.id}/>
                    ))}
                    </ol>
                </div>
          </div>
        )
    }
}

export default SearchBook;

