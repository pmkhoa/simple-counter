Counts = new Meteor.Collection("counts");

Meteor.subscribe("counts");

Template.CounterWrapper.CounterValue = function () {
  if (Counts.findOne()) {
    return Counts.findOne().countValue;
  }
};

Template.bodyContainer.events({
  'click .submit-counter' : function () {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = $("#email").val();
    if ( (email != "") && (emailReg.test(email)) ) {
      Meteor.call('submitEmail', email, function(error) {
        if (error) {
          $(".notice-email-duplicate-input").fadeIn(600);
        }
        else {
          $(".notice-empty-input").fadeOut(500);
          $(".notice-email-duplicate-input").fadeOut(600);
        }
      });
    }
    else {
      $(".notice-empty-input").fadeIn(600);
    }
    return false;
  }
});

