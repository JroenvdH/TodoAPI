const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id =    '59bc135f66093dc0201bcb30';
var userId= '59b68fadda1aaac804f759c4';

// if(!ObjectID.isValid(id)) {
// 	console.log('ID not valid');
// }

Todo.find({
	_id: id // id is a string, gets converted to an objID by Mongoose
}).then((todos) => {
	console.log('Todos:', todos);
});

//Find the first (or only) item that matches the query
Todo.findOne({
	_id: id
}).then((todo) => {
	console.log('Todo:', todo);
});

Todo.findById(id).then((todo) => {
	if(!todo) {
		return console.log('ID not found');
	}
	console.log('Todo2:', todo);
}).catch((e) => console.log(e)) //Catching errors in objID (given by user)

//Find a user by ID. Handle all 3 scenarios: ID found, not found & error

User.findById(userId).then((user) => {
	if(!user) {
		return console.log('User not found');
	}
	console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
	return console.log('Invalid user id')
})
	

