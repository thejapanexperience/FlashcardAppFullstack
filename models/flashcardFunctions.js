const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const filename = path.join(__dirname, '../data/flashcards.json');

// Get all flashcards. Read from file then return all cards.
exports.getAll = function (cb) {
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch (e) {
      var data = [];
    }
    cb(err, data);
  });
};

exports.getOne = function (id, cb){
  // get all of the data from the file
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch (e) {
      var data = [];
      return cb('failed');
    }
    // push all of the possible categories into an array
    let categories = []
    for (var i = 0; i < data.length; i++) {
      if (data[i].Category) {
        categories.push(data[i].Category)
      }
    }
    // sort the categories and then remove duplicates
    categories.sort()
    for (var i = 0; i < categories.length; i++) {
      while (categories[i] === categories[i+1]) {
        categories.splice(i+1)
      }
    }

    // id can be a card id or a category/multiple categories separated by commas
    let one
    // split by commas then check if the first one is a category
    id = id.split(',')
    if (categories.indexOf(id[0]) > -1) {
      // if it's a category, then choose one of the categories submitted at random
      id = id[Math.floor(Math.random()*id.length)]
      // filter to get questions just from that category
      var random = data.filter((flashcard) => {
        return flashcard.Category === id
      })
      // get a random question from the category
      one = random[Math.floor(Math.random()*random.length)]
      one = `Question ${one.Question}
Use ID to check the answer: ${one.id}.`
      console.log('one: ', one)
    } else {
      // if its an id then get the flashcard with that id
      id = id[0]
      one = data.filter((flashcard) => {
        return flashcard.id === id
      })
      one = one[0]
    }
    cb(err, one);
  });
};

// put with id submitted and also new data to replace old data. Initially, edit is set to true then another request to add the data.
exports.editOne = function (id, newData, cb) {
  // first read all of the data form the file
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch (e) {
      var data = [];
      return cb('failed');
    }
    let index;
    // find the index of the one with the submitted id (could have used indexOf instead!)
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i
      }
    }
    // set the edit value of any card with a different id to false. Allows only one to be edited at a time
    for (var i = 0; i < data.length; i++) {
      if (i!== index) {
        data[i].edit = false
      }
    }
    // set the edit value of the card to be edited to true. This will activate the inputs to allow new data to be submitted
    // put data body included edit: true
    if (newData.edit) {
      data[index].edit = true

      // once the updated data is submitted. This will update the data file. Reset edit to false so go back to standard view.
    } else {
      data[index].Category = newData.Category;
      data[index].Question = newData.Question;
      data[index].Answer = newData.Answer;
      data[index].edit = false
    }
    // write updated data
    let json = JSON.stringify(data);
    fs.writeFile(filename, json, (err) => {
      cb(err, data);
    });
  });
};

// delete submitted with id
exports.deleteOne = function(id, cb) {
  // read the file to get data
  fs.readFile(filename, (err, buffer) => {
    if (err) return cb(err);
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      var data = [];
      return cb('failed');
    }
    // find index of one to be deleted from the id
    let index
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        index = i;
      }
    }
    // remove the data at index
    data.splice(index, 1);
    // write updated data
    const json = JSON.stringify(data);
    fs.writeFile(filename, json, (err) => {
      cb (err);
    });
  });
};

// write the new data
exports.write = function (items, cb) {
  const json = JSON.stringify(items);
  fs.writeFile(filename, json, cb);
  exports.getAll(cb);
};

// post new data for flashcard
exports.create = function (newItem, cb) {
  // get the data from the file
  exports.getAll((err, items) => {
    if (err) return cb(err);
    // add id and edit = false to newItem
    newItem.id = uuid();
    newItem.edit = false;
    // push new item to the data
    items.push(newItem);
    // write the data to the file
    exports.write(items, cb);
  });
};
