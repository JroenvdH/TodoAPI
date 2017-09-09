//New in ES6: Object destructuring. Take an attribute of an obj and turn its name value 
//pair into a variable.
	// var user = { name: 'Jeroen', age: 28};
	// var {name} = user;  (name:name , value: Jeroen)
//real example:
// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
	if(err) {
		return console.log('Unable to connnect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

// 	db.collection('Todos').insertOne({
// 		text: 'Something to do',
// 		completed: false
// 	},(err, result) => {
// 		if(err) {
// 			return console.log('Unable to insert new Todo');
// 		}
// //res.ops: ops attribute is an array of all inserted docs
// 		console.log(JSON.stringify(result.ops, undefined, 2))
// 	})

	// db.collection('Users').insertOne({
	// 	name: 'Jeroen',
	// 	age: 28,
	// 	location: 'Netherlands'
	// }, (err, result) => {
	// 	if(err) {
	// 		return console.log('Unable to insert new doc');
	// 	}
	// 	console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2))
	// });


	db.close();
});