Template.unfollow.users = function () {
  return Meteor.users.find(
    {'_id': 
      { $in: Meteor.user().profile.following }
    }
  );
};

Template.unfollow.events({
  'click input.unfollow': function () {
    Meteor.users.update(
      {'_id': Meteor.userId() },
      {$pull: {'profile.following': Session.get('selected_user')} }
    )
  }
});