import React, { Component } from 'react';


class BookItem extends Component {
    render()  {
        const { book, onBookShelfChanged } = this.props;

        return (
          <li key={book.id}>
              <div className="book">
              <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + ((book.imageLinks !== undefined) ? book.imageLinks.smallThumbnail : '') + ')' }}></div>
                  <div className="book-shelf-changer">
                  <select onChange={ (evt) => {onBookShelfChanged(book, evt.target.value)} } defaultValue={book.shelf}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                  </select>
                  </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{ ((book.authors !== undefined) ? book.authors.join(', ') : '')}</div>
              </div>
          </li>
      );
    }
}

export default BookItem