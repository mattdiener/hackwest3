import Ember from 'ember';

export default Ember.Component.extend({
  notifications: Ember.inject.service('notification-messages'),
  suggestionId: Ember.computed('suggestion', () => { return this.get('suggestion.suggestionId'); }),
  disableYes: false,
  disableNo: false,
  userIdStub: 1234,

  didInsertElement() {
    const voters = this.get('suggestion.votes');
    if (voters) {
      for (let i = 0; i < voters.length; i++) {
        // TODO: change userId once we got this right
        if (voters[i].name === this.userIdStub) {
          localStorage[this.get('suggestion.suggestionId')] = voters[i].vote;
          break;
        }
      }
    }
  },
  willRender() {
    const votedForThis = localStorage[this.get('suggestion.suggestionId')];
    if (votedForThis) {
      console.log("found voted for this ", votedForThis);
      if (votedForThis === "1") {
        // true case
        this.set("disableYes", true);
        this.set("disableNo", false);
      } else if (votedForThis === "0") {
        this.set("disableYes", false);
        this.set("disableNo", true);
      }
    }
  },

  actions: {
    vote(yes) {

      const urlToPut = "/boards/"+this.get('suggestion.boardId')+"/topics/"+this.get('suggestion.topicId') +
                       "/suggestions/"+this.get('suggestion.suggestionId') + "/" + yes ? 1 : 0;
      const opts = {
        url: urlToPut,
        type: 'PUT',
        dataType: 'json',
        contentType: 'application/json',
        data: {
          userId: this.userIdStub
        }
      };

      const self = this;
      Ember.$.ajax(opts).then(() => {
        this.get('notifications').success('Vote submitted!', {
          autoClear: true,
          clearDuration: 1200
        });
        // Add this new topic into
        localStorage[this.get('suggestion.suggestionId')] = yes ? 1 : 0;
        let currentVote = self.get('suggestion.voteCount');
        const increment =  yes ? self.get('disableNo') ? 2 : 1 : self.get("disableYes") ? -2 : -1;
        currentVote += increment;
        self.set("suggestion.voteCount", currentVote);
      }, (xhr) => {
        this.get('notifications').error('Error voting!', {
          autoClear: true,
          clearDuration: 1200
        });
        localStorage[this.get('suggestion.suggestionId')] = yes ? 1 : 0;
        let currentVote = self.get('suggestion.voteCount');
        const increment =  yes ? self.get('disableNo') ? 2 : 1 : self.get("disableYes") ? -2 : -1;
        currentVote += increment;
        self.set("suggestion.voteCount", currentVote);
      });
    }
  }
});
