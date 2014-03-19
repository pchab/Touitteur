Meteor.startup(function () {
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};
		user.profile.following = [];
		user.profile.reach = 'local';
	  return user;
	});

	Meteor.publish('messages', function(){
		return Messages.find();
	});

	Meteor.publish('users', function(){
		return Meteor.users.find({}, {fields: {'username': 1}});
	});

	Messages.allow({
		insert: function (userId, doc) {
			return (userId && doc.id === userId);
		}
	});
});