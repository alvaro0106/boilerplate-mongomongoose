require('dotenv').config();


const createAndSavePerson = (done) => {
  var janeFonda = new Person({ 
    name: "Miranda", 
    age: 1, 
    favoriteFoods: ["eggs", "fish", "fresh fruit"] });
  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create Many Records with model.create() */
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people){
    if (err) return console.log(err);
    done(null, people);
  });
};

/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
    // done(null /*, data*/);
  });
};

/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

/** 7) Use `Model.findById()` */
var findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    }) 
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};


const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;


// // My Code here   
const personSchema  = new Schema({
  name: { type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);
let miranda = new Person({
  name: "miranda",
  age: 2,
  favoriteFoods: ["pizza", "nada"]
});


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;