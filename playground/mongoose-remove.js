const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//Remove all matching docs
// Todo.remove({}).then((res) => {
// 	console.log(res);
// })

//Find particular doc, remove it and send the removed doc back (e.g. for verification)
Todo.findOneAndRemove({
	_id: '59be6d032a5ecd4c20229883'
}).then((doc) => {
	
})


Todo.findByIdAndRemove('59be6d032a5ecd4c20229883').then((todo) => {
	console.log(todo);
});

