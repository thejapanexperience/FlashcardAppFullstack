import React, { Component } from 'react'

export default class Welcome extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div>
        <br/>
        <h2>Richard's flashcards is an awesome new flashcard experience</h2>
        <img className="img-responsive img-rounded center-block" id="splashImage" src="http://i.imgur.com/WdQ2av1.jpg" alt=""/>
      </div>
    )
  }
}
