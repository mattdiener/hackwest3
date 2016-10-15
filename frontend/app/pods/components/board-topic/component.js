import Ember from 'ember';

export default Ember.Component.extend({

  notifications: Ember.inject.service('notification-messages'),


  actions: {

    addSuggestion() {
      console.log(this.currentSelectedTopicId);
      console.log(this.newSuggestion);
      const boardId = this.get("topic.boardId");
      const topicId = this.get('topic.topicId');
      // this.set("newSuggestion", Ember.$("#the-suggestion").text());
      console.log(this.newSuggestion, boardId);
      if (!boardId || !topicId || !this.newSuggestion) {
        console.log('hi')
        return;
      }

      const urlToPost = "/boards/"+boardId+"/topics/"+topicId+"/suggestions";
      console.log(urlToPost);
      const opts = {
        url: urlToPost,
        type: 'POST',
        // dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({name: this.newSuggestion})
      };

      const self = this;
      Ember.$.ajax(opts).then((result) => {
        this.get('notifications').success('Suggestion added!', {
          autoClear: true,
          clearDuration: 1200
        });
        // clear text box then add notification
        self.set('newSuggestion', "");
        this.get('topic.suggestions').pushObject(result);
      }, (xhr) => {
        this.get('notifications').error('Error adding suggestion!', {
          autoClear: true,
          clearDuration: 1200
        });
        console.log(this.get('topic.suggestions'));
      });
    }
  }

});
