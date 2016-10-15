import Ember from 'ember';
import Base from 'semantic-ui-ember/mixins/base';

export default Ember.Component.extend(Base, {
  module: 'top-nav',
  classNames: ['top-nav'],
  sideBarElement: null,

  didInsertElement() {
    this.set("sideBarElement", this.$(".ui.simple.sidebar.menu"));

  },

  actions: {
    toggle: function(el) {
      console.log(el);
      this.sideBarElement.sidebar('toggle');
      // this.$(".ui.fixed.main.menu").sidebar('toggle');
    }
  }
});
