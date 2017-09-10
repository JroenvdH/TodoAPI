const {MongoClient, ObjectId} = require('mongodb'); 


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
	if(err) {
		return console.log('Unable to connnect to MongoDB server');
	}
	console.log('Connected to MongoDB server');

	//findOneAndUpdate(filter, replacement{}, options{}, promise/callback)
	// db.collection('Todos').findOneAndUpdate({
	// _id: new ObjectId('59b4125e5d44248f1a06cb66')
	// }, {
	// 	$set: {
	// 		completed: true
	// 	}
	// },{
	// 	returnOriginal: false
	// }).then((result) => {
	// 	console.log(result);
	// });

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectId('59b58d1ae279ad0604c54a72')
	}, {
		$set: {
			name: 'Jeroen'
		}, 
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((res) => {
		console.log(res);
	});

	

	// db.close();
});