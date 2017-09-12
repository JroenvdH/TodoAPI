var mongoose = require('mongoose');

var User = mongoose.model('User', {
	email: {
		type: String,
		minlength: 1,
		trim: true,
		required: true
	}
});

module.exports = {User}

// var someUser = new User({
// 	email: '   differentUser@example.com  '
// })

// someUser.save().then((doc) => {
// 	console.log('Saved!', doc)
// }, (e) => {
// 	console.log('An error occured:', e)
// })