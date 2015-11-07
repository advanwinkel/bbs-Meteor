Meteor.publish("events", function () {
  // Simulate slow network response
  Meteor._sleepForMs(500)
  return Events.find({})
})