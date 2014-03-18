Meteor.startup(function () {
	Accounts.onCreateUser(function(options, user) {
		user.profile = {};
		user.profile.following = [];
	  return user;
	});
});