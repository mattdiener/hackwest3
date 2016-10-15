import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  classNames: ["fullscreen"],

  init() {
    console.log(this.session);
  },

  actions: {
  }
});
