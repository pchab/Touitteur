Template.follow.users = function () {
  return Meteor.users.find(
    {'_id': {
      $not: Meteor.userId(),
      $nin: Meteor.user().profile.following
    } },
    {fields: {
      username: 1
    } }
  );
};

Template.follow.events({
  'click input.follow': function () {
    Meteor.users.update(
      {'_id': Meteor.userId() },
      {$push: {'profile.following': Session.get('selected_user')} }
    )
  }
});