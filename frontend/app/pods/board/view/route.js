import Ember from 'ember';

export default Ember.Route.extend({
  url: null,

  model(params, trans) {
    const url = '/boards/' + params.token;
    this.set("url", url);
    // list of topics
    // chat url
    //

    if (localStorage.boardUsers) {
      var currentBoardUsers = JSON.parse(localStorage.boardUsers);
      if (!currentBoardUsers[params.token]) {
        this.transitionTo('login', params.token);
      }
    } else {
      localStorage.boardUsers = "{}";
      this.transitionTo('login', params.token);
    }
    //
    // console.log(params);
    // console.log(trans);
    return Ember.$.getJSON(url);
  }
});
