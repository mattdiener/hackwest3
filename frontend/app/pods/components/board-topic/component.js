import Ember from 'ember';

export default Ember.Component.extend(Ember.Evented, {

  notifications: Ember.inject.service('notification-messages'),
  uniqueTextBox: function() {
    return "places-autcomplete"+"_"+this.get('topic.topicId');
  }.property('topic'),
  currentPlaceId: null,

  didInsertElement: function(){
    const self = this;
    // self.set('autoCompleteElement', Ember.$('.places-autocomplete'));
    // var k = Ember.$("")
    console.log((document.getElementById(this.get('uniqueTextBox'))));
    const autocomplete = new google.maps.places.Autocomplete((document.getElementById(this.get('uniqueTextBox'))), {types: ['establishment']});
    // self.set('googleAutocompleter', autocomplete);
    google.maps.event.addListener(autocomplete, 'place_changed', function() {
      const place = autocomplete.getPlace().place_id;
      console.log(place);
      self.set('currentPlaceId', place);
      var p = (document.getElementById("places-details"));
      console.log(p);
      const placedetail = new google.maps.places.PlacesService((document.getElementById("places-details")));
      placedetail.getDetails({placeId: place}, (result, status) => {
        console.log(result, status);
        self.sendAction('action', result);
      });
    });
    // });
  },

  actions: {

    launchPlaceDetail(param) {
      // propogate event up to controller
      this.sendAction('action', param);
    },

    addSuggestion() {
      console.log(this.currentSelectedTopicId);
      console.log(this.newSuggestion);
      const boardId = this.get("topic.boardId");
      const topicId = this.get('topic.topicId');
      const placeId = this.get('currentPlaceId');
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
        data: JSON.stringify({name: this.newSuggestion, placeId: placeId})
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
