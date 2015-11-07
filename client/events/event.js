
Template.event.onRendered(function() {
  var template = this
  //Vue.use(window['vue-validator'])
  Vue.config.debug = true;
  var vm = new Vue({
    el: '#events',
    data: {
      name: 'Naam',
      events: [],
      event: { name: '', description: '', date: '' },
      todosSubscription: null,
      subscriptionsReady: false
    },
    methods: {
      addEvent: function (e) {
        console.log( "add event: " + e);
        e.preventDefault();
        if (this.event.name) {
          Meteor.call('addEvent', this.event, function(err, result){
            this.event.id = result;
            //this.events.push(this.event);
          });
          this.event = { name: '', description: '', date: '' };
        }
      },
      deleteEvent: function (index) {
        console.log(vm.events[index].id);
        Meteor.call('removeEvent', vm.events[index]._id)
      },
      loadMore: function() {
        template.limit.set(template.limit.get() + 5)
      },
    },
    sync: {
      'events': function() {
        return Events.find({})
      },
      'todosSubscription': function() {
        var subscription = template.subscribe('events')

        // if subscription is ready, set limit to new limit
        if (subscription.ready()) {
          return subscription
        }
      },

      subscriptionsReady: function() {
        return template.subscriptionsReady()
      }
    },
    destroyed: function () {
      this.subscription.stop()
    }
  })

})
