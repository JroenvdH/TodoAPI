const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const{ObjectID} = require('mongodb');

const todos = [{
	_id: new ObjectID(),
	text: 'first test todo'
}, {
	_id: new ObjectID(),
	text: 'second test todo'
}]

var idNotFound = ObjectID('69bc135f66093dc0201bcb31');

//setting up usecases for out tests.E.g. making sure the db is empty so my script 
//will actually be correct
beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
})

describe('POST /todos', () => {
	it('Should create a new todo', (done) => {
		var text= 'Test todo text';

		request(app) //request on 
		.post('/todos')
		.send({text}) //supertest converts obj to JSON (ES6 notation here)
		.expect(200) //assertions about the request
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if(err) {
				return done(err); //wrap up test and print to screen
			}
//Checking if stored in database
			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e)); //catching errors occured in the callback
		});
	});

	
	it('should not create a new todo', (done)=> {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if (err) {
				return done(err)
			}
			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done()
			}).catch((e) => done(e));
		});
	});
});

describe('GET/todos', () => {
	it('should get all todos', (done) => {
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2); //expect the array to have 2 items
		})
//no need for params as above (err, res) because I'm not doing anythin async.
		.end(done);
	});
});

describe('GET/todos/:id', () => {
	it('should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`) //.toHexString converts objID to string
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done);
	});

	it('Should return 404 if todo not found', (done) => {
		request(app)
		.get(`/todos/${idNotFound.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('Should return 404 for non-object ids', (done) => {
		request(app)
		.get('todos/41234')
		.expect(404)
		.end(done);
	});
});

describe('/DELETE/todos/:id', () => {
	it('Should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();
		
		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err, res) => {
			if(err) {
				return done(err);
			}
			Todo.findById(hexId).then((todo) => {
				expect(todo).toNotExist();
				done();
			}).catch((e) => done(e))
		});
	});

	it('Should return 404 if todo not found', (done) => {
		request(app)
		.delete(`/todos/${idNotFound.toHexString()}`)
		.expect(404)
		.end(done);
	});

	it('should return 404 if invalid ObjectID', (done) => {
		request(app)
		.delete('todos/41234')
		.expect(404)
		.end(done);
	});
});