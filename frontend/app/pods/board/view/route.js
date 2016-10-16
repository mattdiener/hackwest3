import Ember from 'ember';

export default Ember.Route.extend({
  url: null,

  model(params, trans) {
    const url = '/boards/' + params.token;
    this.set("url", url);
    // list of topics
    // chat url
    //

    if (localStorage.boardUsers){
      var currentBoardUsers = JSON.parse(localStorage.boardUsers);
      if (!currentBoardUsers[params.token]){
        this.transitionTo('login',params.token);
      }
    }else{
      localStorage.boardUsers = "{}";
      this.transitionTo('login',params.token);
    }

    console.log(params);
    console.log(trans);
    return Ember.$.getJSON(url);
    /*
    return {
      token: "kkk",
      status: 200,
      board: {
        name: "My trip to New York",
        topics: [{
          name: "Breakfast at restaurant 1",
          topicId: "123",
          boardId:"lolo",
          suggestions: [{
            name: "Restaurante specialize",
            suggestionId: "434234",
            voteCount: 6
          }, {
            name: "Bakers Dohn0ts",
            suggestionId: "4223",
            voteCount: 2
          }]
        }, {
          name: "Lunch at restaurant 2",
          topicId: "432",
          boardId:"poop",
          suggestions: [{
            name: "Burgers r Us",
            suggestionId: "6546",
            voteCount: 2
          }, {
            name: "Sandwhiches Woah",
            suggestionId: "534",
            voteCount: 7
          }]
        }],
        chatToken: "aksh"
      }
    };*/
  },
  afterModel: function (model, transition) {
    this.get('poll').setup({
      name: 'boardPoll', // a poll name should be unique
      resource_name: 'board', // a resource name
      url: this.url // url to fetch resource
    });
  },
  actions: {
    willTransition: function (transition) {
      this._super(transition);
      this.get('poll').removePoll('boardPoll'); // remove the resource from polling
    },
  }
});
