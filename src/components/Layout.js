import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <br/>
        <h1 className='text-center'>Richard's Flashcards</h1>

        <div className="row">
          <Link className="btn btn-info" to='/welcome'>
            Richard's Flashcards
          </Link>
          <span>  </span>
          <Link className="btn btn-warning" to='/allflashcards' activeClassName='disabled'>
            Flashcard Management
          </Link>
          <span>  </span>
          <Link className="btn btn-warning" to='/allcategories' activeClassName='disabled'>
            Categories
          </Link>

        </div>

        {this.props.children}

      </div>
    )
  }
}
