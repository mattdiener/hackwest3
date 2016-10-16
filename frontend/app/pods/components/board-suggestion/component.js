import Ember from 'ember';

export default Ember.Component.extend( {
  notifications: Ember.inject.service('notification-messages'),
  suggestionId: Ember.computed('suggestion', () => { return this.get('suggestion.suggestionId'); }),
  disableYes: false,
  disableNo: false,
  userId: '',
  uniqueKey: null,

  didInsertElement() {
    this.set('userId', JSON.parse(localStorage.boardUsers)[this.get('suggestion.boardId')]);
    this.set('uniqueKey', "vote_" + this.get('suggestion.suggestionId'));
    const voters = this.get('suggestion.votes');
    if (voters) {
      for (let i = 0; i < voters.length; i++) {
        // TODO: change userId once we got this right
        if (voters[i].name === this.userId) {
          localStorage[this.get('suggestion.suggestionId')] = voters[i].vote;
          break;
        }
      }
    }
  },
  willRender() {
    const votedForThis = localStorage[this.get('suggestion.suggestionId')];
    if (votedForThis) {
      // console.log("found voted for this ", votedForThis);
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
    loadPlaceDetails(placeId) {
      const placedetail = new google.maps.places.PlacesService((document.getElementById("places-details")));
      const self = this;
      placedetail.getDetails({placeId: placeId}, (result, status) => {
        // Propoate this up to controller
          self.sendAction('action', result);
      });
      // this.sendAction('action', 'poop');
    },

    vote(yes) {

      const urlToPut = "/boards/"+this.get('suggestion.boardId')+"/topics/"+this.get('suggestion.topicId') +
                       "/suggestions/"+this.get('suggestion.suggestionId') + "/vote";
      const opts = {
        url: urlToPut,
        type: 'PUT',
        // dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
          name: this.userId,
          vote: yes ? 1 : 0
        })
      };

      const self = this;
      Ember.$.ajax(opts).then((result) => {
        this.get('notifications').success('Vote submitted!', {
          autoClear: true,
          clearDuration: 1200
        });
        // Add this new topic into
        localStorage[this.get('suggestion.suggestionId')] = yes ? 1 : 0;
        self.set("suggestion.voteCount", result.voteCount);
        // console.log(result.voteCount);
        this.willRender()
      }, (xhr) => {
        this.get('notifications').error('Error voting!', {
          autoClear: true,
          clearDuration: 1200
        });
        /*
        localStorage[this.get('suggestion.suggestionId')] = yes ? 1 : 0;
        let currentVote = self.get('suggestion.voteCount');
        const increment =  yes ? self.get('disableNo') ? 2 : 1 : self.get("disableYes") ? -2 : -1;
        currentVote += increment;
        self.set("suggestion.voteCount", currentVote);
        */
      });
    }
  }
});
