import API from '../API'

const ToAPIActions = {

  getFlashcards(){
    console.log('In the toAPIActions action: ')
    API.getFlashcards()
  },

  makeFlashcardEditable(id){
    console.log('In the toAPIActions action: ')
    API.makeFlashcardEditable(id)
  },

  makeFlashcardEdit(id, newData){
    console.log('In the toAPIActions action: ')
    API.makeFlashcardEdit(id, newData)
  },

  deleteFlashcard(id){
    console.log('In the toAPIActions action: ')
    API.deleteFlashcard(id)
  },

  addFlashcard(newFlashcard){
    console.log('In the toAPIActions action: ')
    API.addFlashcard(newFlashcard)
  },



}

export default ToAPIActions
