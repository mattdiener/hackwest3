import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    login() {
      let {identification} = this.getProperties('identification');
      let currentBoardUsers = JSON.parse(localStorage.boardUsers)

      console.log(identification);
      console.log(this.get('model'));

      currentBoardUsers[this.get('model')] = identification;
      localStorage.boardUsers = JSON.stringify(currentBoardUsers);

      this.transitionToRoute('board.view',this.get('model'));
    }
  }
});
