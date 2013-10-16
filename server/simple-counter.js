Emails = new Meteor.Collection("emails");
Counts = new Meteor.Collection("counts");

Meteor.publish("counts", function() {
    return Counts.find({});
});

if (Meteor.isServer) {
  Meteor.startup(function () {
     if (Counts.find().count() === 0) {
        Counts.insert({name: 'counter', countValue: Emails.find().count()});
     }
  });
  Meteor.methods({
    submitEmail: function (email) {
      var currentCount = Counts.findOne();
      if (Emails.find({email : email}).count() >= 1) {
        throw new Meteor.Error(404, "error");
      }
      else {
        Counts.update({_id: currentCount._id}, {$inc: {countValue: 1}});
        var user_id = Emails.insert({email: email});
      }
    }
  });
}

