var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json()); //parsing JSON into JS obj. 

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc)
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos}) //todos is an array (wrapped in obj) for workability
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid ID');
	}
	Todo.findById(id).then((todo) => {
		if(!todo) {
			return res.status(404).send('User not found!')
		}
		res.send({todo});
	}).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
	//get the id
	var id = req.params.id;

	if(!ObjectID.isValid(id)) {
		return res.status(404).send('Invalid id')
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send('No Todo found!')
		}
		res.send({todo});
	}).catch((e) => res.status(400).send())
});


app.listen(port, ()=> {
	console.log(`Server is up on port ${port}`);
})

module.exports = {app};

