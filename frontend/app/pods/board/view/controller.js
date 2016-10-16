import Ember from 'ember';

export default Ember.Controller.extend({

  notifications: Ember.inject.service('notification-messages'),
  theModel: null,
  topicElement: null,
  currentSelectedTopicId: null,
  newSuggestion: null,
  currentBoardToken: null,
  currentPlaceDetail: null,
  showRightPanel: false,
  userId: null,

// SUPER BAD, HACKY TACKY
  interval: 5000,
  url: null,
  timer: null,

  init() {
    const self = this;
    Ember.$(document).ready(() => {
      self.initModel();
      Ember.$.getScript('/js/embedTlkio.js');

      var accordion = Ember.$('.topics-accordion').accordion({
        onChange: function () {
          self.set('currentSelectedTopicId', this.getAttribute('data-id'));
        }
      });
      if (accordion) {
        self.set("topicElement", accordion);
      }
    });

    Ember.run.later(() => {
       this.startPolling(this.get('interval'));
    }, 10000);
  },

  schedulePollEvent(event, interval) {
      var eventInterval = 5000;
      return Ember.run.later(()=>{
        event.apply(this);
        this.set('timer', this.schedulePollEvent(event));
      }, eventInterval);
    },

    startPolling(interval) {
       this.set('timer', this.schedulePollEvent(this.get('onPollEvent'), 5000));
    },

    stopPolling() {
      Ember.run.cancel(this.get('timer'));
    },

    onPollEvent() {
      //make request
      console.log(this.get('url'));
      const opts = {
        url: this.get('url'),
        type: "GET",
        contentType: 'application/json',
      };
      const self = this;
      return Ember.$.ajax(opts).then( (res) => {this.get('updateView')(res,self)});
    },
  initModel: function() {
    const model = this.get("model");
    if (model && model.status === 200) {
      this.set('theModel', model);
      this.set('currentBoardToken', model.boardId);
      this.set('userId', JSON.parse(localStorage.boardUsers)[this.get('model.boardId')] );
      this.set('url','/boards/'+this.get('model.boardId'));
      // console.log("ok");
    }
  },

  updateView: function(newModel,self) {
    // console.log("updateView called");
    let model = self.get("model");

    if (model.board.name != newModel.board.name){
      self.set("model.board.name",newModel.board.name);
    }

    for (var i = 0; i < newModel.board.topics.length; i++){
      var matchingTopic = null;
      for (var j = 0; j < model.board.topics.length; j++){
        if (newModel.board.topics[i].topicId == model.board.topics[j].topicId){
          matchingTopic = model.board.topics[j];
          break;
        }
      }
      if (!matchingTopic){
        self.get("model.board.topics").pushObject(newModel.board.topics[i]);
      }else{
        for (var k = 0; k < newModel.board.topics[i].suggestions.length; k++){
          var matchingSuggestion = null;
          for (var l = 0; l < matchingTopic.suggestions.length; l++){
            if (newModel.board.topics[i].suggestions[k].suggestionId == matchingTopic.suggestions[l].suggestionId){
              matchingSuggestion = newModel.board.topics[i].suggestions[k];
              break;
            }
          }
          if (!matchingSuggestion){
            //Ember.pushObject(matchingTopic, 'suggestions', k);
            matchingTopic.suggestions.pushObject(newModel.board.topics[i].suggestions[k]);
          }else{
            // HACK to update vote count
            Ember.$('#vote_' + newModel.board.topics[i].suggestions[k].suggestionId).text(newModel.board.topics[i].suggestions[k].voteCount);
            Ember.set(matchingSuggestion, 'voteCount', newModel.board.topics[i].suggestions[k].voteCount);
            Ember.set(matchingSuggestion, 'votes', newModel.board.topics[i].suggestions[k].votes);
            // matchingSuggestion.voteCount.set(newModel.board.topics[i].suggestions[k].voteCount);
            // matchingSuggestion.votes.set(newModel.board.topics[i].suggestions[k].votes);
          }
        }
      }
    }
  },

  //
  willDestroy() {
    this._super();
    this.stopPolling();
  },

  actions: {

    launchPlaceDetail(detail) {
      // console.log(detail);
      this.set('showRightPanel', true);
      this.set('currentPlaceDetail', detail);
    },

    changeValue (val) {
      if (val === "") {
        // console.log("what the fk");
        return;
      }
      // console.log(val);
      const opts = {
        url: '/boards/'+this.get('currentBoardToken'),
        type: 'PUT',
        // dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({name: val})
      };
      const self = this;
      Ember.$.ajax(opts).then((result) => {
        this.get('notifications').success('Title changed!', {
          autoClear: true,
          clearDuration: 1200
        });
        self.set('model.name', result.board.name);
      }, (xhr) => {
        this.get('notifications').error('Error changing topic!', {
          autoClear: true,
          clearDuration: 1200
        });
      });
    },

    addTopic() {
      // console.log(this.newTopic);
      if ( !this.newTopic) {
        return;
      }
      const opts = {
        url: '/boards/'+this.get('currentBoardToken')+"/topics",
        type: 'POST',
        // dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({name: this.newTopic})
      };
      // console.log(this.get('model.topics'));
      const self = this;
      Ember.$.ajax(opts).then((result) => {
        this.get('notifications').success('Topic added!', {
          autoClear: true,
          clearDuration: 1200
        });
        // Add this new topic into
        self.get('model.board.topics').pushObject(result);
        self.set('newTopic', "");
      }, (xhr) => {
        this.get('notifications').error('Error adding topic!', {
          autoClear: true,
          clearDuration: 1200
        });
      });
    }
  }
});
