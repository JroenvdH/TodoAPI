const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	text: 'first test todo'
}, {
	text: 'second test todo'
}]

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
})