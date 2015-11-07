Events = new Mongo.Collection('events');

Meteor.methods({
  addEvent: function (event) {
  	  Events.insert(event, function(err, id){
    	if (err){
    		console.log("Insert event not OK " + err);
    		return;
    		}
    	//this.Session.set("eventId", id);
    	return id;
    });
    
  },
  removeEvent: function (id) {
  	console.log("In method removeEvent: " + id);
    Events.remove(id)
  }
})