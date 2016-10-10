import AppDispatcher from '../AppDispatcher'

const NormalActions = {
  generateStudyDeck(categories){
    AppDispatcher.dispatch({
      type: 'CATEGORY_CHOSEN',
      payload: { categories }
    })
  },

  messageIndex(){
    AppDispatcher.dispatch({
      type: 'MESSAGE_INDEX'
    })
  },

  categoryArray(categoryArray){
    AppDispatcher.dispatch({
      type: 'CATEGORY_ARRAY',
      payload: { categoryArray }
    })
  },

}
export default NormalActions
