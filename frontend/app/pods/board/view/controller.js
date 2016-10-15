import Ember from 'ember';

export default Ember.Controller.extend({

  notifications: Ember.inject.service('notification-messages'),
  theModel: null,
  topicElement: null,
  currentSelectedTopicId: null,
  newSuggestion: null,
  currentBoardToken: null,
  // topicsList: function() {
  //   return this.get('model').topics;
  // }.property('model'),

  init() {
    const self = this;
    Ember.$(document).ready(() => {
      const accordion = Ember.$('.topics-accordion').accordion({
        onChange: function () {
          self.set('currentSelectedTopicId', this.getAttribute('data-id'));
        }
      });
      if (accordion) {
        this.set("topicElement", accordion);
      }
    });
  },

  initModel: function() {
    const model = this.get("model");
    if (model && model.status === 200) {
      this.set('theModel', model);
      this.set('currentBoardToken', model.token);
    }
  }.observes('model'),

  actions: {
    addTopic() {
      console.log(this.newTopic);
      if ( !this.newTopic) {
        return;
      }
      const opts = {
        url: '/boards/'+this.get('currentBoardToken')+"/topics",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: {
          topic: this.newTopic
        }
      };
      console.log(this.get('model.topics'));
      const self = this;
      Ember.$.ajax(opts).then(() => {
        this.get('notifications').success('Topic added!', {
          autoClear: true,
          clearDuration: 1200
        });
        // Add this new topic into
        console.log("lol");
        self.set('newTopic', "");
      }, (xhr) => {
        this.get('notifications').error('Error adding topic!', {
          autoClear: true,
          clearDuration: 1200
        });
        self.get('model.board.topics').pushObject({
          "boardId": "KbLc",
          "name": "Monday Morning",
          "suggestions": [],
          "topicId": "RLn9"});
        // error case, clear text box
        console.log(self.get('model'));
      });
    }
  }
});
