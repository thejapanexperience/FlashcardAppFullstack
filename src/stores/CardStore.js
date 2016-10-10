import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import _ from 'lodash'


let _ready = false
let _allFlashCards = ''
let _categories = ''
let _playDeck = ''
let _playMessage = ''
let _playMessageIndex = ''
let _cardMessage = ''
let _categoryArray = []

class CardStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'CARD_RECEIVED':
        _allFlashCards = action.payload.flashcards
        console.log('_allFlashCards: ', _allFlashCards)
        _categories = []
        for (var i = 0; i < _allFlashCards.length; i++) {
          _categories.push(_allFlashCards[i].Category)
        }
        _categories.sort()
        for (var i = 0; i < _categories.length; i++) {
          while (_categories[i] === _categories[i+1]){
            _categories.splice(i+1, 1)
          }
        }
        console.log('_categories: ', _categories)
        _ready = true;
        this.emit('CHANGE')
        break

        case 'CATEGORY_CHOSEN':
        let newCategories = action.payload.categories
        console.log('newCategories: ', newCategories)
        _playDeck = _allFlashCards.filter((flashcard) => {
            if (newCategories.indexOf(flashcard.Category) > -1) {
              return flashcard
            }
          })

        console.log('_playDeck: ', _playDeck)
        _playDeck = _.shuffle(_playDeck);
        console.log('_playDeck: ', _playDeck)
        _playMessage=[]
        for (var i = 0; i < _playDeck.length; i++) {
          _playMessage.push(_playDeck[i].Question)
          _playMessage.push(_playDeck[i].Answer)
        }
        _playMessage.push("Choose another category to play again.")
        console.log('_playMessage: ', _playMessage)
        _playMessageIndex = 0
        _cardMessage = _playMessage[_playMessageIndex]
        console.log('_cardMessage: ', _cardMessage)
        this.emit('CHANGE')
        break

        case 'MESSAGE_INDEX':
        _playMessageIndex = _playMessageIndex + 1
        _cardMessage = _playMessage[_playMessageIndex]
        console.log('_cardMessage: ', _cardMessage)
        this.emit('CHANGE')
        break

        case 'CATEGORY_ARRAY':
        _categoryArray = action.payload.categoryArray
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getAllFlashCards(){
    return _allFlashCards
  }

  getAllCategories(){
    console.log('_categories: ', _categories)
    return _categories
  }

  getReady(){
    return _ready
  }

  getCardMessage(){
    return _cardMessage
  }

  getPlayMessage(){
    return _playMessage
  }

  getPlayMessageIndex(){
    return _playMessageIndex
  }

  getCategoryArray(){
    return _categoryArray
  }

}

export default new CardStore
