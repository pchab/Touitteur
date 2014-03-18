Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

Template.user.selected = function () {
  return Session.equals('selected_user', this._id) ? 'selected' : '';
};

Template.user.events({
  'click': function () {
    Session.set('selected_user', this._id);
  }
});