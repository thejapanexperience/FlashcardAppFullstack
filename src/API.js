import axios from 'axios'
import { get, put, post, delete } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getFlashcards(){
    get(`http://localhost:8000/flashcards`)
    .then(res => {
      console.log('res: ', res)
      if (!res.err) {
        ServerActions.receiveFlashCards(res.data)
      } else
      console.log('res.err: ', res.err)
    })
    .catch(console.error)
  },

  addFlashcard(newFlashcard){
    post(`http://localhost:8000/flashcards`, {
      Category: newFlashcard.Category,
      Question: newFlashcard.Question,
      Answer: newFlashcard.Answer,
      id: newFlashcard.id,
      edit: newFlashcard.edit,
    })
      .then(res => {
        console.log('res: ', res)
        if (!res.err) {
          ServerActions.receiveFlashCards(res.data)
        } else
        console.log('res.err: ', res.err)
      })
      .catch(console.error)
  },

  makeFlashcardEditable(id){
    console.log('API editable id: ', id)
    put(`http://localhost:8000/flashcards/${id}`, {
      edit: true
    })
    .then(res => {
      console.log('res: ', res)
      if (!res.err) {
        ServerActions.receiveFlashCards(res.data)
      } else
      console.log('res.err: ', res.err)
    })
    .catch(console.error)
  },

  // makeFlashcardEditable(id){
  //   console.log('API editable id: ', id)
  //   put(`http://localhost:8000/flashcards/${id}`, {
  //     edit: true
  //   })
  //     .then(res => {
  //       let { data } = res
  //       console.log('data: ', data)
  //       ServerActions.receiveFlashCards(data)
  //     })
  //     .catch(console.error)
  // },

  makeFlashcardEdit(id, newData){
    console.log('API editable id: ', id)
    put(`http://localhost:8000/flashcards/${id}`, {
      Category: newData.Category,
      Question: newData.Question,
      Answer: newData.Answer
    })
    .then(res => {
      console.log('res: ', res)
      if (!res.err) {
        ServerActions.receiveFlashCards(res.data)
      } else
      console.log('res.err: ', res.err)
    })
    .catch(console.error)
  },

  // makeFlashcardEdit(id, newData){
  //   console.log('API editable id: ', id)
  //   put(`http://localhost:8000/flashcards/${id}`, {
  //     Category: newData.Category,
  //     Question: newData.Question,
  //     Answer: newData.Answer
  //   })
  //     .then(res => {
  //       let { data } = res
  //       console.log('data: ', data)
  //       ServerActions.receiveFlashCards(data)
  //     })
  //     .catch(console.error)
  // },

  deleteFlashcard(id){
    console.log('id: ', id)
    axios.delete(`http://localhost:8000/flashcards/${id}`)
    .then(res => {
      console.log('res: ', res)
      if (!res.err) {
        ServerActions.receiveFlashCards(res.data)
      } else
      console.log('res.err: ', res.err)
    })
    .catch(console.error)
  }
}

export default API
