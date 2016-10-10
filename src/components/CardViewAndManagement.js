import React, { Component } from 'react'
import CardStore from '../stores/CardStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class CardViewAndManagement extends Component {
  constructor() {
    super();
    this.state = {
      categories: CardStore.getAllCategories(),
      flashcards: CardStore.getAllFlashCards(),
      ready: CardStore.getReady(),
    }

    this._getReady = this._getReady.bind(this)
    this._onChange = this._onChange.bind(this)
    this._makeFlashcardEditable = this._makeFlashcardEditable.bind(this)
    this._makeFlashcardEdit = this._makeFlashcardEdit.bind(this)
    this._addFlashcard = this._addFlashcard.bind(this)
    this._deleteFlashcard = this._deleteFlashcard.bind(this)
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
    })
  }

  _getReady() {
    ToAPIActions.getFlashcards()
  }

  _addFlashcard(e){
    e.preventDefault()
    let newFlashcard = {}
    let { newCategory, newQuestion, newAnswer } = this.refs
    newFlashcard.Category = newCategory.value
    newFlashcard.Question = newQuestion.value
    newFlashcard.Answer = newAnswer.value
    ToAPIActions.addFlashcard(newFlashcard)
  }

  _makeFlashcardEditable(id){
    ToAPIActions.makeFlashcardEditable(id)
  }

  _makeFlashcardEdit(id){
    let newData = {}
    let { categoryEdit, questionEdit, answerEdit } = this.refs
    newData.Category = categoryEdit.value
    newData.Question = questionEdit.value
    newData.Answer = answerEdit.value
    ToAPIActions.makeFlashcardEdit(id, newData)
  }

  _deleteFlashcard(id){
    ToAPIActions.deleteFlashcard(id)
  }

  render() {
    let { flashcards, categories, ready } = this.state
    if (ready === false) {
      this._getReady()
    }
    console.log('Rendering');
    console.log('flashcards, categories: ', flashcards, categories)
    return (
      <div className="container">
        <br></br>
        <div className="text-centre">
          <form className="form-horizontal">
            <p className="btn btn-block btn-success">Add New Flashcard</p>
            <br></br>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="category">Category:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="category" ref="newCategory" placeholder="Enter Category"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="question">Question:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="question" ref="newQuestion" placeholder="Enter Question"/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2" htmlFor="answer">Answer:</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="answer" ref="newAnswer" placeholder="Enter Answer"/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button onClick={this._addFlashcard} className="btn btn-default">Submit</button>
              </div>
            </div>
          </form>
        </div>

        <br></br>
        {this.state.flashcards ?
          <table className="table table-hover">
            <thead>

            </thead>
            <tbody>
              {flashcards.map((flashcard) =>
                (
                  <tr key={flashcard.id}>
                    {
                      (flashcard.edit)
                        ? <td className="form-group"><input ref='categoryEdit' type="text" className="form-control" defaultValue={flashcard.Category}/></td>
                      : <td>{flashcard.Category}</td>
                    }
                    {
                      (flashcard.edit)
                        ? <td className="form-group"><input ref='questionEdit' type="text" className="form-control" defaultValue={flashcard.Question}/></td>
                      : <td>{flashcard.Question}</td>
                    }
                    {
                      (flashcard.edit)
                        ? <td className="form-group"><input ref='answerEdit' type="text" className="form-control" defaultValue={flashcard.Answer}/></td>
                      : <td>{flashcard.Answer}</td>
                    }
                    {
                      (flashcard.edit)
                        ? <td><button onClick={this._makeFlashcardEdit.bind(null, flashcard.id)} className="btn btn-sm btn-success">Submit</button></td>
                      : <td><button onClick={this._makeFlashcardEditable.bind(null, flashcard.id)} className="btn btn-sm btn-info">Edit</button></td>
                    }

                    <td>
                      <button
                        onClick={this._deleteFlashcard.bind(null, flashcard.id)}
                        className="btn btn-sm btn-warning">Delete</button>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table> :
          <button className="btn btn-block btn-danger">data not received</button> }
      </div>

    )
  }
}
