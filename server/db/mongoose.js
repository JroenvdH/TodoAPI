var mongoose = require('mongoose');

let db = {
	mlab: 'mongodb://keko:testtest@ds141274.mlab.com:41274/todo_api',
	localhost: 'mongodb://localhost:27017/TodoApp'
}

mongoose.Promise = global.Promise;
mongoose.connect(db.localhost || db.mlab);


module.exports = {mongoose};