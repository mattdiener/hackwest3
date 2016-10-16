import Ember from 'ember';

export default Ember.Controller.extend({
	boardToken : null,
	boardURI: Ember.computed('boardToken',function() {
		return "board/view/"+this.get('boardToken');
	}),
  init() {
    Ember.$(document)
      .ready(() => {
        console.log("ready!");
        // fix menu when passed
        Ember.$('.masthead')
          .visibility({
            once: false,
            onBottomPassed: function() {
              Ember.$('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              Ember.$('.fixed.menu').transition('fade out');
            }
          });
		 Ember.$('.huge.primay.button')
			.api({
				action: ' sign in',
				on: 'onclick'
				});
				
		
        // create sidebar and attach to menu open
        Ember.$('.ui.sidebar')
          .sidebar('attach events', '.toc.item');
	  });
  },
  
  
	// Get Token?
	session: Ember.inject.service('session'),
	actions:{
		
		goToBoard() {
			const token = this.get('boardToken');
			if (token) {
				this.send('goToBoardRoute', token);
			}
		},
		
		createBoard() {
			const urlToPost = "/boards";
			const opts = {
				url: urlToPost,
				type: 'POST',
				contentType: 'application/json',
				data: JSON.stringify({name:"cheryl"})
			};
			const self = this;
			Ember.$.ajax(opts).then((results) => {
				this.transitionToRout('board/view/'+ results.board.boardId);
				
			});
		}
	}
});