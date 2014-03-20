Meteor.subscribe('messages');

Template.messageBoard.messages = function () {
  return Messages.find(
    {'id': 
      { $in: Meteor.user().profile.following.concat(Meteor.userId()) }      
    },
    {sort: {'timestamp': -1}}
  );
};

Template.messageBoard.events({
  'click input.post': function () {
    var postInput = document.getElementById("new_post");
    var text = postInput.value.trim();
    postInput.value = '';
    if (Validation.valid_post(text)) {
      Messages.insert(
        {
          'text': text,
          'user': Meteor.user().username,
          'id': Meteor.userId(),
          'timestamp': (new Date()).getTime()
        }
      );
    }
  }
});

Template.messageBoard.error = function () {
  return Session.get("error");
};

Validation = {
  clear: function () {
    return Session.set("error", undefined);
  },
  set_error: function (message) {
    return Session.set("error", message);
  },
  valid_post: function (name) {
    this.clear();
    if (name.length == 0) {
      this.set_error("Post can't be blank");
      return false;
    } else {
      return true;
    }
  }
};

Template.message.date = function () {
  return (new Date(this.timestamp)).toLocaleString();
}