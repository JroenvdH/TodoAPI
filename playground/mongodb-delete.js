const {MongoClient, ObjectId} = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
	if(err) {
		return console.log('Unable to connnect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	db.collection('Todos').find()

	//deleteMany: Deletes all matching criterea
		// db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
		// 	console.log(result);
		// });
	
	//deleteOne: Deletes 1 matching critea and stops
		// db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
		// 	console.log(result);
		// });

	//findOneAndDelete: find 1 doc, gets its data and deletes it(if wanted)
		// db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
		// 	console.log(result);
		// });

	db.collection('Users')
	.findOneAndDelete({_id: new ObjectId('59b2dd1c27bbaa1630c51e49')
	}).then((res) => {
		console.log(JSON.stringify(res, undefined, 2));
	});

	db.collection('Users').deleteMany({name: 'Jeroen'}).then((res) => {
		if(res) {
			console.log('Done!');
		} else {
			console.log('Failed!');
		}
	});

	// db.close();
});