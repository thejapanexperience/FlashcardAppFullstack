import React, { Component } from 'react'
import CardStore from '../stores/CardStore'
import ToAPIActions from '../actions/ToAPIActions'
import NormalActions from '../actions/NormalActions'

export default class Categories extends Component {
  constructor() {
    super();
    this.state = {
      categories: CardStore.getAllCategories(),
      flashcards: CardStore.getAllFlashCards(),
      ready: CardStore.getReady(),
      playMessages: CardStore.getPlayMessage(),
      playMessageIndex: CardStore.getPlayMessageIndex(),
      cardMessage: CardStore.getCardMessage(),
      categoryArray: CardStore.getCategoryArray(),
    }
    this._onChange = this._onChange.bind(this)
    this._getReady = this._getReady.bind(this)
    this._startStudy = this._startStudy.bind(this)
    this._messageIndex = this._messageIndex.bind(this)
    this._categoryArray = this._categoryArray.bind(this)
  }

  _getReady() {
    ToAPIActions.getFlashcards()
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      categories: CardStore.getAllCategories(),
      flashcards: CardStore.getAllFlashCards(),
      ready: CardStore.getReady(),
      playMessages: CardStore.getPlayMessage(),
      playMessageIndex: CardStore.getPlayMessageIndex(),
      cardMessage: CardStore.getCardMessage(),
      categoryArray: CardStore.getCategoryArray(),
    })
  }

  _categoryArray(category){
    if (this.state.categoryArray.indexOf(category) === -1) {
      this.state.categoryArray.push(category)
    } else {
      this.state.categoryArray.splice(this.state.categoryArray.indexOf(category),1)
    }
    console.log('this.state.categoryArray: ', this.state.categoryArray)
    NormalActions.categoryArray(this.state.categoryArray)
  }

  _startStudy(){
    NormalActions.generateStudyDeck(this.state.categoryArray)
  }

  _messageIndex(){
    NormalActions.messageIndex()
  }

  render() {
    let { flashcards, categories, ready, cardMessage, playMessages, playMessageIndex } = this.state
    if (ready === false) {
      this._getReady()
    }
    console.log('cardMessage: ', cardMessage)
    console.log('playMessageIndex: ', playMessageIndex)

    let nextButton
    if (playMessageIndex % 2  === 0 && playMessageIndex + 1 !== playMessages.length && playMessages.length > 0 ) {
      console.log('1')
      nextButton = <button onClick={this._messageIndex} className="btn btn-danger">Click for Answer</button>
    } else if (playMessageIndex % 2 !==0) {
      console.log('2')
      nextButton = <button onClick={this._messageIndex} className="btn btn-success">Click for next Question</button>
    } else if (!playMessageIndex){
      console.log('3');
      nextButton = <div></div>
    } else if (playMessageIndex % 2  === 0 && playMessageIndex + 1 === playMessages.length && playMessages.length > 0 ) {
      console.log('4')
      nextButton = <button onClick={this._messageIndex} className="btn btn-danger disabled">Click for Answer</button>
    }

    console.log('this.state.categoryArray: ', this.state.categoryArray)

    return (
      <div className="text-center">
        {this.state.categories ?
          <div>
            <br></br>
            <h2 >Choose a category to test yourself</h2>
            <br></br>
          </div>
          : <div></div>
        }

        { !this.state.categoryArray || this.state.categoryArray.length < 1 ?
          <div>
            <span className="btn btn-block btn-info">Your Chosen Categories</span>
            <span className="btn btn-block btn-warning">No Categories Selected</span>
            <span className="btn btn-default btn-block">Submit Categories</span>
          </div>
          : <div>
            <span className="btn btn-block btn-info">Your Chosen Categories</span>
            <span className="btn btn-block btn-success">{this.state.categoryArray.join(' ')}</span>
            <button onClick={this._startStudy} className="btn btn-default btn-block">Submit Categories</button>
          </div>}
        <br/>
        {this.state.categories.length > 0 ?
          categories.map((category, index) =>
            <span key={category}>
              <button className="btn btn-primary" onClick={this._categoryArray.bind(null, category)}>{category}</button><span> </span>
            </span>
          )
          : <div></div>
        }
        <br></br>
        <br/>

        {this.state.categories ?
          <div id="card" className="container text-centre">
            <span>{cardMessage}</span>
          </div>
          : <div></div>
        }
        <br/>
        {nextButton}

      </div>

    )
  }
}
