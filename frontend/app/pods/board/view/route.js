import Ember from 'ember';

export default Ember.Route.extend({
  model(params, trans) {
    const url = '/boards/' + params.token;
    // list of topics
    // chat url
    //
    console.log(params);
    console.log(trans);
    //return Ember.$.getJSON(url);
    return {
      status: 200,
      board: {
        name: "My trip to New York",
        topics: [{
          name: "Breakfast at restaurant 1",
          id: "123",
          suggestions: [{
            name: "Restaurante specialize",
            id: "434234",
            votes: 6
          }, {
            name: "Bakers Dohn0ts",
            id: "4223",
            votes: 2
          }]
        }, {
          name: "Lunch at restaurant 2",
          id: "432",
          suggestions: [{
            name: "Burgers r Us",
            id: "6546",
            votes: 2
          }, {
            name: "Sandwhiches Woah",
            id: "534",
            votes: 7
          }]
        }],
        chatToken: "aksh"
      }
    };
  }
});
