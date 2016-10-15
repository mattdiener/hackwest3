import Ember from 'ember';

export default Ember.Component.extend({
  notifications: Ember.inject.service('notification-messages'),

  actions: {

    addSuggestion() {
      console.log("ok")
      this.set("newSuggestion", Ember.$("#the-suggestion").val());
      if (!this.currentSelectedTopicId || !this.newSuggestion) {
        return;
      }

      const opts = {
        url: '/boards/'+this.get('currentBoardToken')+"/topics/"+this.currentSelectedTopicId+"/suggestions",
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: {
          topic: this.newSuggestion
        }
      };
      Ember.$.ajax(opts).then(() => {
        this.get('notifications').success('Suggestion added!', {
          autoClear: true,
          clearDuration: 1200
        });
        // clear text box then add notification
      }, (xhr) => {
        this.get('notifications').error('Error adding suggestion!', {
          autoClear: true,
          clearDuration: 1200
        });
      });
    }
  }

});
