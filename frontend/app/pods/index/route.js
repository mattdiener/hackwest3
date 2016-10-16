import Ember from "ember";
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {


	actions: {
		goToBoardRoute(slug) {
			this.transitionTo('board.view', slug);
		}		
	}

});
