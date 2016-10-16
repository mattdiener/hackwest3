import Ember from 'ember';

export default Ember.Component.extend({
  display: false,

  uiSetup: function(){

  }.on('didInsertElement').observes('place')
});
