import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    Ember.$(document)
      .ready(() => {
        console.log("ready!");
        // fix menu when passed
        Ember.$('.masthead')
          .visibility({
            once: false,
            onBottomPassed: function() {
              Ember.$('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              Ember.$('.fixed.menu').transition('fade out');
            }
          });
        // create sidebar and attach to menu open
        Ember.$('.ui.sidebar')
          .sidebar('attach events', '.toc.item');
      });
  }
});
