import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveFlashCards(flashcards){
    AppDispatcher.dispatch({
      type: 'CARD_RECEIVED',
      payload: { flashcards }
    })
  },
}
export default ServerActions
